const Joi = require('joi');
const { custom_id, mobile_no } = require('../../common/common.validation');

const schema = {
  login: Joi.object().keys({
    email: Joi.string().trim().email().required(),
    password: Joi.string().trim().min(5).required(),
    role: Joi.string().valid('teacher', 'student').required(),
  }).unknown(true),
  register: Joi.object().keys({
    name: Joi.string().trim().min(3).required(),
    email: Joi.string().trim().email().required(),
    password: Joi.string().trim().min(5).required(),
    role: Joi.string().valid('teacher', 'student').required(),
  }).unknown(true),
};

module.exports = { schema };
