const axios = require('axios');

//socket con el coordinador
const io = require('socket.io-client');

const socket = io('http://127.0.0.1:9000/');
//http://192.168.100.4:9000/ //para cuando se despliegue en docker
//http://127.0.0.1:9000/  para conectarse localmente

let time = new Date();
let offset;
let gap;
let timeBeforeAdjusment;

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
	let threadSendTimeToClient = setInterval(() => {
		socketClient.emit('time', {
			time: {
				hour: time.getUTCHours(),
				minutes: time.getUTCMinutes(),
				seconds: time.getUTCSeconds(),
			},
		});
	}, 1000);

	socketClient.on('newTime', (payload) => {
		clearInterval(threadGetTimeFromAPI);
		clearInterval(threadSendTimeToClient);
		let { hour, minutes, seconds } = payload.time;
		time = new Date(2021, 09, 21, hour, minutes, seconds);
		time.setUTCHours(time.getUTCHours() - 5);
		console.log('New time: ', time.getUTCHours(), time.getUTCMinutes(), time.getUTCSeconds());
	});
};

socket.on('connect', () => {
	socket.emit('Hello', {
		saludo: 'hola soy una instancia',
		socketid: socket.id,
	});
});

socket.on('timeServer', (message) => {
	clearInterval(threadGetTimeFromAPI);
	clearInterval(threadSendTimeToClient);
	console.log(message.time, 'llega tiempo desde el coordinador');
	let timeCoordinator = new Date(message.time);
	timeBeforeAdjusment = time;
	gap = (timeCoordinator.getTime() - time.getTime()) / 1000;
	socket.emit('desfase', {
		desfase: gap,
		id: socket.id,
	});
});

socket.on('ajuste', (ajuste) => {
	//aca se podra optener el dato para sincronizar
	console.log('este es el ajuste', ajuste);
	let adjustment = ajuste;
	time.setTime(adjustment * 1000);
	socketClient.emit('adjustmentValueToClient', {
		currentTime: {
			currentHour: timeBeforeAdjusment.getUTCHours(),
			currentMinutes: timeBeforeAdjusment.getUTCMinutes(),
			currentSeconds: timeBeforeAdjusment.getUTCSeconds(),
		},
		adjustment,
		newTime: {
			hour: time.getUTCHours(),
			minutes: time.getUTCMinutes(),
			seconds: time.getUTCSeconds(),
		},
	});
});

module.exports = {
	socketConnect,
	initTime
};

