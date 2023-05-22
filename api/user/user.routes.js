const express = require('express');
const joi = require('../../middleware/inputValidation');
const router = express.Router();
const UserController = require('./user.controller')
const { schema } = require('./user.validation')

router.post('/login', [joi(schema.login)], UserController.login);
router.post('/register', [joi(schema.register)], UserController.register);

module.exports = router;
