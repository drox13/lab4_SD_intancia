const express = require('express');
const cors = require('cors');
const axios = require("axios");
const { updateTime, readTime, initTime } = require('../controller/monitor')
const { decodeHour } = require('../controller/utilities')

const PORT = 8000

class Server {
    constructor() {
        this.app = express();
        this.port = PORT;
        this.server = require("http").createServer(this.app);
        this.io = require("socket.io")(this.server);
        // this.clientSocket = require("socket.io-client")('http://172.20.160.1:9000');
        this.ioClient = require("socket.io-client");
        this.clientSocket = ioClient.connect('http://172.20.160.1:9000', {
            reconnection: true
        });
        this.middleware();
        this.routes()
        this.askForHour()
        this.sockets();
        this.anotherSockets();
    }

    askForHour() {
        axios.get('http://worldtimeapi.org/api/timezone/America/Bogota')
            .then(function (response) {
                const hour_string = decodeHour(response.data.datetime.toString());
                initTime(parseInt(hour_string[0]), parseInt(hour_string[1]), parseInt(hour_string[2]));
            }).catch(err => {
                console.log('err')
            });
    }

    middleware() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('public'));
    }

    sockets() {
        this.io.on("connection", (socket) => {
            setInterval(() => {
                this.io.emit('time', { time: readTime() })
            }, 1000)
            socket.on('time_adjustment', function (data) {
                updateTime(parseInt(data.hr), parseInt(data.mn), parseInt(data.sc));
            })
        });
    }

    anotherSockets() {
        socket.on('socketClientID', function (socketClientID) {
            console.log('Connection to server established. SocketID is',socketClientID);
            socket.emit('hello_from_client', 123);
        });
    }

    routes() {
        this.app.use('/', require('../routes/monitor'));
    }

    listen() {
        this.server.listen(this.port, () => {
            console.log(`Server on! PORT ${this.port}`);
        });
    }
}

module.exports = Server;