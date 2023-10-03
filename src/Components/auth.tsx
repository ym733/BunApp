const crypto = require('crypto');
import { Elysia } from 'elysia';
import { cookie } from '@elysiajs/cookie';

export const auth = new Elysia()
    .use(cookie())
    .derive(({ cookie: { user }, setCookie, removeCookie }) => {
        return {
            getCookie: () => {
                return JSON.parse(user)
            },
            setCookie: (data) => {
                setCookie('user', JSON.stringify(data), { expires: new Date(new Date(Date.now() + 24 * 60 * 60 * 1000)) });
            },
            removeCookie: () => {
                removeCookie('user')
            }
        }
    })