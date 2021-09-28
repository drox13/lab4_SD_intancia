window.onload = () => {
	document.getElementById('submit_button').addEventListener('click', sendNewTime)
}

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
	currentTimeElement.innerHTML = (time.getHours() - 5) + ' : ' + time.getMinutes() + ' : ' + time.getSeconds();
});
socket.on('ajuste2', (payload) => {
	const previous_hour = payload.before_hours + ':' + payload.before_mins + ':' + payload.before_secs;
	const adjustment = payload.adjustment;
	const new_hour = payload.new_hours + ':' + payload.new_mins + ':' + payload.new_secs;
	let cell = '<tr><th scope="row">' + count + '</th><td>' + previous_hour + '</td><td>' + adjustment + '</td><td>' + new_hour + '</td></tr>';
	let row = document.createElement('TR');
	row.innerHTML = cell;
	tableBodyElement.appendChild(row);
	count++;
});

function sendNewTime() {
	const newHour = document.getElementById('hours_input').value;
	const newMinutes = document.getElementById('mins_input').value;
	const newSeconds = document.getElementById('secs_input').value;
	console.log('HH: ' + newHour + ' mm: ' + newMinutes + ' ss: ' + newSeconds);
	socket.emit('newTime', {
		time: {
			hour: newHour,
			minutes: newMinutes,
			seconds: newSeconds,
		},
	});
}
