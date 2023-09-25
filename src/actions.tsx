import * as elements from "typed-html";
import config from './config.json'
import { DataProvider } from "./DataProvider";

const BaseHTML = ({ children }) => `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <script src="https://unpkg.com/htmx.org@1.9.5"></script>
    <script src="https://cdn.tailwindcss.com"></script>
    <title>BUN APP</title>
  </head>
  <body>
    ${children.join("")}
  </body>
</html>`;

export class Actions {

    index() {
        return <BaseHTML>
            <a href="./getallUsers">get all users</a>
            <br />
            <a href="./hxtrick">hxtrick</a>
            <br />
            <a href="./register">register</a>
            <br />
            <a href="./login">login</a>
            <br />
            <a href="./logout">logout</a>
            <br />
            <a href="./currentUser">current user</a>
        </BaseHTML>
    }

    hxtrick() {
        return <BaseHTML>
            <div class="flex w-full h-screen justify-center items-center">
                <button hx-post="/hxtrick/clicked" hx-swap="outerHTML">
                    Click Me
                </button>
            </div>
        </BaseHTML>
    }

    clicked() {
        return <div class="text-blue-600">YOU CLICKED THE BUTTON???!!!</div>
    }

    register() {
        return <BaseHTML>
            <form class="flex flex-col w-full max-w-lg mx-auto space-y-5" method="post" action="/../register">
                <label for="name" class="text-gray-800 font-medium">Name</label>
                <input type="text" name="name" id="name" class="rounded border border-gray-300 p-2" placeholder="Enter your name" />

                <label for="email" class="text-gray-800 font-medium">Email</label>
                <input type="email" name="email" id="email" class="rounded border border-gray-300 p-2" placeholder="Enter your email" />

                <label for="password" class="text-gray-800 font-medium">Password</label>
                <input type="password" name="password" id="password" class="rounded border border-gray-300 p-2" placeholder="Enter your password" />

                <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded">Submit</button>
            </form>
        </BaseHTML>
    }

    registerPost(name: string, email: string, password: string) {
        const provider = new DataProvider()
        provider.addUser(name, email, password);
        return <BaseHTML>
            <h1>SUCCESS</h1>
        </BaseHTML>
    }

    getAllUsers() {
        const provider = new DataProvider();
        const response = provider.getAllUsers();
        return <BaseHTML>
            <table>
                <thead class="bg-gray-50">
                    <tr>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Password</th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    {
                        response.map((element: any) => (
                            <tr>
                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{element["id"]}</td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{element["name"]}</td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{element["email"]}</td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{element["password"]}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </BaseHTML>
    }

    login() {
        return <BaseHTML>
            <div class="container mx-auto flex justify-center items-center h-screen">
                <div class="card w-full md:w-1/2 p-6">
                    <h2 class="text-center text-2xl font-bold">Login</h2>
                    <form action="/../login" method="post">
                        <div class="mb-4">
                            <label for="name" class="block text-gray-700 text-sm font-bold mb-2">name</label>
                            <input type="text" id="name" name="name" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                        </div>
                        <div class="mb-6">
                            <label for="password" class="block text-gray-700 text-sm font-bold mb-2">Password</label>
                            <input type="password" id="password" name="password" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                        </div>
                        <div class="flex items-center justify-between">
                            <input type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" value="Login" />
                        </div>
                    </form>
                </div>
            </div>
        </BaseHTML>

    }

    async loginUser(name: string, password: string) {
        const provider = new DataProvider()
        const model: any = provider.getUserByInfo(name)

        if (await Bun.password.verify(password, model["password"])) {
            return model
        } else {
            return undefined
        }
    }

    getCurrentUser(user: string) {
        if (user == 'undefined' || user == undefined) {
            return 'user undefined'
        }

        const model = JSON.parse(user)

        return <BaseHTML>
            <table>
                <thead class="bg-gray-50">
                    <tr>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Password</th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    <tr>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{model["id"]}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{model["name"]}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{model["email"]}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{model["password"]}</td>
                    </tr>
                </tbody>
            </table>
        </BaseHTML>
    }
}