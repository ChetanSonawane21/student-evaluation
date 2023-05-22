const { sequelize_connection } = require('./sql.connect');
const { applyAssociations } = require('../common/db.associations');
const { runSeeding } = require('./seeding/seeder')
/**
 * APPLY ASSOCIATIONS WHEN SEEDING IS COMPLETED
 */

class seedDatabase {

  async init(callback) {
    await sequelize_connection.sync().then(async () => {
      await runSeeding();
      console.log('All tables added successfully..!');
      applyAssociations()
      callback({ status: true });
    });
  }

  async initTruncateTable() {
    await sequelize_connection.sync();
  }
}

module.exports = new seedDatabase();
