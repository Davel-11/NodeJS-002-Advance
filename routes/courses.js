const express = require('express');
const router = express.Router();

const courses = [
    {id: 1, name: 'course1' },
    {id: 2, name: 'course2' },
    {id: 3, name: 'course3' }
]

//METODOO GET GET ALL--------------
router.get('/', (req, res) => {
    res.send(courses);
});

//METODOO GET 1 ID--------------
router.get('/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id) );
    if(!course) { return res.status(404).send('the course with the given ID was not found');   }
    else {  res.send(course); }
});

//METODO POST --------------------------
router.post('/', (req, res) => {              
    const { error } = validateCourse(req.body);
    if(error){ return res.status(400).send(error.details[0].message); }
    
    const course = {
        id: courses.length +1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});


router.put('/:id', (req, res) => {    
    const course = courses.find(c => c.id === parseInt(req.params.id) );
    if(!course) { return res.status(404).send('the course with the given ID was not found'); }
    
    const { error } = validateCourse(req.body);
    if(error){return res.status(400).send(error.details[0].message); }
    
    course.name = req.body.name;
    res.send(course);
});

router.delete('/:id', (req, res) => {
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

module.exports = router;
