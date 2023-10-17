import * as elements from "typed-html";

export const BaseHTML = ({ children }: elements.Children) => {
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
  <a href="/" class="flex items-center">
    <span class="text-xl font-bold">Bun Application</span>
  </a>

  <ul class="flex space-x-4">
     
    <li><a class="hover:underline" href="./logout">logout</a></li>
    <li><a class="hover:underline" href="./currentUser">current user</a></li>
      
    <li><a class="hover:underline" href="./login">login</a></li>
    
  </ul>
</nav>
    ${children.join("")}
  </body>
</html>`};