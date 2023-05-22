const { schemaOptions, commonFields } = require('../../common/common.fields');

module.exports = (sequelize_connection, Sequelize) => {
  const Question = sequelize_connection.define(
    'question',
    {
      id: commonFields.id,
      question_text: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      answer: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      ...commonFields
    },
    schemaOptions
  );
  return Question;
};
