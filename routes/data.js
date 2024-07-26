var express = require('express');
var router = express.Router();
// var debug = require('debug')('triedwhatnot.com:server');
const appendValues = require('../googleSheets');
const { getAiEnhancedText } = require('../gpt-server');

/* Save contact form data */
router.post('/contact', async function(req, res, next) {
    const { name, email, message } = req.body;

    const namePattern = /^[A-Za-z][A-Za-z'\- ]+$/;
    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    const msgPattern = /^[\w\s.,@#$%&*()[\]{};:'"!-]*$/;

    if(!name|| !email || !message ){
        res.status(200).json({
            statusCode: 3,  // 'Empty Input'
        });  
    }
    else if(!namePattern.test(name) || !emailPattern.test(email) || !msgPattern.test(message) ){
        res.status(200).json({
            statusCode: 2,  // 'Invalid Input'
        });  
    }
    else{
        await appendValues([[name, email, message]]);

        res.status(200).json({
            statusCode: 1,  // 'Success'
        });
    }
});

/* get ai enhanced text. */
router.post('/get-ai-enhanced-text', async function(req, res, next) {
    const { optionId, prompt, text } = req.body;
    console.log(optionId, prompt, text)

    const optionPattern = /^[1-3]{1}$/;
    const msgPattern = /^[\w\s.,@#$%&*()[\]{};:'"!-]*$/;

    if(!text || !optionId ){
        res.status(200).json({
            statusCode: 3,  // 'Empty Input'
        }); 
    }
    else if(!optionPattern.test(+optionId) || (prompt && !msgPattern.test(prompt)) || !msgPattern.test(text) ){
        res.status(200).json({
            statusCode: 2,  // 'Invalid Input'
        });  
    }
    else{
        let enhancedText = await getAiEnhancedText(optionId, text, prompt);

        res.status(200).json({
            statusCode: 1,  // 'Success'
            enhancedText
        });
    }
});


module.exports = router;