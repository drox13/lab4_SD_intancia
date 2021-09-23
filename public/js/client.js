window.onload = () => {
    initComponents();
}

const socket = io();

socket.on('time', (arg) => {
    const hour = arg.time.hour;
    const minute = arg.time.minute;
    const second = arg.time.second;

    const hour_element = document.getElementById('hr_text');
    const minute_element = document.getElementById('mn_text');
    const second_element = document.getElementById('sc_text');

    hour_element.innerHTML = (hour < 10) ? '0' + hour + ':' : hour + ':';
    minute_element.innerHTML = (minute < 10) ? '0' + minute + ':' : minute + ':';
    second_element.innerHTML = (second < 10) ? '0' + second : second;
})

function initComponents() {
    const hr_selector = document.getElementById('hr_selector');
    const mn_selector = document.getElementById('mn_selector');
    const sc_selector = document.getElementById('sc_selector');

    for (let i = 0; i < 60; i++) {
        const sc_element = document.createElement('option');
        sc_element.value = '' + i;
        sc_element.text = (i < 10) ? '0' + i : i;
        const mn_element = document.createElement('option');
        mn_element.value = '' + i;
        mn_element.text = (i < 10) ? '0' + i : i;
        sc_selector.appendChild(sc_element);
        mn_selector.appendChild(mn_element);
    }
    for (let i = 0; i < 24; i++) {
        const element = document.createElement('option');
        element.value = '' + i;
        element.text = (i < 10) ? '0' + i : i;
        hr_selector.appendChild(element);
    }

    document.getElementById('adjust_button').addEventListener
        ('click', function (event) { sendAdjustData(event, hr_selector, mn_selector, sc_selector) })
}

function sendAdjustData(event, hr_selector, mn_selector, sc_selector) {
    socket.emit('time_adjustment', {hr: hr_selector.value, mn: mn_selector.value, sc: sc_selector.value})
}