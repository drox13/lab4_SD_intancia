//Sam Branch
const Server = require('./models/server');

const server = new Server();
server.askForHour();
server.listen();