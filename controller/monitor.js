const axios = require('axios');
const io = require('socket.io-client');
const socket = io('http://127.0.0.1:9000/');

let time = new Date();
let offset;

let threadGetTimeFromAPI = setInterval(() => {
	axios
		.get('http://worldtimeapi.org/api/timezone/America/Buenos_Aires')
		.then(({ data }) => {
			time = new Date(data.utc_datetime);
			offset = data.utc_offset;

			// console.log('OJO: el siguiente metodo optinen las horas de una fecha, usando el tiempo local');
			// console.log(time.getHours(), time.getMinutes(), time.getSeconds());
			// console.log('hora standard');
			// console.log(time);
			console.log('Hora real de buenos aires');
			let signo = offset.substring(0, 1);
			if (signo == '-') {
				time.setUTCHours(time.getUTCHours() - parseInt(offset.substring(2, 3)));
				console.log(time.getUTCHours(), time.getUTCMinutes(), time.getUTCSeconds());
			} else {
				time.setUTCHours(time.getUTCHours() + parseInt(offset.substring(2, 3)));
				console.log(time.getUTCHours(), time.getUTCMinutes(), time.getUTCSeconds());
			}
		})
		.catch((error) => {
			console.log(error);
		});
}, 900); //60000 = 1 minuto

const socketConnect = (socketClient) => {
	console.log('Client connect!', socketClient.id);
	let threadSendTimeToClient = setInterval(() => {
		socketClient.emit('time', {
			time: {
				hour: time.getUTCHours(),
				minutes: time.getUTCMinutes(),
				seconds: time.getUTCSeconds(),
			},
		}); //se debe enviar la hora de la instancia
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

socket.on('timeServer', (message) => {
	let timeCoordinator = new Date(message.time);
	gap = (timeCoordinator.getTime() - time.getTime()) / 1000;
	socket.emit('desface', {
		gap,
	});
});

socket.on('gapNewValue', (message) => {
	let newValue = message.newValue;
	time.setTime(newValue * 1000);
	socket.emit('newValueToClient', {
		time: {
			hour: time.getUTCHours(),
			minutes: time.getUTCMinutes(),
			seconds: time.getUTCSeconds(),
		},
	});
});

module.exports = {
	socketConnect,
};
