const Sequelize = require('sequelize');

const schemaOptions = {
  timestamps: true,
  createdAt: 'created_ts',
  updatedAt: 'updated_ts',
  underscored: true,
  freezeTableName: true
};

const commonFields = {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  is_deleted: { type: Sequelize.BOOLEAN, defaultValue: false }
};

module.exports = {
  schemaOptions,
  commonFields
};
