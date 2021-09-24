var socket = io(); //"http://127.0.0.1:5000/"

socket.on('connect', () => {
	console.log('connect from server!');
});

socket.on('time', (payload) => {
	let { hour, minutes, seconds } = payload.time;
	let time = new Date(2021, 09, 21, hour, minutes, seconds);
	const hour_element = document.getElementById('time');
	hour_element.innerHTML = time.getHours() + ' : ' + time.getMinutes() + ' : ' + time.getSeconds();
});

function sendNewTime() {
	let form = document.getElementById('form_set_time');
	form.addEventListener('submit', function (event) {
		event.preventDefault();
		const newHour = document.getElementById('setHour').value;
		const newMinutes = document.getElementById('setMinutes').value;
		const newSeconds = document.getElementById('setSeconds').value;
		console.log('HH: ' + newHour + ' mm: ' + newMinutes + ' ss: ' + newSeconds);
		socket.emit('newTime', {
			time: {
				hour: newHour,
				minutes: newMinutes,
				seconds: newSeconds,
			},
		});
		console.log('time sent');
	});
}
