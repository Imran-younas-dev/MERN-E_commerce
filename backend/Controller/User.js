const User = require('../models/User');
const ErrorHander = require('../Util/ErrorHander');
const CatchAsynErros = require('../Middleware/CatchAsynErros');
const sendToken = require('../Util/JwtToken');


// Register User
exports.registerUser = CatchAsynErros(async (req, res, next) => {
    const {name, email, password} = req.body;
    const user = await User.create({
        name,
        email, 
        password,
        // Temparory
        avatar : {
            public_id : "This is a sample Id",
            url : "profilePicUrl"
        }
    });

    // const token = user.getJWTToken();
    // res.status(201).json({
    //     success : true,
    //     // user,
    //     token,
    // })
    sendToken(user, 201, res);
    
  });
exports.loginUser = CatchAsynErros(async (req,res,next) =>{
    const { email, password } = req.body;
// ===========================================================
  // checking if user has given password and email both
  if (!email || !password) {
    return next(new ErrorHander("Please Enter Email & Password", 400));
  }
// ===========================================================
//   if user in DB  , findOne=> One User in Db check   
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHander("Invalid email or password", 401));
  }
// ===========================================================
    // if pwd match in already get User
  const isPasswordMatched = await user.comparePassword(password);
    // we can't just say invalid pwd 
  if (!isPasswordMatched) {
    return next(new ErrorHander("Invalid email or password", 401));
  }
    // if match password
    // const token = user.getJWTToken();
    // res.status(201).json({
    //     success : true,
    //     // user,
    //     token,
    // })
  sendToken(user, 200, res);
});

  