const express = require('express');
const router = express.Router();
const Joi = require('joi'); // Used for Input validations
const coursesList = [{id: 1, value: 'course1'}, {id: 2, value: 'course2'}, {id: 3, value: 'course3'}];

router.get('/', (req, res) => {
    res.send(JSON.stringify(coursesList));
});
router.get('/params/:id/:year/:month', (req, res) => { // req params
    res.send(JSON.stringify({id: req.param.id, year: req.param.year, month: req.param.month}));
});
router.get('/query/:id/:year/:month', (req, res) => { // query params
    res.send(JSON.stringify({id: req.query.id, year: req.query.year, month: req.query.month}));
});
router.get('/:id/:year/:month', (req, res) => { // query params
    res.send(JSON.stringify({id: req.query.id, year: req.query.year, month: req.query.month}));
});
router.get('/:id', (req, res) => {
    const course = coursesList.find(c => c.id === parseInt(req.param.id));
    if (!course) return res.status(404).send('Course with given id not found');
    res.send(course);
});
router.post('/', (req, res) => {
    // Input Validation
    const result = validateCourse(req.body.name);
    if(result.error) return res.status(400).send(result.error.details[0].message);

    // Post operation
    const course = {
        id: coursesList.length + 1,
        name: req.body.name
    };
    coursesList.push(course);
    res.send(course);
});
router.put('/:id', (req, res) => {
    // Input Validation 1
    const course = coursesList.find(c => c.id === parseInt(req.param.id));
    if (!course) return res.status(404).send('Course with given id not found');
    // Input Validation 2
    const result = validateCourse(req.body.name);
    if(result.error) return res.status(400).send(result.error.details[0].message);
    // Update operation
    course.name = req.body.name;
    res.send(course);
});
router.delete('/:id', (req,res) => {
    // Input Validation 1
    const course = coursesList.find(c => c.id === parseInt(req.param.id));
    if (!course) return res.status(404).send('Course with given id not found');
    // Deleting operation
    const index = coursesList.indexOf(course);
    coursesList.splice(index, 1);
    res.send(course);
});

function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(course, schema);
}

module.exports = router;