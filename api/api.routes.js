const express = require('express');
const router = express.Router();
const userRoutes = require('./user/user.routes')
const questionRoutes = require('./question/question.routes')
const testRoutes = require('./test/test.routes')

router.use('/user', userRoutes);
router.use('/question', questionRoutes);
router.use('/test', testRoutes);

module.exports = router;