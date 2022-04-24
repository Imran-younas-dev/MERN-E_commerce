const ErrorHander = require('../Util/ErrorHander');

module.exports = (err , req , res , next)=>{
err.statusCode = err.statusCode || 500 //server error
err.message = err.message || "Internal Server Error";


// Wrong mongoDB id Error check in apis
if(err.name === "CastError"){
    const message = `Resource not found : ${err.path}`;
    err = new ErrorHander(message, 404);
}






res.status(err.statusCode).json({
    success : false,
    // if you want to get complete error then you can use stack
    // error : err.stack
    // error : err
    // if you want to show msg
    message :err.message
})
}
