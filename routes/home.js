const express = require('express');
const router = express.Router();


//helo world
router.get('/', (req, res) => {
    res.render('index', {title: 'My app', message: 'hello'});

});

//many parameters
router.get('/api/posts/:year/:month', (req, res) => {
    //res.send(req.params);
    res.send(req.query);
});


module.exports = router;
