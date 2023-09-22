import { Elysia } from "elysia";
import { html } from "@elysiajs/html";
import { Actions } from "./actions";

const actions = new Actions()

const app = new Elysia()
  .use(html())
  .get("/", ({ html }) => html(actions.index()))
  .post("/clicked", () => actions.clicked())
  .get("/addUser", () => { })
  .get("/getallUsers", () => actions.getAllUsers())
  .listen(8080);

console.log(`Elysia is running at http://${app.server?.hostname}:${app.server?.port}`);
