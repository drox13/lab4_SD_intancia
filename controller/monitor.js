const axios = require('axios');

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
			console.log('hora standard');
			console.log(time);
			console.log('Hora real de buenos aires');
			let signo = offset.substring(0, 1);
			if (signo == '-') {
				time.setUTCHours(time.getUTCHours() - parseInt(offset.substring(2, 3)));
				console.log(time.getUTCHours(), time.getUTCMinutes(), time.getUTCSeconds());
			} else {
				time.setHours(time.getUTCHours() + parseInt(offset.substring(2, 3)));
				console.log(time.getUTCHours(), time.getUTCMinutes(), time.getUTCSeconds());
			}
		})
		.catch((error) => {
			console.log(error);
		});
}, 500); //60000 = 1 minuto

const socketConnect = (socketClient) => {
	console.log('Client connect!', socketClient.id);

	setInterval(() => {
		socketClient.emit('time', {
			time: {
				hour: time.getUTCHours(),
				minutes: time.getUTCMinutes(),
				seconds: time.getUTCSeconds(),
			},
		}); //se debe enviar la hora de la instancia
	}, 1000);
};

module.exports = {
	socketConnect,
};
