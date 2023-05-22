const { schemaOptions, commonFields } = require('../../common/common.fields');


module.exports = (sequelize_connection, Sequelize) => {
  const User = sequelize_connection.define(
    'user',
    {
      id: commonFields.id,
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      role: {
        type: Sequelize.ENUM,
        values: ['teacher', 'student', 'USER'],
        allowNull: false
      },
      ...commonFields
    },
    schemaOptions
  );
  return User;
};
