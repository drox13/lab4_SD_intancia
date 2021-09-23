var socket = io(); //"http://127.0.0.1:5000/"

socket.on('connect', () => {
	console.log('connect from server!');
	console.log(socket.connected);
});

socket.on('time', (socket) => {
	let { hour, minutes, seconds } = socket.time;
	let time = new Date(2021, 09, 21, hour, minutes, seconds);
	const hour_element = document.getElementById('time');
	// hour_element.innerHTML = hour + ' : ' + minutes + ' : ' + seconds;
	hour_element.innerHTML = time.getHours() + ' : ' + time.getMinutes() + ' : ' + time.getSeconds();
});
