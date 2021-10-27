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

const userList = new Array()

app.use(express.static('public'));
app.use(express.static('www'));

httpServer.listen(PORT, () => {
    console.log(`localhost:${PORT} is up!`);
});


//TODO: Connexion des clients

socketServer.on(IOEVENTS.CONNECTION, socket => {
    // console.log(socket.id);
    newUser(socket)

    // L'utilisateur en question.
    socket.on(IOEVENTS.SEND_MESSAGE, message => {
        const messageToBroadcast = {
            messageText: message.text,
            timeStamp: dayjs().format('HH:mm:ss'),
            fromWho: socket.data.identity
        }
        // A tout ceux qui sont presentement connecter
        socketServer.emit(IOEVENTS.NEW_MESSAGE, messageToBroadcast)
    })

    socket.on(IOEVENTS.UPDATE_NAME, newUsername => {
        socket.data.identity.name = newUsername
        sendUserIdentities()
    })
})


async function newUser(socket) {
    const newUser = {
        id: socket.id,
        name: 'Chien anonyme',
        avatar: randomAvatarImage()
    }

    // socket.data est vide de base , on peux mettre tout c'qu'on veux la dedans
    socket.data.identity = newUser
    await sendUserIdentities()
}


async function sendUserIdentities() {
    const clients = await socketServer.fetchSockets();
    const users = clients.map(socket => socket.data.identity)
    
    socketServer.emit(IOEVENTS.LIST_USER,users)
}

function randomAvatarImage() {
    const avatarNumber = Math.floor(Math.random() * 13 + 1);
    return `./photos_de_chien/img${avatarNumber}.jpeg`;
}

function getImage(){
    alert("OK!");
}