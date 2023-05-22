const questionsJson = require('../jsons/questions.json')
const { DB_TABLES } = require('../../sql.connect')
const { validateJSON } = require('../validation/validate')

module.exports.questionsSeed = async () => {
  const records = await validateJSON(questionsJson, DB_TABLES.QUESTION, 'id');
  if (records.length > 0) return await DB_TABLES.QUESTION.bulkCreate(records);
  return;
}
