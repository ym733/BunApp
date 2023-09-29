import { Elysia, t } from "elysia";
import { cookie } from '@elysiajs/cookie';
import { html } from "@elysiajs/html";
import { BaseHTML } from "../BaseHTML";

export const AccountController = new Elysia()
    .use(html())
    .use(cookie())
    .get("/getallUsers", () => pages.getAllUsers())

    .get("/currentUser", ({ cookie: { user } }) => pages.getCurrentUser(user));


class pages {

    static getAllUsers() {
        const provider = new DataProvider();
        const response = provider.getAllUsers();
        return <BaseHTML>
            <table>
                <thead class="bg-gray-50">
                    <tr>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Password</th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    {
                        response.map((element: any) => (
                            <tr>
                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{element["id"]}</td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{element["name"]}</td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{element["email"]}</td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{element["password"]}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </BaseHTML>
    }



    static getCurrentUser(user: string) {
        if (user == 'undefined' || user == undefined) {
            return 'user undefined'
        }

        const model = JSON.parse(user)

        return <BaseHTML>
            <table>
                <thead class="bg-gray-50">
                    <tr>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Password</th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    <tr>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{model["id"]}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{model["name"]}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{model["email"]}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{model["password"]}</td>
                    </tr>
                </tbody>
            </table>
        </BaseHTML>
    }
}