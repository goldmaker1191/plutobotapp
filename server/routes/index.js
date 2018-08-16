// import {dialogFlow} from './../config/dialogFlow';
const {dialogFlow} = require('./../config/dialogFlow');

const projectId = 'plutobot-6254b' // update with your project Id
const sessionId = 'a-random-session-id' // use any string as session Id
const languageCode = 'en-US'


const { Router } = require('express')

const router = Router()


/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send("The app is running. Use the chatbot to test it");
})

router.post('/bot', (req,res, next) => {
    console.log(req.body);
    dialogFlow(req,res);
});


module.exports = router
