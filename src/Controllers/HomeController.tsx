import { Elysia, t } from "elysia";
import { html } from "@elysiajs/html";
import { BaseHTML } from "../Components/BaseHTML";
import * as elements from "typed-html";

export const HomeController = new Elysia()
    .use(html())

    .get("/", () => pages.index())

    .group("/hxtrick", (app) => app
        .get("/", () => pages.hxtrick())
        .post("/clicked", () => pages.clicked())
    );


class pages {

    static index() {
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

}