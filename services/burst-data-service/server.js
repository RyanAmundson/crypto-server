var WebSocketServer = require('../../').Server;
var express = require('express');
var path = require('path');
var app = express();
var server = require('http').createServer();
var WebSocket = require('ws');

app.use(express.static(path.join(__dirname, '/public')));

var wss = new WebSocketServer({ server: server });
var websocket = new WebSocket('wss://0-100-pool.burst.cryptoguru.org/ws');

var data = {};
var socket;


websocket.onmessage = function(evt) {
    if (socket)
        socket.send(evt.data, () => {});
}


wss.on('connection', function(ws) {
    socket = ws;

});

server.on('request', app);
server.listen(8080, function() {
    console.log('Listening on http://localhost:8080');
});