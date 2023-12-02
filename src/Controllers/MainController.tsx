import { Elysia } from "elysia";
import { html } from "@elysiajs/html";
import { baseHTML } from "../Tools/BaseHTML";
import { auth } from '../Tools/auth';

export const MainController = new Elysia()
    .use(html())
    .use(auth)
    .use(baseHTML)