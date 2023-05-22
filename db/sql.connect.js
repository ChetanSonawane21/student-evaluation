const { sequelize_connection } = require('./sql.config');
const Model = sequelize_connection.models;

const TableModels = {
  USER: Model.user,
  QUESTION: Model.question,
  TEST: Model.test
};

module.exports = {
  sequelize_connection: sequelize_connection,
  DB_TABLES: TableModels
};
