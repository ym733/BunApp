import { Elysia, t } from "elysia";
import { readFileSync, writeFileSync, closeSync } from 'fs';
import { html } from "@elysiajs/html";
import { baseHTML } from "../Tools/BaseHTML";
import * as elements from "typed-html";

export const HomeController = new Elysia()
    .use(html())
    .use(baseHTML)

    .get("/", ({ BaseHTML }) => {
        return <BaseHTML>
            <div class="text-6xl flex justify-center">
                MAIN PAGE
            </div>
            <ul>
                <li><a class="cursor-pointer hover:underline" hx-get="./getallUsers" hx-swap="innerHTML" hx-target="main" hx-push-url="true">get all users</a></li>
                <li><a class="cursor-pointer hover:underline" hx-get="./hxtrick" hx-swap="innerHTML" hx-target="main" hx-push-url="true">hxtrick</a></li>
                <li><a class="cursor-pointer hover:underline" hx-get="./getUser" hx-swap="innerHTML" hx-target="main" hx-push-url="true">get user</a></li>
                <li><a class="cursor-pointer hover:underline" hx-get="./random" hx-swap="innerHTML" hx-target="main" hx-push-url="true">random</a></li>
            </ul>
        </BaseHTML>
    })

    .group("/hxtrick", (app) => app
        .get("/", ({ BaseHTML }) => {
            return <BaseHTML>
                <div class="flex w-full h-screen justify-center items-center">
                    <button hx-post="/hxtrick/clicked" hx-swap="outerHTML">
                        Click Me
                    </button>
                </div>
            </BaseHTML>
        })

        .post("/clicked", () => {
            return <div class="text-blue-600">YOU CLICKED THE BUTTON???!!!</div>
        })
    )

    .group("/random", (app) => app
        .get("/", ({ BaseHTML }) => {
            return <BaseHTML>
                <div class="text-2xl">
                    <button class="hover:underline" hx-post="./random/cat" hx-target="#catimg" hx-swap="innerHTML">get random cat</button>
                    <br />
                    <div id="catimg" class="max-w-lg"></div>
                    <br />
                    <button class="hover:underline" hx-post="./random/dog" hx-target="#dogimg" hx-swap="innerHTML">get random dog</button>
                    <br />
                    <div id="dogimg" class="max-w-lg"></div>
                </div>
            </BaseHTML>
        })

        .post("/dog", async () => {
            const response = await fetch("https://api.thedogapi.com/v1/images/search");
            const html = await response.json();
            return <img src={html[0]["url"]}/>
        })

        .post("/cat", async () => {
            const response = await fetch("https://api.thecatapi.com/v1/images/search");
            const html = await response.json();
            return <img src={html[0]["url"]}/>
        })
    )
    .group("/file", (app) => app
            .get("/", ({ BaseHTML }) => {
                return <BaseHTML>
                    <form action="/file" method="post" enctype="multipart/form-data">
                    <input type="file" name="file" />
                    <input type="submit" value="Upload File" />
                    </form>
                </BaseHTML>
            })
            .post('/', async ({ body: { file } }) => {
                if (file["type"] !== 'image/png') {
                    return "WRONG FILE TYPE"
                }

                file.arrayBuffer().then((result) => {
                    writeFileSync(`src/uploads/${new Date().getTime()}.png`, result)
                }, (err) => {
                    console.error(err)
                })

                return "SUCCESS"
            }, {
                body: t.Object({
                    file: t.File()
                })
            })
        )
