var express = require('express');
var router = express.Router();
// var debug = require('debug')('triedwhatnot.com:server');
const appendValues = require('../googleSheets');

/* GET home page. */
router.post('/contact', async function(req, res, next) {
    const { name, email, message } = req.body;

    const namePattern = /^[A-Za-z][A-Za-z'\- ]+$/;
    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    const msgPattern = /^[\w\s\p{P}!]*$/;

    if(!name|| !email || !message ){
        res.status(200).json({
            statusCode: 3,  // 'Empty Input'
        });  
    }

    if(!namePattern.test(name) || !emailPattern.test(email) || !msgPattern.test(message) ){
        res.status(200).json({
            statusCode: 2,  // 'Invalid Input'
        });  
    }

    await appendValues([[name, email, message]]);

    res.status(200).json({
        statusCode: 1,  // 'Success'
    });
});

module.exports = router;