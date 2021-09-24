const PORT = 5000;
const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');

//socket con el coordinador
const io = require("socket.io-client");
const socket = io("http://127.0.0.1:9000/");

const cors = require('cors');
const { socketConnect, sendDataToCoordinator } = require('../controller/monitor');

class MyServer {
	constructor() {
		this.port = PORT;
		this.app = express();
		this.httpServer = createServer(this.app);
		this.io = new Server(this.httpServer, this.port);
		this.middleware();
		this.routes();
		this.sockets();
		this.coordinatorSocket();
	}

	middleware() {
		this.app.use(cors());
		this.app.use(express.json());
		this.app.use(express.static('public'));
	}

	routes() {
		this.app.use('/', require('../routes/monitor'));
	}

	sockets() {
		this.io.on('connection', socketConnect);
	}

	coordinatorSocket(){
		socket.on("connect", () => {
			console.log("se conecto al coordinador", socket.id)
		});
		
		socket.emit("saludo", "hola soy la instancia");
		
		socket.on("prueba", (arg)=>{
			console.log(arg.data);
		});
	}

	listen() {
		this.httpServer.listen(this.port);
		console.log(`Server on! PORT ${this.port}`);
	}
}

module.exports = MyServer;
