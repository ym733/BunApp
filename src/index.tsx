import { Elysia, t } from "elysia";
import { AuthController } from './Controllers/AuthController';
import { HomeController } from './Controllers/HomeController';
import { AccountController } from './Controllers/AccountController'

console.log("Program running")

const app = new Elysia()
    .use(AuthController)
    .use(HomeController)
    .use(AccountController)

    .listen(8080);

console.log(`Elysia is running at http://${app.server?.hostname}:${app.server?.port}`);