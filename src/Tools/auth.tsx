import { DataProvider } from './DataProvider';
import { encryption, DataEncryptor } from './DataEncryptor';
import { Elysia } from 'elysia';
import { user } from '../Models/User';
import { cookie } from '@elysiajs/cookie';
import { jwt } from '@elysiajs/jwt'
const config = require('./../config.json');

export const auth = new Elysia()
    .use(cookie())
    .use(jwt({
        secret: config["JWTSecret"]
    }))

    .derive(({ jwt, cookie: { user }, setCookie, removeCookie, set: {headers} }) => {
        return {
            getCookie: async () => {
                console.log(user)

                if (user == undefined) return undefined;

                let current_user = await jwt.verify(user)

                console.log(current_user)

                if (!current_user) {
                    return undefined;
                }

                const provider = new DataProvider()
                current_user = provider.getUserByInfo(current_user["name"])
                provider.close()

                return current_user
            },
            loginCookie: async (data: any) => {

                const cookie = await jwt.sign(data);
                console.log(cookie)

                setCookie('user', cookie, {
                    httpOnly: true
                });
            },
            logoutCookie: () => {
                removeCookie('user')
            }
        }
    })
    .derive(({getCookie}) => {
        return {
            isUser: () => {
                getCookie().then((result) => {
                    return result == undefined
                })
            }
        }
    });
