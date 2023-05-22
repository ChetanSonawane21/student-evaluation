const { StatusCodes } = require('http-status-codes');
const { ApiError } = require('../../error/index');

/**
 * THIS IS USED TO CHECK WHETHER DATA IS EMPTY AND SET MESSAGE, STATUS PROPERTY ACCORDINGLY
 * @param {Object} : ACCEPT OBJECT CONTAINING MESSAGE, STATUS, DATA
 * @returns {Object} : OBJECT WITH UPDATED MESSAGE, STATUS
 * @here :  ALLOW EMPTY ALLOWS TO SEND SUCCESS STATUS ON EMPTY DATA
 */
const isEmptyObject = ({ message, status, data, allowEmpty }) => {
  try {
    if (data == null || (Object.entries(data).length === 0 && allowEmpty == false)) {
      status = false;
      message = 'DATA_NOT_FOUND';
    }
    return { message, status, data };
  } catch (err) {
    throw new ApiError(
      'INTERNAL_SERVER_ERROR',
      StatusCodes.INTERNAL_SERVER_ERROR,
      true,
      'Something went wrong',
      'isEmptyObject'
    );
  }
};

/**
 *
 * @param {*} req : REQUEST
 * @param {*} res : RESPONCE
 * @param {*} next : NEXT
 */

const responseUtility = (req, res, next) => {
  res.ok = async function ({
    status = true,
    statusCode = StatusCodes.OK,
    message = {},
    data = {},
    allowEmpty = false
  }) {
    ({ message, status, data } = isEmptyObject({ message, status, data, allowEmpty }));
    return res.status(statusCode).json({
      status,
      statusCode,
      message,
      data
    });
  };

  res.fail = function ({ error = {}, status = false, statusCode = StatusCodes.OK, message = '', data = {} }) {
    let errorResponse = {
      error,
      status,
      statusCode,
      message,
      data
    };
    return res.status(statusCode).json(errorResponse);
  };

  res.unauthenticated = function ({
    error = {},
    status = false,
    statusCode = StatusCodes.UNAUTHORIZED,
    message = '',
    data = {}
  }) {
    return res.status(statusCode).json({
      error,
      status,
      statusCode,
      message,
      data
    });
  };

  res.internal = function ({
    error = {},
    status = false,
    statusCode = StatusCodes.INTERNAL_SERVER_ERROR,
    message = 'INTERNAL_SERVER_ERROR'
  }) {
    return res.status(statusCode).json({
      error,
      statusCode,
      status,
      message
    });
  };
  next();
};

module.exports = {
  responseUtility
};
