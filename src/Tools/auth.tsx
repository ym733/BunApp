import { DataProvider } from './DataProvider';
import { encryption, DataEncryptor } from './DataEncryptor';
import { Elysia } from 'elysia';
import { user } from '../Models/User';
import { cookie } from '@elysiajs/cookie';

export const auth = new Elysia()
    .use(cookie())
    .derive(({ cookie: { user }, setCookie, removeCookie }) => {
        return {
            getCookie: (): user => {
                if (user == undefined) return user;

                //returns a full user object or undefined 
                const encryptionObj = user.split(";")

                const decryptedData = DataEncryptor.decryptMessage(encryptionObj[0], encryptionObj[1], encryptionObj[2])

                let current_user = JSON.parse(decryptedData)

                //by this point we have the id and name of the current user
                //so we exctract the extra data
                const provider = new DataProvider()
                current_user = provider.getUserByInfo(current_user["name"])
                provider.close()

                return current_user
            },
            setCookie: (data: any) => {
                //parameter data is an id and username or undefined
                const message = JSON.stringify(data)

                const encryptionObj: encryption = DataEncryptor.encryptMessage(message)

                setCookie('user', `${encryptionObj["message"]};${encryptionObj["key"]};${encryptionObj["iv"]}`);
            },
            removeCookie: () => {
                removeCookie('user')
            }
        }
    })