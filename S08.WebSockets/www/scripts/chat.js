// Client side.;
import IOEVENTS from '../../io-events.js';

const socket = io();

let TEXT = "";
const NAME = "Mikael Lagasse";
let TIME;


$(document).ready(() => {

    $("#btnSend").click(() => {
        const message = {
            text: $('#txtMessage').val(),
        }
        socket.emit(IOEVENTS.SEND_MESSAGE, message);
    });

    $("#txtMessage").keypress(e => {
        if (e.originalEvent.charCode == 13) {
            // Empeche le \n apres avoir envoyer un message
            e.preventDefault();
            
            const message = {
                text: $('#txtMessage').val(),
            }
            socket.emit(IOEVENTS.SEND_MESSAGE, message);
            $('#txtMessage').val('')
        }
    });

    $("#btnUpdateUsername").click(() => {

    })

});

//TODO: Réceptions des évenement

socket.on(IOEVENTS.NEW_MESSAGE, message => {
    $('#chat-messages').append(createMessageUI(message, message.fromWho == socket.id))
})

function createMessageUI(message, isFromMe) {
    let messageLi = "";

    if (!isFromMe) {
        messageLi =
            `<li class="chat-left">
                <div class="chat-avatar">
                <img src="" alt="">
                <div class="chat-name">${message.fromWho}</div>
                </div>  
                <div class="chat-text">${message.messageText}</div>
                <div class="chat-hour">${message.timeStamp}<span class="fa fa-check-circle"></span></div>
            </li>`;
    } else {
        messageLi =
            `<li class="chat-right">
                <div class="chat-hour">${message.timeStamp}<span class="fa fa-check-circle"></span></div>
                <div class="chat-text">${message.messageText}</div>
                <div class="chat-avatar">
                    <img src="" alt="">
                    <div class="chat-name">${message.fromWho}</div>
                </div>
            </li>`
    }

    return messageLi;
}

function createUserUI(user) {

    const userLi =
        `<li class="person" data-chat="ID">
            <div class="user">
                <img src="" alt="">
            </div>
            <p class="name-time">
                <span class="name">NAME</span>
            </p>
        </li>`;


    return userLi;

}


