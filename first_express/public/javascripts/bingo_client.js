var get = function(query) {return document.querySelector(query);}
var getAll = function(query) {return document.querySelectorAll(query);}

var socket = io('/bingo');
var board = {};

var emitCellClick = function(idx) {
    socket.emit('cellClicked', board[idx]);
}

var initBoard = function(data) {
    board = data.userData;
    getAll('td').forEach((elem, idx) => {
        elem.innerText = board[idx];
        elem.addEventListener('click', function() {
            var closerIdx = idx;
            emitCellClick(closerIdx);
        });
    });
}

var updateBoard = function(data) {
    var checkNum = data;
    getAll('td').forEach((elem, idx) => {
        if(board[idx] == checkNum) {
            elem.classList.add('checked');
        }
    });
}

socket.on('login', (data) => initBoard(data));
socket.on('cellClicked', (data) => updateBoard(data));