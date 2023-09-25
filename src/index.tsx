import { Elysia, t } from "elysia";
import { html } from "@elysiajs/html";
import { cookie } from '@elysiajs/cookie'
import { Actions } from "./actions";

const actions = new Actions()

const app = new Elysia()
    .use(html())
    .use(cookie())
    .get("/", () => actions.index())
    .get("/getallUsers", () => actions.getAllUsers())

    .group("/hxtrick", (app) => app
        .get("/", () => actions.hxtrick())
        .post("/clicked", () => actions.clicked())
    )

    .group("/register", (app) => app
        .get("/", () => actions.register())
        .post("/", async ({ set, body, cookie: { user }, setCookie }) => {
            actions.registerPost(body.name, body.email, await Bun.password.hash(body.password));
            setCookie(
                'user',
                JSON.stringify(await actions.loginUser(body.name, body.password)),
                { expires: new Date(new Date(Date.now() + 24 * 60 * 60 * 1000)) }
            );
            set.redirect = "/"
        }, { body: t.Object({ name: t.String(), email: t.String(), password: t.String() }) })
    )

    .group("/login", (app) => app
        .get("/", () => actions.login())
        .post("/", async ({ set, body, cookie: { user }, setCookie }) => {
            setCookie(
                'user',
                JSON.stringify(await actions.loginUser(body.name, body.password)),
                { expires: new Date(new Date(Date.now() + 24 * 60 * 60 * 1000)) }
            );
            set.redirect = "/"
        }, { body: t.Object({ name: t.String(), password: t.String() }) })
    )

    .get("/logout", ({ set, cookie: { user }, removeCookie }) => { removeCookie('user'); set.redirect = "/" })

    .get("/currentUser", ({ cookie: { user } }) => actions.getCurrentUser(user))
    .listen(8080);

console.log(`Elysia is running at http://${app.server?.hostname}:${app.server?.port}`);