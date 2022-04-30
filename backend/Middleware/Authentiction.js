const ErrorHander = require("../Util/ErrorHander");
const CatchAsynErros = require("./CatchAsynErros");
const jwt = require('jsonwebtoken');
const User = require('../models/User');
exports.isAuthUser = CatchAsynErros(async (req,res,next) =>{
    const { token }  = req.cookies;
    // if not token
    if (!token) {
        return next(new ErrorHander("Please Login to access this resource", 401));
      }
    //   NOTE: YOU HAVE TO LOGIN TOKEN WILL BE EXPIRE IN 1 HOUR THEN YPU CAN'T ACCESS PRODUCTS
    // if token  get then   
      const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    // we will accces id as we assign this._id in getTokn
      req.user = await User.findById(decodedData.id);
    
      next();
    });
    exports.authUserRole = (...roles) =>{
        return (req,res,next)=>{
            // you get array method bcoz ...roles => arr
            // if user not in role => not include in role
            // as we store/login user data using req.user in above so we store the user all info
            if(!roles.includes(req.user.role)){
             return next(new ErrorHander(`Role : ${req.user.role} is not allowed to acces this resource`,403) //server understand but refuse => 403
             )
            };
        // if include user in role DB then next()=> skip
        next();
        }
    }