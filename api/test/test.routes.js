const express = require('express');
const joi = require('../../middleware/inputValidation');
const router = express.Router();
const TestController = require('./test.controller')
const { schema } = require('./test.validation')

router.get('/begin', TestController.beginTest);
router.get('/getquestions', TestController.getAllQuestions);
router.get('/gethistory', TestController.getTestHistory);
router.get('/deletequestion/:id', TestController.deleteQuestion);
router.post('/evaluate/:mail', [joi(schema.answerSheet)], TestController.evaluateTest);
router.get('/result/:id', TestController.getPreviousResult);

module.exports = router;
