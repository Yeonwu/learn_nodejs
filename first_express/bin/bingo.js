Array.prototype.suffle = function () {
    for (let i = this.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [this[i], this[j]] = [this[j], this[i]];
    }
    return this;
}

var online = 0;
var userCnt = 0;
var turn = 0;
var userList = [];

var getCurrentSocket = function(socket) {
    return userList.findIndex((elem) => elem.ID == socket.id);
};

var randInt = function() {
    return Math.floor(Math.random() * 50);
}

var generateBoard = function() {
    return Array.from({ length: 25 }).fill(0);
}


const bingo = {
    start: function (io) {
        io.on('connection', function (socket) {

            online += 1;
            userCnt += 1;

            let fillNumber = Array
                .from({ length: 50 })
                .map((_, idx) => idx + 1)
                .suffle();

            let tableData = generateBoard().map((_, idx) => fillNumber[idx]);

            userList.push({
                ID: socket.id,
                board: tableData,
                checked: generateBoard(),
            });

            socket.emit('login', {
                serverData: 'Server is working...',
                userData: userList[userList.length - 1].board
            });

            socket.on('cellClicked', function (data) {
                console.log(turn);
                turn = turn > userCnt - 1 ? 0 : turn;
                var currentSocket = getCurrentSocket(socket);
                if(currentSocket == turn) {
                    turn += 1;
                    userList.forEach((user) => {
                        let idx = user.board.indexOf(data);
                        user.checked[idx] = 1;
                    });
                    io.emit('cellClicked', data);
                } else {
                    
                }
            });

            socket.on('disconnect', function () {
                console.log('Disconnected');
                online -= 1;
                var currentSocket = getCurrentSocket(socket);
                delete userList[currentSocket];
            })
        });
    }
}

module.exports = bingo;