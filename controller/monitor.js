const axios = require('axios');
let io2 = null;
//socket con el coordinador
const io = require('socket.io-client');


const socket = io('http://192.168.122.1:9000');
//http://192.168.100.4:9000/ //para cuando se despliegue en docker
//http://127.0.0.1:9000/  para conectarse localmente

let time = new Date();
let offset;
let gap;
let timeBeforeAdjusment;

const setIO2 = (in_io2) => {
	io2 = in_io2;
}

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

	socketClient.on('newTime', (payload) => {
		let { hour, minutes, seconds } = payload.time;
		time.setHours(hour);
		time.setMinutes(minutes);
		time.setSeconds(seconds);
		console.log('new time : ' + time)
	});
};

socket.on('connect', () => {
	socket.emit('Hello', {
		saludo: 'hola soy una instancia',
		socketid: socket.id,
	});
});

socket.on('timeServer', (message) => {
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
	console.log('este es el ajuste', ajuste);
	let adjustment = ajuste;
	const before_hours = time.getHours();
	const before_mins = time.getMinutes();
	const before_secs = time.getSeconds();
	time.setSeconds(time.getSeconds() + adjustment)
	io2.emit('ajuste2',{ before_hours, before_mins, before_secs, adjustment, new_hours: time.getHours(), new_mins: time.getMinutes(), new_secs: time.getSeconds()})
});

module.exports = {
	socketConnect,
	initTime,
	setIO2
};

