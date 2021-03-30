const Logger = require('./log');
const path = require('path');
const os = require('os');
const fs = require('fs');
const http = require('http');
const EventEmitter = require('events');
const pathObj = path.parse(__filename);
const freeMemory = os.freemem();


fs.readdir('./', function(err, result) {
    if (err) console.log('Error', err);
    else console.log('Result', result);
});


const logger = new Logger();
// Register a listener
logger.on('messageLogged', function (payload) {
    console.log(`Message Received : ${payload.value}`);
});
logger.log('Message');


const server = http.createServer((req, res) => {
    if(req.url === '/') {
        res.write('Hello World');
        res.end();
    }
    if(req.url === '/api/courses') {
        res.write(JSON.stringify([{id: 1, value: '1'}, {id: 2, value: '2'}]));
        res.end();
    }
});
server.listen(3000);
console.log('Listening on port 3000...');