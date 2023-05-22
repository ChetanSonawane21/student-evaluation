const userSeed =  require('./user-seeding').userSeed;
const questionsSeed =  require('./question-seeding').questionsSeed;

module.exports.SEEDERS = [
    userSeed,
    questionsSeed
]