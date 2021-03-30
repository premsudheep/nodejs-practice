const express = require('express');
const router = express.Router();
const Joi = require('joi'); // Used for Input validations
const genres = [
    { id: 1, name: 'Action' },
    { id: 2, name: 'Horror' },
    { id: 2, name: 'Romance' },
];

router.get('/', (req,res) => {
    res.send(genres);
});

router.post('/', (req,res) => {
    const error = validateGenre(req.body);
    if(error) return res.status(400).send(error.detail[0].message);
    const genre = {
        id: genres.length + 1,
        name: req.body.name
    };
    genres.push(genre);
    res.send(genre);
});

router.put('/:id', (req,res) => {
    // Input Validation 1
    const genre = genres.find(c => c.id === parseInt(req.param.id));
    if (!genre) return res.status(404).send('Course with given id not found');
    // Input Validation 2
    const result = validateGenre(req.body.name);
    if(result.error) return res.status(400).send(result.error.details[0].message);
    // Update operation
    genre.name = req.body.name;
    res.send(genre);
});

router.delete('/:id', (req,res) => {
    // Input Validation 1
    const genre = genres.find(c => c.id === parseInt(req.param.id));
    if (!genre) return res.status(404).send('Course with given id not found');
    // Deleting operation
    const index = genres.indexOf(course);
    genres.splice(index, 1);
    res.send(genre);
});

router.get('/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.param.id));
    if (!genre) return res.status(404).send('Course with given id not found');
    res.send(genre);
});

function validateGenre(course) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(course, schema);
}

module.exports = router;
