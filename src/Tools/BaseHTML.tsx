import * as elements from "typed-html";
import { Elysia } from "elysia";
import { auth } from "./auth";

export const baseHTML = new Elysia()
  .use(auth)

  .derive(({ isUser, request }) => {
    return {
      BaseHTML : async ({ children }: elements.Children) => {
        if (request.headers.get("Hx-Request")){     
          return `${children.join("")}`
        } else {
          return `<!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <meta http-equiv="X-UA-Compatible" content="ie=edge">
              <script src="https://unpkg.com/htmx.org@1.9.5"></script>
              <script src="https://cdn.tailwindcss.com"></script>
              <title>BUN APP</title>
            </head>
            <body>
            <nav class="flex justify-between items-center bg-gray-800 text-white px-6 py-4">
            <a hx-get="/" class="cursor-pointer flex items-center" hx-swap="innerHTML" hx-target="main" hx-push-url="true">
              <span class="text-xl font-bold">Bun Application</span>
            </a>
          
            <ul class="flex space-x-4">
              ${
                (await isUser()) ?
                `<li><a class="cursor-pointer hover:underline" href="./logout" hx-swap="innerHTML" hx-target="main" hx-push-url="true">logout</a></li>
                <li><a class="cursor-pointer hover:underline" hx-get="./currentUser" hx-swap="innerHTML" hx-target="main" hx-push-url="true">current user</a></li>`
                :
                `<li><a class="cursor-pointer hover:underline" hx-get="./login" hx-swap="innerHTML" hx-target="main" hx-push-url="true">login</a></li>`
              }
            </ul>
          </nav>
            <main>
              ${children.join("")}
            </main>  
            </body>
          </html>`
        }
      }
    }
  })