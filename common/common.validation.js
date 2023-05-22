const Joi = require('joi')

const requiredString = Joi.string().trim().required();

const mobileNumber = Joi.string()
  .min(10)
  .max(10)
  .regex(/^(\+\d{1,3}[- ]?)?\d{10}$/)
  .messages({
    'string.pattern.base': `mobile number contains only numbers`,
    'string.min': `mobile number should be 10 in length`,
    'string.max': `mobile number should be 10 in length`
  })
  .required();


module.exports = {
  requiredString,
  mobileNumber
}