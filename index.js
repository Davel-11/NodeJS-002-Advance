const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const courses = [
    {id: 1, name: 'course1' },
    {id: 2, name: 'course2' },
    {id: 3, name: 'course3' }
]

//helo world
app.get('/', (req, res) => {
    res.send('Hello World');
});

//many parameters
app.get('/api/posts/:year/:month', (req, res) => {
    //res.send(req.params);
    res.send(req.query);
});

//METODOO GET GET ALL--------------
app.get('/api/courses', (req, res) => {
    res.send(courses);
});

//METODOO GET 1 ID--------------
app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id) );
    if(!course) { return res.status(404).send('the course with the given ID was not found');   }
    else {  res.send(course); }
});

//METODO POST --------------------------
app.post('/api/courses', (req, res) => {              
    const { error } = validateCourse(req.body);
    if(error){ return res.status(400).send(error.details[0].message); }
    
    const course = {
        id: courses.length +1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});


app.put('/api/courses/:id', (req, res) => {    
    const course = courses.find(c => c.id === parseInt(req.params.id) );
    if(!course) { return res.status(404).send('the course with the given ID was not found'); }
    
    const { error } = validateCourse(req.body);
    if(error){return res.status(400).send(error.details[0].message); }
    
    course.name = req.body.name;
    res.send(course);
});

app.delete('/api/courses/:id', (req, res) => {
    let course = courses.find(c => c.id === parseInt(req.params.id) );
    if(!course) { return res.status(404).send('the course with the given ID was not found');   }
    
    const index = courses.indexOf(course);
    courses.splice(index, 1),
    
    res.send(course);
});

//validacioens
function validateCourse(course){
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(course, schema);   
}

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`) );












