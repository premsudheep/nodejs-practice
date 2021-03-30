const helmet = require('helmet');
const morgan = require('morgan');
const _ = require('underscore');
const express = require('express');
const logger = require('./middleware/logger');
const courses = require('./routes/courses');
const home = require('./routes/home');
const genres = require('./routes/genres');
const config = require('config');
const debug = require('debug')('app:startup'); // arg 'app:startup' is a name space where you can set the env property "EXPORT DEBUG=app:startup" OR "EXPORT DEBUG=app:startup,app:db" OR "EXPORT DEBUG=app:*" when enables only DEBUG level. OR "DEBUG=app:db nodemon index.js" will set the env var at only run time.
const dbDebugger = require('debug')('app:db');
const app = express();

//Configuration
console.log('Application Name : '+config.get('name'));
console.log('Mail Server : '+config.get('mail.host'));
console.log('Mail Password : '+config.get('mail.password')); // reads app_password from the actual system env variables "EXPORT app_password=123456"

console.log(`env = ${process.env.NODE_ENV || 'Development'}`); // env prop "EXPORT NODE_ENV=Development"
console.log(`env = ${app.get('env')}`); // by default it get "development"

if(app.get('env') === 'development') {
    app.use(morgan('tiny')); // logs a performance log for every API to console, we can configure to write it to a log file
    console.log('Morgan enabled...');
    // logs to console based on env, for E.g. skips logging when env is prod.
    debug('Morgan enabled...');
    dbDebugger('Connected to Database...');
}

app.set('view-engine', 'pug'); // Dynamically responds with a HTML template;Express will internally load this module. we don't have to use require('')
app.set('views', './views'); //Default path to load views

app.use(express.json()); // parses req body to JSON
app.use(logger);
app.use(helmet());
app.use('/api/courses', courses);
app.use('/', home);
app.use('/api/genres', genres);

const port = process.env.port || 3000; // set an env variable called port from cli(export PORT=5000)
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});

const result = _.contains([1,2,3], 2);
console.log(result);

