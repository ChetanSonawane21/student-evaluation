const express = require('express');
const joi = require('../../middleware/inputValidation');
const router = express.Router();
const questionController = require('./question.controller')
const { schema } = require('./question.validation')

router.post('/add', [joi(schema.addQuestion)], questionController.add);

module.exports = router;
