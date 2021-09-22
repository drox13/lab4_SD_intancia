const express = require('express');
const cors = require('cors');
const axios = require("axios");
const { updateTime } = require('../controller/monitor')
const { decodeHour } = require('../controller/utilities')
const PORT = 5000

class Server {
    constructor() {
        this.app = express();
        this.port = PORT;
        this.middleware();
        this.routes()
    }

    askForHour() {
        axios.get('http://worldtimeapi.org/api/timezone/America/Bogota')
            .then(function (response) {
                const hour_string = decodeHour(response.data.datetime.toString());
                updateTime(hour_string[0], hour_string[1], hour_string[2]);
            }).catch(err => {
                console.log('err')
            });
    }

    middleware() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use('/', require('../routes/monitor'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server on! PORT ${this.port}`);
        });
    }
}

module.exports = Server;