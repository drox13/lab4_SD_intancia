const PORT = 5000
const express = require('express');
const { createServer } = require("http");
const { Server } = require("socket.io")

const cors = require('cors');

class MyServer{
    constructor(){
        this.port = PORT;
        this.app = express();
        this.httpServer = createServer(this.app);
        this.io = new Server(this.httpServer,this.port);
        this.middleware();
        this.routes()
        this.sockets();
    }

    middleware(){
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('public'));
    }

    routes(){
        this.app.use('/', require('../routes/monitor'));
    }

    sockets() {
        this.io.on("connection", (client) => {
          console.log("Client connect!");
        });

        setInterval(() => {
            this.io.emit("time",{time: new Date()}); //se debe enviar la hora de la instancia
        }, 1000);
    }

    listen(){
        this.httpServer.listen(this.port);
        console.log(`Server on! PORT ${this.port}`);
    }
}

module.exports = MyServer;