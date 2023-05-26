const { sequelize_connection } = require('./sql.config');
const Model = sequelize_connection.models;

const TableModels = {
  USER: Model.user,
  QUESTION: Model.question,
  TEST: Model.test,
  HISTORY: Model.test_history
};

module.exports = {
  sequelize_connection: sequelize_connection,
  DB_TABLES: TableModels
};
