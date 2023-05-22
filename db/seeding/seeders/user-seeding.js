const userJson = require('../jsons/user.json')
const { DB_TABLES } = require('../../sql.connect')
const { validateJSON } = require('../validation/validate')

module.exports.userSeed = async () => {
  const records = await validateJSON(userJson, DB_TABLES.USER, 'id');
  if (records.length > 0) return await DB_TABLES.USER.bulkCreate(records);
  return;
}
