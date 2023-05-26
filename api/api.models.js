module.exports = (sequelize_connection, Sequelize) => {
  return {
    user: require('./user/user.model')(sequelize_connection, Sequelize),
    question: require('./question/question.model')(sequelize_connection, Sequelize),
    test: require('./test/test.model')(sequelize_connection, Sequelize),
    test_history: require('./test/test_history.model')(sequelize_connection, Sequelize)
  };
};