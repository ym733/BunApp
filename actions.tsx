import * as elements from "typed-html";
const pg = require('pg');
const config = require('./config.json');

const BaseHTML = ({ children }: elements.Children) => `
<!DOCTYPE html>
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
    ${children}
  </body>
</html>`;

export class Actions {
    index() {
        return <BaseHTML>
            <a href="./getallUsers">get all users</a>
            <div class="flex w-full h-screen justify-center items-center">
                <button hx-post="/clicked" hx-swap="outerHTML">
                    Click Me
                </button>
            </div>
        </BaseHTML>
    }

    clicked() {
        return <div class="text-blue-600">YOU CLICKED THE BUTTON???!!!</div>
    }

    async getAllUsers() {
        const client = new pg.Client(config["db_params"])
        console.log(config["db_params"])
        await client.connect()
        console.log("here?")
        const res = await client.query('SELECT * FROM \"fishPoints\"')
        console.log(res)
        const response = JSON.stringify(res.rows, null, 4)
        await client.end()

        return response
    }
}