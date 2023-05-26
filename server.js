require('express-async-errors');
const express = require('express');
var cookieParser = require('cookieParser')
app = express();
const { Config } = require('./common/config/config');
const err = require('./error/index');
const initDB = require('./db/sql.init.db')


/**
 * Initialize db
 */
initDB.init((result) => {});

/**
 * Initialize middlewares
 */
require('./middleware/middleware')(app);

/**
 * initialize routes
 */
app.use(Config.SERVER.BASE_URL, require('./api/api.routes'));
  
/**
 * Initialie error and exception handler
 */
app.use(err.iRouteHandler); 
app.use(err.errorHandler); 
err.exceptionHandler();    

/**
 * start server
 */
app.listen(Config.SERVER.port, () => {
  console.log(`${Config.COLOUR.green}HTTP Server listning on port ${Config.SERVER.port}..! ${Config.COLOUR.reset}`);
});
