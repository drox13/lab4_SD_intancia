var socket = io(); //"http://127.0.0.1:5000/"

socket.on("connect", () => {
    console.log("connect from server!");
    console.log(socket.connected);
});

socket.on("time", (socket)=>{
    var time = new Date(socket.time);
    const hour_element = document.getElementById('time');
    hour_element.innerHTML = time.getHours() + ' : ' + time.getMinutes() + ' : ' + time.getSeconds();
});