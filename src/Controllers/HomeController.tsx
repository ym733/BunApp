import { Elysia, t } from "elysia";
import { html } from "@elysiajs/html";
import { BaseHTML } from "../Tools/BaseHTML";
import * as elements from "typed-html";

export const HomeController = new Elysia()
    .use(html())

    .get("/", () => pages.index())

    .group("/hxtrick", (app) => app
        .get("/", () => pages.hxtrick())
        .post("/clicked", () => pages.clicked())
    )

    .group("/random", (app) => app
        .get("/", () => pages.random())
        .post("/dog", () => pages.randomDog())
        .post("/cat", () => pages.randomCat())
    )


class pages {

    static index() {
        return <BaseHTML>
            <div class="text-6xl flex justify-center">
                MAIN PAGE
            </div>
            <ul>
                <li><a class="hover:underline" href="./getallUsers">get all users</a></li>
                <li><a class="hover:underline" href="./hxtrick">hxtrick</a></li>
                <li><a class="hover:underline" href="./getUser">get user</a></li>
                <li><a class="hover:underline" href="./random">random</a></li>            
            </ul>
        </BaseHTML>
    }

    static hxtrick() {
        return <BaseHTML>
            <div class="flex w-full h-screen justify-center items-center">
                <button hx-post="/hxtrick/clicked" hx-swap="outerHTML">
                    Click Me
                </button>
            </div>
        </BaseHTML>
    }

    static clicked() {
        return <div class="text-blue-600">YOU CLICKED THE BUTTON???!!!</div>
    }

    static random() {
        return <BaseHTML>
            <div class="text-2xl">
                <button class="hover:underline" hx-post="./random/cat" hx-target="#catimg" hx-swap="innerHTML">get random cat</button>
                <br />
                <div id="catimg"></div>
                <br />
                <button class="hover:underline" hx-post="./random/dog" hx-target="#dogimg" hx-swap="innerHTML">get random dog</button>
                <br />
                <div id="dogimg"></div>
            </div>
        </BaseHTML>
    }

    static async randomCat() {
        const response = await fetch("https://api.thecatapi.com/v1/images/search");
        const html = await response.json();
        return <img src={html[0]["url"]}/>
    }
    
    static async randomDog() {
        const response = await fetch("https://api.thedogapi.com/v1/images/search");
        const html = await response.json();
        return <img src={html[0]["url"]}/>
    }
    
}