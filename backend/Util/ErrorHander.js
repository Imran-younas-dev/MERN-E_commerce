class ErrorHander extends Error{
    constructor(message, statusCode){
        // super error class ka constructor  
        super(message);
        this.statusCode = statusCode;
        // this target yeh khud obj
        Error.captureStackTrace(this, this.constructor);
    }
}
module.exports = ErrorHander;
// i can not use this without middlware