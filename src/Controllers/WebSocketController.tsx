import { Elysia } from 'elysia'

export const WebSocketController = new Elysia()
    .ws('/ws', {
        message(ws, message) {
            console.log(message)
            ws.send(message)
        }
    })