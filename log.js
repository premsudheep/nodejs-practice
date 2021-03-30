const EventEmitter = require('events');
const emitter = new EventEmitter();

class Log extends EventEmitter{
    log(message) {
        // Send HTTP Request
        console.log(message);
        // Raise an Event
        this.emit('messageLogged', {id: 1, value: 'log text'});
    }
}

function log(req, res, next) {
    console.log('Logging...');
    next();
}

module.exports = Log;