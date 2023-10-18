import { Elysia, t } from "elysia";
import { auth } from '../Tools/auth';
import { html } from "@elysiajs/html";
import { baseHTML } from "../Tools/BaseHTML";
import { DataProvider } from '../Tools/DataProvider';
import * as elements from "typed-html";

export const AuthController = new Elysia()
    .use(html())
    .use(auth)
    .use(baseHTML)

    .group("/register", (app) => app

        .get("/", ({ BaseHTML }) => {
            return <BaseHTML>
                <form class="flex flex-col w-full max-w-lg mx-auto space-y-5" method="post" action="../register">
                    <label for="name" class="text-gray-800 font-medium">Name</label>
                    <input type="text" name="name" id="name" class="rounded border border-gray-300 p-2" placeholder="Enter your name" />

                    <label for="email" class="text-gray-800 font-medium">Email</label>
                    <input type="email" name="email" id="email" class="rounded border border-gray-300 p-2" placeholder="Enter your email" />

                    <label for="password" class="text-gray-800 font-medium">Password</label>
                    <input type="password" name="password" id="password" class="rounded border border-gray-300 p-2" placeholder="Enter your password" />

                    <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded">Submit</button>
                </form>
            </BaseHTML>
        })

        .post("/", async ({ set, body, loginCookie }) => {
            const provider = new DataProvider()
            provider.addUser(body.name, body.email, await Bun.password.hash(body.password));
            const model: any = provider.getUserByInfo(body.name)
            provider.close()

            loginCookie({ id: model["id"], name: model["name"] })
            
            set.redirect = "/"
            }, { body: t.Object({ name: t.String(), email: t.String(), password: t.String() }) })
        )

    .group("/login", (app) => app
        .get("/", ({ BaseHTML }) => {
            return <BaseHTML>
                <div class="container mx-auto flex justify-center items-center h-screen">
                    <div class="card w-full md:w-1/2 p-6">
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
                            <a class="hover:underline text-blue-600" href="../register">register</a>
                        </form>
                    </div>
                </div>
            </BaseHTML>
        })
        
        .post("/", async ({ set, body, loginCookie, BaseHTML }) => {
            const provider = new DataProvider()
            const model: any = provider.getUserByInfo(body.name)
            provider.close()

            //validation
            if (await Bun.password.verify(body.password, model["password"])) {
                loginCookie({ id: model["id"], name: model["name"] })
            } else {
                return <BaseHTML>
                <div class="container mx-auto flex justify-center items-center h-screen">
                    <div class="card w-full md:w-1/2 p-6">
                        <h2 class="text-center text-2xl font-bold">Login</h2><h2 class="text-center text-2xl font-bold text-red-600">wrong name or password</h2>
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
                            <a class="hover:underline text-blue-600" href="../register">register</a>
                        </form>
                    </div>
                </div>
            </BaseHTML>
            }

            set.redirect = "/"
        }, { body: t.Object({ name: t.String(), password: t.String() }) })
    )

    .get("/logout", ({ set, logoutCookie }) => { logoutCookie(); set.redirect = "/" });
