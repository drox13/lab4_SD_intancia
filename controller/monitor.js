const axios = require('axios');

setInterval(() => {
    axios.get("http://worldtimeapi.org/api/timezone/America/Buenos_Aires")
    .then(({data}) => {
        let time = new Date(data.utc_datetime);
        let offset = data.utc_offset;
       
        console.log("OJO: el siguiente metodo optinen las horas de una fecha, usando el tiempo local");
        console.log(time.getHours(), time.getMinutes(), time.getSeconds());
        console.log("hora de Buenos_Aires");
        console.log(time);
        console.log("Hora real de buenos aires");
        let signo = offset.substring(0, 1)
        if(signo == "-"){
            console.log(time.getUTCHours() - parseInt(offset.substring(2, 3)), time.getUTCMinutes(), time.getUTCSeconds() );
        }else{
            console.log(time.getUTCHours() + parseInt(offset.substring(2, 3)), time.getUTCMinutes(), time.getUTCSeconds() );
        }
    })
    .catch(error=>{
        console.log(error);
    });
}, 2000); //60000 = 1 minuto