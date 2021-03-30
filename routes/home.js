const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const isDynamic = true;
    if(!isDynamic)
        res.send(JSON.stringify({id:1,name:'Hello World'}));
    else
        res.render('index', {title: 'My First Express App', message: 'Hello World'})
});

module.exports = router;