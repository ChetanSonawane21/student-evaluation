const { StatusCodes } = require("http-status-codes");
const { ApiError } =  require("./errorFormatter");

/**
 * Invalid or Missing Route Handler [404 Handler].
 * @param req: Request 
 * @param res: Response 
 * @param next: NextFunction 
 * @returns 
 */

const iRouteHandler = (req, res, next) => {
    
    const message = `Cannot ${req.method} ${req.url}`; 
    
    return next(new ApiError(
        StatusCodes.NOT_FOUND, 
        message, 
        false, 
        {} 
    ));

}

module.exports = {
    iRouteHandler
};