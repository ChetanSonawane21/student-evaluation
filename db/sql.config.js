const Sequelize = require('sequelize');
const config = require('./index');

/**
 * WE ARE USING SEQUELIZE FOR CREATING MODALS AND INITALLY CREATING TABLES IN OUR DB
 */
const sequelize = new Sequelize(config.db_name, config.user, config.password, {
  dialect: config.dialect,
  host: config.host,
  timezone: config.timezone,
  logging: config.logging
});


require('../api/api.models')(sequelize, Sequelize);

module.exports = {
  sequelize_connection: sequelize,
  DBModels: sequelize.models
};
