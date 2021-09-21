const express = require('express');
const cors = require('cors');
const PORT = 5000

class Server{
    constructor(){
        this.app = express();
        this.port = PORT;
        this.middleware();
        this.routes()
    }

    middleware(){
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('public'));
    }

    routes(){
        this.app.use('/', require('../routes/monitor'));
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log(`Server on! PORT ${this.port}`);
        });
    }
}

module.exports = Server;