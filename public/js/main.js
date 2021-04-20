import Chat from './modules/Chat.js';
import {NewConnMessage, DisconnMessage} from './modules/Notify.js';

const socket = io();

function logConnect({sID, message}) { //{sID, message}
    console.log(sID, message);
    vm.socketID = sID;
}

function appendMessage(message) {
    message.type = 'chatMessage';
    vm.messages.push(message);
}

function appendNotification(message) {
    console.log('appending notification');
    if (message.event === 'newConn') {
        message.type = 'newConnMessage';
    } else if (message.event === 'disconn') {
        message.type = 'disconnMessage';
    } else {
        console.log(`unkown message type: ${message.type}`);
        return;
    }
    vm.messages.push(message);
}

const vm = new Vue({
    data: {
        socketID: "",
        nickname: "",
        avatar: 'img/Anonymous.jpg',
        message: "",
        current:"",
        messages: []
    },

    methods: {
        dispatchMessage() {
            socket.emit('chat message', {
                content: this.message,
                name: this.nickname || "Anonymous",
                avatar: this.avatar
            });

            this.message = "";
        },
        addClass:function(index){
            this.current=index;
        }
    },
    components: {
        chatMessage: Chat,
        newConnMessage: NewConnMessage,
        disconnMessage: DisconnMessage
    }
}).$mount(`#app`);

socket.on('connected', logConnect);
socket.addEventListener('chat message', appendMessage);
socket.addEventListener('notification', appendNotification);
socket.addEventListener('disconnect', appendMessage);
socket.addEventListener('select avatar', appendMessage);