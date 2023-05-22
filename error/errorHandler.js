const { StatusCodes } =  require("http-status-codes");
const { Config } = require('../common/config/config')

const errorHandler = (err, req, res, next) => {
  
  console.log('err:',err)

    let {  httpCode,  message } = err;
  
    res.locals.errorMessage = err.message;
  
    if (!message) message = 'Internal Server Error!';
    if (!httpCode) httpCode = StatusCodes.INTERNAL_SERVER_ERROR;

    const response = {
      status: false,
      httpCode,
      message,
      ...({ stack: err.stack }),
    };
  
    if (message) {
      console.log(`${Config.COLOUR.red} Error Message: ${message} ${Config.COLOUR.reset}`);
    } else {
      console.log(`${Config.COLOUR.red} Error Stack: ${err.stack } ${Config.COLOUR.reset}`);
    }


    return res.fail(response);
};

module.exports = {
  errorHandler
};