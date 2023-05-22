const Joi = require('joi');
const { requiredString, mobile_no } = require('../../common/common.validation')

const questionAnswer = Joi.object().keys({
  id: Joi.number().positive().required(),
  question_number: Joi.number().positive().required(),
  answer: Joi.string().trim().optional().allow(null, "")
})
  .required()
  .unknown(true);

const schema = {
  answerSheet: Joi.array().items(questionAnswer).required()
};

module.exports = { schema };



