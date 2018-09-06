

const Joi = require('joi');
const logger = require('./middleware/logger')
const express = require('express');
const app = express();
const morgan = require('morgan');
const courses = require('./routes/courses');
const home = require('./routes/home');


app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.json());
app.use(express.urlencoded( { extended: true } )); 
app.use(express.static('public'));
app.use(logger);
app.use('/api/courses', courses);
app.use('/', home);

if(app.get('env') === 'development' ){
    app.use(morgan('tiny'));
    console.log('Morgan Enable...');
}

app.use(function(req, res, next) {
    console.log('Authenticating..');
    next();
});

app.use(logger);


// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`) );












