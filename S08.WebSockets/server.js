// Server-side

import http from 'http';
import express from 'express';

import { Server } from 'socket.io';

import IOEVENTS from './public/io-events.js';
import dayjs from 'dayjs';

const PORT = 1337;

const app = express();
const httpServer = http.createServer(app);
const socketServer = new Server(httpServer);

app.use(express.static('public'));
app.use(express.static('www'));

httpServer.listen(PORT, () => {
    console.log(`localhost:${PORT} is up!`);
});


//TODO: Connexion des clients

socketServer.on(IOEVENTS.CONNECTION,socket => {
    console.log(socket.id);

    // L'utilisateur en question.
    socket.on(IOEVENTS.SEND_MESSAGE,message => {
        const messageToBroadcast = {
            messageText:message.text,
            timeStamp:dayjs().format('HH:mm:ss'),
            fromWho:socket.id
        }
        // A tout ceux qui sont presentement connecter
        socketServer.emit(IOEVENTS.NEW_MESSAGE,messageToBroadcast)
    })
})


async function newUser(socket) {

}


async function sendUserIdentities() {
    
}

function randomAvatarImage() {
    const avatarNumber = Math.floor(Math.random() * 14 + 1);
    return `./photos_de_chien/img${avatarNumber}.png`;
}