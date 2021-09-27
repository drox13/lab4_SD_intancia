const axios = require('axios');

//socket con el coordinador
const io = require("socket.io-client");
const socket = io("localhost:9000/"); //http://127.0.0.1

let time = new Date();
let offset;

setInterval(() => {
	axios
		.get('http://worldtimeapi.org/api/timezone/America/Buenos_Aires')
		.then(({ data }) => {
			time = new Date(data.utc_datetime);
			offset = data.utc_offset;

			// console.log('OJO: el siguiente metodo optinen las horas de una fecha, usando el tiempo local');
			// console.log(time.getHours(), time.getMinutes(), time.getSeconds());
			// console.log('hora standard');
			// console.log(time);
			// console.log('Hora real de buenos aires');
			let signo = offset.substring(0, 1);
			if (signo == '-') {
				time.setUTCHours(time.getUTCHours() - parseInt(offset.substring(2, 3)));
				// console.log(time.getUTCHours(), time.getUTCMinutes(), time.getUTCSeconds());
			} else {
				time.setUTCHours(time.getUTCHours() + parseInt(offset.substring(2, 3)));
				// console.log(time.getUTCHours(), time.getUTCMinutes(), time.getUTCSeconds());
			}
		})
		.catch((error) => {
			//console.log(error);
			console.log("Error en api");
		});
}, 900); //60000 = 1 minuto

const socketConnect = (socketClient) => {
	console.log('Client connect!', socketClient.id);
	setInterval(() => {
		socketClient.emit('time', {
			time: {
				hour: time.getUTCHours(),
				minutes: time.getUTCMinutes(),
				seconds: time.getUTCSeconds(),
			},
		}); 
	}, 1000);
};

socket.on("connect", () => {
	socket.emit("Hello", {
		saludo: "hola soy una instancia",
		socketid: socket.id	
	});
});

var desfase
socket.on("timeServer",(message)=>{
 	console.log(message.time, "este console");
	let timeCoordinator = new Date(message.time);
	desfase = (timeCoordinator.getTime() - time.getTime())/1000
	socket.emit("desface", {
		desface: desfase,
		id: socket.id
		}
	);
});

socket.on("sincronization", (dataSincronitazion)=>{
	//aca se podra optener el dato para sincronizar
})

module.exports = {
	socketConnect,
};