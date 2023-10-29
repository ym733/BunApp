import { Elysia, t } from "elysia";
import { auth } from '../Tools/auth';
import { readFileSync, existsSync } from 'fs';
import { user } from '../Models/User';
import { html } from "@elysiajs/html";
import { DataProvider } from "../Tools/DataProvider";
import * as elements from "typed-html";
import { baseHTML } from "../Tools/BaseHTML";

export const AccountController = new Elysia()
    .use(html())
    .use(auth)
    .use(baseHTML)

    .get("/getallUsers", ({ BaseHTML }) => {
        const provider = new DataProvider();
        const response = provider.getAllUsers();
        provider.close()

        return <BaseHTML>
            <table>
                <thead class="bg-gray-50">
                    <tr>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PFP</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Password</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delete</th>
                        
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    {
                        response.map((element: any) => (
                            <tr id={`user${element["id"]}`}>
                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    <img src={`./pfp/get/${element["pfp"]}`} width="50px" height="50px">image missing</img>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{element["id"]}</td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{element["name"]}</td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{element["email"]}</td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{element["password"]}</td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    <button hx-post={`/deleteUser/${element["id"]}`} hx-target={`#user${element["id"]}`} hx-swap="outerHTML">
                                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAvElEQVR4nGNgGCmggYGB4T8a7iDHoKNYDPpPIj6Mz4LDVLDgEMOwBzMoCJ4ZxFhQTYEFVcRYEItFoxUDA4MNHj4Mg/QSBPZYNMIALj4M2zEQARQpsECBGAtYGRgY/pBhwR+oXqLAEzIseMxAQZFBjAVHGEgAy8mwYBkpFnSSYUEHKRbkkGFBNikW+KJptsFigS2aGpAeooEBGcWEPikWcDMwMHwnwfBvUD0kgXgGBoZXRBgOUhNHquFDBwAAvdXKeCV5nnIAAAAASUVORK5CYII=" />
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </BaseHTML>
    })

    .group("/getUser", (app) => app
        .get("/", ({ BaseHTML }) => {
            return <BaseHTML>
                <form hx-post="/getUser" hx-target="#userDiv" hx-swap="innerHTML">
                    <div class="hover:underline">get user&nbsp;&nbsp;&nbsp;
                        <input name="id" class="border w-1/12" type="number" placeholder="enter id" />
                        <input type="submit" value="Go" />
                    </div>
                </form>
                <div id="userDiv">
    
                </div>
            </BaseHTML>
        })

        .post("/", ({ body: { id } }) => {
            const provider = new DataProvider()
            const user = provider.getUserByID(parseInt(id));
            provider.close()
    
    
            if (user == undefined) {
                return 'user undefined'
            }
    
            return <table>
                <thead class="bg-gray-50">
                    <tr>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PFP</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Password</th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    <tr>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            <img src={`./pfp/get/${user["pfp"]}`} width="50px" height="50px">image missing</img>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user["id"]}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user["name"]}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user["email"]}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user["password"]}</td>
                    </tr>
                </tbody>
            </table>
        }, { body: t.Object({ id: t.String() }) })
    )

    .get("/currentUser", ({ getCookie, BaseHTML }) => {
        const user:user = getCookie();
        
        if (user == undefined) {
            return 'user undefined'
        }

        return <BaseHTML>
            <table>
                <thead class="bg-gray-50">
                    <tr>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PFP</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Password</th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    <tr>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            <img src={`./pfp/get/${user["pfp"]}`} width="50px" height="50px">image missing</img>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user["id"]}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user["name"]}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user["email"]}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user["password"]}</td>
                    </tr>
                </tbody>
            </table>
        </BaseHTML>
    })
    
    .post("/deleteUser/:id", ({ params: { id } }) => {
        const provider = new DataProvider()
        provider.deleteUser(parseInt(id));
        provider.close()
        return <tr>
        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{id}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">SUCCESS</td>
    </tr>
    })

    .get("/pfp/get/:name", ({ params:{ name }, set }) => {
        const file_path = `src/uploads/${name}`
        if (existsSync(file_path)){
            const blob = new Blob([readFileSync(file_path)])
            return blob
        } else {
            set.status = 400
            return "No such file or directory"
        }
    })
    