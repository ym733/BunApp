import { Elysia } from "elysia";
import { AuthController } from './Controllers/AuthController';
import { HomeController } from './Controllers/HomeController';
import { AccountController } from './Controllers/AccountController'
import { WebSocketController} from "./Controllers/WebSocketController.tsx";

console.log("Program running")

const app = new Elysia()
    .use(WebSocketController)
    .use(AuthController)
    .use(HomeController)
    .use(AccountController)

    .listen(8080);

console.log(`Elysia is running at http://${app.server?.hostname}:${app.server?.port}`);