const { schemaOptions, commonFields } = require('../../common/common.fields');

module.exports = (sequelize_connection, Sequelize) => {
  const Test_History = sequelize_connection.define(
    'test_history',
    {
      id: commonFields.id,
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      score: {
        type: Sequelize.INTEGER,
        allowNull: false
      },

      ////////////////////////  QYESTIONS

      q1: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      q2: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      q3: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      q4: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      q5: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      //////////////////////// ANSWERS
      a1: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      a2: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      a3: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      a4: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      a5: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      //////////////////////// MARKS
      m1: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      m2: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      m3: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      m4: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      m5: {
        type: Sequelize.INTEGER,
        allowNull: false
      },


      ...commonFields
    },
    schemaOptions
  );
  return Test_History;
};
