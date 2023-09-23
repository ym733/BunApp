import * as elements from "typed-html";
const config = require('./config.json');
import {DataProvider} from "./DataProvider";

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
    ${children}
  </body>
</html>`;

export class Actions {
    index() {
        return <BaseHTML>
            <a href="./getallUsers">get all users</a>
            <br/>
            <a href="./addUser">add user</a>
            <div class="flex w-full h-screen justify-center items-center">
                <button hx-post="/clicked" hx-swap="outerHTML">
                    Click Me
                </button>
            </div>
        </BaseHTML>
    }

    clicked() {
        return <div class="text-blue-600">YOU CLICKED THE BUTTON???!!!</div>
    }

    addUser() {
        return <BaseHTML>
            <form class="flex flex-col w-full max-w-lg mx-auto space-y-5" method="post" action="/../addUser">
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

    addUserPost(name, email, password) {
        const provider = new DataProvider()
        provider.addUser(name, email, password);
        return <BaseHTML>
            <center>
                <h1>SUCCESS</h1>
            </center>
        </BaseHTML>
    }

    async getAllUsers() {
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
                    response.map((element) => (
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
}