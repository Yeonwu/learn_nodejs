var online = 0;
var name_cnt = 1;
const chat = {
    start: function(io) {
        io.on('connection', function(socket) {
            online += 1;
            socket.emit('login', {serverData: 'Server is working...', nickname: '익명' + name_cnt++});
            io.emit('update', {online: online});

            socket.on('message_send', function(data) {
                io.emit('message_receive', data);
            });

            socket.on('disconnect', function() {
                console.log('Disconnected');
                online -= 1;
                io.emit('update', {online: online});
            })
        });
    }
}

module.exports = chat;