const { schemaOptions, commonFields } = require('../../common/common.fields');

module.exports = (sequelize_connection, Sequelize) => {
  const Test = sequelize_connection.define(
    'test',
    {
      id: commonFields.id,
      answer_sheet: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      mail: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      ...commonFields
    },
    schemaOptions
  );
  return Test;
};
