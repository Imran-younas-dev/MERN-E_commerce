const User = require('../models/User');
const ErrorHander = require('../Util/ErrorHander');
const CatchAsynErros = require('../Middleware/CatchAsynErros');
const { sendToken } = require('../Util/JwtToken');
const sendEmail = require('../Util/sendEmail');

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

    // const token = user.getJwtToken();
    // res.status(201).json({
    //     success : true,
    //     // user,
    //     token,
    // })
    // sendToken(user, 201, res);
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
  const user = await User.findOne({ email : email }).select("+password");

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
    // const token = user.getJwtToken();
    // res.status(200).json({
    //     success : true,
    //     // user,
    //     token,
    // })
  sendToken(user, 200, res);
});


// uSER lOGOUT 
exports.UserLogOut = CatchAsynErros(async(req,res,next)=>{
 res.cookie("token",null,{
  expires : new Date(
    Date.now()
    ),
    httpOnly : true,
 })
  res.status(200).json({
    success : true,
    message : "Loged Out Successfully.."
  })  
});


// forgot Password
exports.forgotPwd  = CatchAsynErros(async (req,res,next)=>{
// first we find User 
const user = await User.findOne({email : req.body.email});
if(!user){
  return next (new ErrorHander("User Not Found ", 404));
}
// get Reset pwd Token as we made in Usermodel
const reseToken = user.getResetPasswordToken();

// now Save new Token generated bcoz user save then can reset pwd
await user.save({validateBeforeSave : false});
// we get pwd and saved pwd as well new will send mail and create link
// const resPwdUrl = `http://localhost/api/vi/password/reset/${reseToken}`;
const resPwdUrl = `${req.protocol}://${req.get("host")}/api/vi/password/reset/${reseToken}`;
// now We will create msg for sending customers
const message = `Your Password reset :- \n\n ${resPwdUrl}`

try {
  await sendEmail({
    // send email to requested User
    email : user.email,
    subject : `IK-SHOP password recovery`
  });
  // email send then
  res.status(200).json({
    success : true,
    message : `E-mail send to ${user.email} successfully`,

  })
  
} catch (error) {
  // if err then we undefined both
  user.getResetPasswordToken = undefined,
  user.resetPasswordExpire = undefined
  // now will save the user again 
await user.save({validateBeforeSave : false});
return next(new ErrorHander(error.message));
}
});

// User Routes e.g check profile, profile or pwd update
// get User detailed
exports.getUserDetails = CatchAsynErros(async (req,res,next)=>{
  // get user by Id => req.user.id
  const user = await User.findById(req.user.id);
  if(!user){
    // then nothing bcoz it could be not that we get user req.user.id => user be already 
  }
  res.status(200).json({
    success : true,
    user,
  });
});

// User Update Password Route
exports.updatePassword = CatchAsynErros(async (req,res,next)=>{
// get user by Id => req.user.id
const user = await User.findById(req.user.id).select("+password");
if(!user){
  // then nothing bcoz it could be not that we get user req.user.id => user be already 
}
const isPasswordMatched = await user.comparePassword(req.body.Oldpassword);
// if old pwd not match .. 
if (!isPasswordMatched) {
return next(new ErrorHander("Old password is Incorrect", 401));
}
// mean both must be same old = new
if(req.body.newPassword !== req.body.confirmPassword){
return next(new ErrorHander("Passsword doeen't matched", 401));
}
// above all condition true old,new,confirm then 
// save newpwd in user.pwd , newpwd = confirmPwd
user.password = req.body.newPassword;
// save new pwd change success
await user.save();

sendToken(user, 200, res);
});

// Update User profile .....
exports.updateUserProfile = CatchAsynErros(async (req,res,next)=>{

const upadateProfile = {
  name : req.body.name,
  email : req.body.email
  // image we will do letter
}
const user = await User.findByIdAndUpdate(req.user.id , upadateProfile, {
new : true,
runValidators : true,
useFindAndModify: false
});

  res.status(200).json({
    success : true,
    upadateProfile,
  });
});

//Admin => get all Users List
exports.adminGetAllUsers = CatchAsynErros(async (req,res,next)=>{
  const users = await User.find();
  res.status(200).json({
    success : true,
    users,
  });
});

//Admin => get single User
exports.adminGetSingleUser = CatchAsynErros(async (req,res,next)=>{
  const user = await User.findById(req.params.id);
  if(!user){
return next(new ErrorHander(`User Doesn't Exist iD : ${req.params.id}`));
  }

  res.status(200).json({
    success : true,
    user,
  });
});

//Admin = > Update User role .....
exports.updateUserRole = CatchAsynErros(async (req,res,next)=>{

  const upadateRole = {
    email :req.body.email,
    name : req.body.name, 
    role : req.body.role,
  }
  //don't use req.user.id by this admin update itself
  const user = await User.findByIdAndUpdate(req.params.id , upadateRole, {
  new : true,
  runValidators : true,
  useFindAndModify: false
  });
  
    res.status(200).json({
      success : true,
      upadateRole,
    });
  });

//Admin = > Deleted User ...
exports.DeleteUser = CatchAsynErros(async (req,res,next)=>{
// we will remove cloudnary as well
  const user = await User.findById(req.params.id);
// if not user by ID then Error will be Occur
  if(!user){
  return next(new ErrorHander(`User does not Exist with id ${req.params.id}`));
}
// if User then remove user by ID through Admin
await user.remove();
res.status(200).json({
  success : true,
  message : `${user.name} User is deleted `,
});
});




