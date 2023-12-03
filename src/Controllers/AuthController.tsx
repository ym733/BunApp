import { Elysia, t } from "elysia";
import { writeFileSync } from 'fs';
import { DataProvider } from '../Tools/DataProvider';
import * as elements from "typed-html";
import { MainController } from "./MainController.tsx";

export const AuthController = new Elysia()
    .use(MainController)

    .group("/register", (app) => app
        .derive(({BaseHTML}) => {
                return {
                    page: (message?:string) => {
                        return <BaseHTML>
                            <div class="container mx-auto flex justify-center items-center h-screen">
                                <div class="card w-full md:w-1/2 p-6">
                                    <h2 class="text-center text-2xl font-bold">Register</h2><h2 class="text-center text-2xl font-bold text-red-600">{message}</h2>
                                    <form class="flex flex-col w-full max-w-lg mx-auto space-y-5" method="post" action="../register" enctype="multipart/form-data">
                                        <label for="name" class="text-gray-800 font-medium">Name</label>
                                        <input type="text" name="name" id="name" class="rounded border border-gray-300 p-2" placeholder="Enter your name" />

                                        <label for="email" class="text-gray-800 font-medium">Email</label>
                                        <input type="email" name="email" id="email" class="rounded border border-gray-300 p-2" placeholder="Enter your email" />

                                        <label for="password" class="text-gray-800 font-medium">Password</label>
                                        <input type="password" name="password" id="password" class="rounded border border-gray-300 p-2" placeholder="Enter your password" />

                                        <label for="pfp" class="text-gray-800 font-medium">Profile Picture</label>
                                        <input type="file" name="pfp" id="pfp" class="rounded border border-gray-300 p-2" />

                                        <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded">Submit</button>
                                    </form>
                                </div>
                            </div>
                        </BaseHTML>
                    }
                }
            })

        .get("/", ({ page }) => {
            return page()
        })

        .post("/", async ({ set, body, loginCookie, page }) => {
            if (body.name == "" || body.password == "" || body.email == "" || body.pfp.size == 0) {
                return page("data is missing")
            }

            if (body.pfp["type"] !== 'image/png') {
                return page("wrong file type")
            }

            const provider = new DataProvider()

            if (provider.nameExists(body.name)){
                return page("name already exists")
            }

            if (provider.emailExists(body.email)){
                return page("email already exists")
            }
            const fileName = `${new Date().getTime()}.png`

            body.pfp.arrayBuffer().then((result) => {
                writeFileSync(`src/uploads/${fileName}`, result)
            }, (err) => {
                console.error(err)
            })

            provider.addUser(body.name, body.email, await Bun.password.hash(body.password), fileName);
            const model: any = provider.getUserByInfo(body.name)
            provider.close()

            loginCookie({ id: model["id"], name: model["name"] })
            
            set.redirect = "/"
            }, { body: t.Object({ name: t.String(), email: t.String(), password: t.String(), pfp: t.File() }) })
        )

    .group("/login", (app) => app
        .derive(({BaseHTML}) => {
            return {
                page: (message?:string) => {
                    return <BaseHTML>
                        <div class="container mx-auto flex justify-center items-center h-screen">
                            <div class="card w-full md:w-1/2 p-6">
                                <h2 class="text-center text-2xl font-bold">Login</h2><h2 class="text-center text-2xl font-bold text-red-600">{message}</h2>
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
                                    <a class="cursor-pointer hover:underline text-blue-600" hx-get="../register" hx-swap="innerHTML" hx-target="main" hx-push-url="true">register</a>
                                </form>
                            </div>
                        </div>
                    </BaseHTML>
                }
            }
        })

        .get("/", ({ page }) => {
            return page()
        })
        
        .post("/", async ({ set, body, loginCookie, page }) => {

            if (body.name == "" || body.password == "") {
                return page("data is missing")
            }

            const provider = new DataProvider()
            const model: any = provider.getUserByInfo(body.name)
            provider.close()

            if (model == null) {
                return page("wrong name")
            }

            //validation
            if (await Bun.password.verify(body.password, model["password"])) {
                loginCookie({ id: model["id"], name: model["name"] })
            } else {
                return page("wrong password")
            }

            set.redirect = "/"
        }, { body: t.Object({ name: t.String(), password: t.String() }) })
    )

    .get("/logout", ({ set, logoutCookie }) => { logoutCookie(); set.redirect = "/" });
