'use strict';

var http = require('http');
var path = require('path');

var socketio = require('socket.io');
var express = require('express');

module.exports = class Server {
    constructor() {
        this.sockets = [];
    }

    init() {
        this.router = express();
        this.server = http.createServer(this.router);
        this.io = socketio.listen(this.server);
        this.io.set('log level', 1);
        this.router.use(express.static(path.resolve(__dirname, '../client')));


        this.io.on('connection', (socket) => {

            this.emit(socket, 'message', this.messageWithTime("Bienvenue nouvel arrivant !"));

            this.broadcast('message', this.messageWithTime("Nouvel arrivant."));

            this.sockets.push(socket);

            socket.on('disconnect', () => {
                this.sockets.splice(this.sockets.indexOf(socket), 1);
                this.broadcast('message', this.messageWithTime("Quelqu'un est parti."));
            });

        });

        this.server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", () => {
            var addr = this.server.address();
            console.log("Chat server listening at", addr.address + ":" + addr.port);
        });
    }

    emit(socket, event, data) {
        socket.emit(event, data);
    }

    broadcast(event, data) {
        this.sockets.forEach((socket) => {
            this.emit(socket, event, data);
        });
    }

    messageWithTime(message) {
        return new Date().toLocaleTimeString() + " : " + message;
    }
};