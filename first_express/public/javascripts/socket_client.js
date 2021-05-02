function get(query) { return document.querySelector(query) };

var socket = io.connect('http://localhost:3000');
var nickname = '';

socket.on('login', function (data) {
    console.log(data);
    nickname = data.nickname;
});

socket.on('update', function (data) {
    //get('#update').innerHTML = data.count;
    get('#online').innerHTML = data.online;
    console.log(data);
});

socket.on('message_receive', function (data) {
    get('#conversation-window').innerHTML += '<p>' + data.nickname + ': ' + data.content + '<p>';
});

get('#send').addEventListener('click', function () {
    var content = get('#message');
    socket.emit('message_send', { content: content.value, nickname: nickname });
    content.value = '';
});