// window.onload = () => {
//     const id_input = document.getElementById('id_input');
//     const queryButton = document.getElementById('queryButton');
//     queryButton.addEventListener('click', function (event) { sendQueryData(event, id_input) })
// }

// function sendQueryData(event, id_input) {
//     const xhr = new XMLHttpRequest();
//     alert(id_input.getAttribute('id'))
//     xhr.open("GET", 'http://localhost:8000/query' + "?id=" + id_input.value, true);
//     xhr.onreadystatechange = function () {
//         if (xhr.readyState == 4 && xhr.status == 200) {
//             alert(JSON.stringify(xhr.response))
//         }
//     }
//     xhr.send(null);
// }

const socket = io();
socket.on('time', (arg) => {
    const hour = arg.time.hour;
    const minute = arg.time.minute;
    const second = arg.time.second;

    const hour_element = document.getElementById('hr_text');
    const minute_element = document.getElementById('mn_text');
    const second_element = document.getElementById('sc_text');

    hour_element.innerHTML = hour + ':';
    minute_element.innerHTML = minute + ':';
    second_element.innerHTML = second;
})