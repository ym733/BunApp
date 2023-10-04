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
    );


class pages {

    static index() {
        return <BaseHTML>
            <div class="text-2xl">
                <a class="hover:underline" href="./getallUsers">get all users</a>
                <br />
                <a class="hover:underline" href="./hxtrick">hxtrick</a>
                <br />
                <a class="hover:underline" href="./register">register</a>
                <br />
                <a class="hover:underline" href="./login">login</a>
                <br />
                <a class="hover:underline" href="./logout">logout</a>
                <br />
                <a class="hover:underline" href="./currentUser">current user</a>
                <br />
                <div class="hover:underline">get user&nbsp;&nbsp;&nbsp;<input id="userID" class="border w-1/12" type="number" placeholder="enter id" /><button onclick="window.location.href = `./getUser/${document.getElementById('userID').value}`;">Go</button></div>
            </div>
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