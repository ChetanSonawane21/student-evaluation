const Joi = require('joi');
const { requiredString } = require('../../common/common.validation')

const schema = {
  addQuestion: Joi.object().keys({
    question_text: requiredString,
    answer:  Joi.string().trim().required() 
  }).unknown(true),
};

module.exports = { schema };
