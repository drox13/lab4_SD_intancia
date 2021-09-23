const socketConnect = (socketClient) => {
	console.log('Client connect!', socketClient.id);

	setInterval(() => {
		socketClient.emit('time', { time: new Date() }); //se debe enviar la hora de la instancia
	}, 1000);
};

module.exports = {
	socketConnect,
};
