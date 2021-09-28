const axios = require('axios');

//socket con el coordinador
const io = require("socket.io-client");

const socket = io("http://127.0.0.1:9000/"); 
//http://192.168.100.4:9000/ //para cuando se despliegue en docker
//http://127.0.0.1:9000/  para conectarse localmente

let time = new Date();
let offset;



const initTime = () => {
	console.log('me llamaron')
	axios
		.get('http://worldtimeapi.org/api/timezone/America/Buenos_Aires')
		.then(({ data }) => {
			time = new Date(data.utc_datetime);
			offset = data.utc_offset;
			let signo = offset.substring(0, 1);
			if (signo == '-') {
				time.setUTCHours(time.getUTCHours() - parseInt(offset.substring(2, 3)));
			} else {
				time.setUTCHours(time.getUTCHours() + parseInt(offset.substring(2, 3)));
			}
		})
		.catch((error) => {
			console.log("Error en api");
		});
		setInterval(() => {
			time.setSeconds(time.getSeconds() + 1);
		}, 1000)
}

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
	let timeCoordinator = new Date(message.time);
	desfase = (timeCoordinator.getTime() - time.getTime())/1000
	socket.emit("desfase", {
		desfase: desfase,
		id: socket.id
		}
	);
});

socket.on("ajuste", (ajuste)=>{
	//aca se podra optener el dato para sincronizar
	console.log("este es el ajuste", ajuste);
})

module.exports = {
	socketConnect,
	initTime
};