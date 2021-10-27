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
        const newUsername = $('#txtUsername').val()
        socket.emit(IOEVENTS.UPDATE_NAME, newUsername)
    })

    $("#img1btn,#img2btn,#img3btn,#img4btn,#img5btn,#img6btn,#img7btn,#img8btn,#img9btn,#img10btn,#img11btn,#img12btn,#img13btn").click(function(event) {
        // A faire!
        console.log(event.target.src)
        // alert(`${event.target.id}`);  
    });

});

//TODO: Réceptions des évenement

socket.on(IOEVENTS.NEW_MESSAGE, message => {
    $('#chat-messages').append(createMessageUI(message, message.fromWho.id == socket.id))
})

socket.on(IOEVENTS.LIST_USER, users => {
    $('#listUser').empty()

    users.forEach(user => {
        $('#listUser').append(createUserUI(user))
    })
})

function createMessageUI(message, isFromMe) {
    let messageLi = "";

    if (!isFromMe) {
        messageLi =
            `<li class="chat-left">
                <div class="chat-avatar">
                <img src="${message.fromWho.avatar}" alt="">
                <div class="chat-name">${message.fromWho.name}</div>
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
                    <img src="${message.fromWho.avatar}" alt="">
                    <div class="chat-name">${message.fromWho.name}</div>
                </div>
            </li>`
    }

    return messageLi;
}

function createUserUI(user) {

    const userLi =
        `<li class="person" data-chat="ID">
            <div class="user">
                <img src="${user.avatar}" alt="">
            </div>
            <p class="name-time">
                <span class="name">${user.name}</span>
            </p>
        </li>`;


    return userLi;

}

function getImage(){
    alert("OK!");
}