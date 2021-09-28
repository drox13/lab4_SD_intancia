var socket = io(); //"http://127.0.0.1:5000/"
var currentTimeElement = document.getElementById('current-time');
var tableBodyElement = document.getElementById('table-body');
var beforeDate = new Date();
var count = 1;

socket.on('connect', () => {
	console.log('connect from server!');
});

socket.on('time', (payload) => {
	let { hour, minutes, seconds } = payload.time;
	let time = new Date(2021, 09, 28, hour, minutes, seconds);
	currentTimeElement.innerHTML = time.getHours() + ' : ' + time.getMinutes() + ' : ' + time.getSeconds();
});

socket.on('adjustmentValueToClient', (payload) => {
	let { currentHour, currentMinutes, currentSeconds } = payload.currentTime;
	let currentTime = new Date(2021, 09, 28, currentHour, currentMinutes, currentSeconds);
	let adjustment = payload.adjustment;
	let { hour, minutes, seconds } = payload.newTime;
	let newTime = new Date(2021, 09, 28, hour, minutes, seconds);
	currentTimeElement.innerHTML = time.getHours() + ' : ' + time.getMinutes() + ' : ' + time.getSeconds();
	let cell = '<tr><th scope="row">' + count + '</th><td>' + currentTime.getTime() + '</td><td>' + adjustment + '</td><td>' + newTime.getTime + '</td></tr>';
	let row = document.createElement('TR');
	row.innerHTML = cell;
	tableBodyElement.appendChild(row);
	count++;
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
		form.reset();
		currentTimeElement.innerHTML = newHour + ' : ' + newMinutes + ' : ' + newSeconds;
		console.log('time sent');
	});
}
