import { Elysia, t } from "elysia";
import { html } from "@elysiajs/html";
import { Actions } from "./actions";

const actions = new Actions()

interface user {
    id : number,
    name : string,
    email : string,
    password : string
}

const app = new Elysia()
  .use(html())
  .get("/", () => actions.index())
  .post("/clicked", () => actions.clicked())
  .get("/addUser", () => actions.addUser())
  .post("/addUser", ({body}) => actions.addUserPost(body.name, body.email, body.password), {body:t.Object({name:t.String(), email:t.String(), password:t.String()})})
  .get("/getallUsers", () => actions.getAllUsers())
  .listen(8080);

console.log(`Elysia is running at http://${app.server?.hostname}:${app.server?.port}`);