const { sequelize_connection, DB_TABLES } = require('../db/sql.connect');

function applyAssociations() {
  console.log('Associations applied successfully..!');
}

module.exports = { applyAssociations };