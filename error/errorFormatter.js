/**
 * Custom Error Handler & Format Manager [Error Manager]
 */
class ApiError extends Error {
    httpCode;
    isOperational;
    constructor(httpCode, message, isOperational = true, stack) {
      super(message);
      this.httpCode = httpCode;
      this.isOperational = isOperational;
      if (stack) {
        this.stack = stack;
      } else {
        Error.captureStackTrace(this, this.constructor);
      }
    }
  }
  
module.exports = {
  ApiError
};