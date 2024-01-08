const socket = io('/chattings');

const getElementById = (id) => document.getElementById(id) || null;

//* get DOM element
const helloStrangerElement = getElementById('hello_stranger');
const chattingBoxElement = getElementById('chatting_box');
const formElement = getElementById('chat_form');

function helloUser() {
  const username = prompt('What is your name?');
  socket.emit('new_user', username, (data) => {
    console.log(data); // return으로 받은 data
  });

  console.log(`name: ${username}`);

  socket.on('hello_user', (data) => {
    console.log(data); // 서버에서 emit으로 보낸 data
  });
}

function init() {
  helloUser();
}

init();
