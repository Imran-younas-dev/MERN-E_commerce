const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");


dotenv.config({path : "./config/config.env"});
const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, "Please Enter Username "],
        maxlength : [36 , "can not exceed 30 character"],
        minlength : [4 , "Name atleast 4 more characters"]
    },
    email : {
        type : String,
        required : [true, "Please Enter Your E-mail "],
        // email should be diff
        unique : true,
        validate : [validator.isEmail, "Please Enter valid Email"]
    },
    password : {
        type : String,
        required : [true, "Please Enter Your password "],
        minlength : [8 , "Password should bre greater then 8 characters"],
        // when admin see user using find() method with password
        select : false,
    },
    avatar : 
    {
        public_id :{
            type : String,
            required : true
        },
        url :{
            type : String,
            required : true
        }
    },
    // role => admin or common user
    role : {
        type : String,
        default : "user"
    },
    resetPasswordToken : String,
    resetPasswordExpire : Date,
})

// bcryptjs when we encrypt js pre when user schema save
userSchema.pre("save" , async function(next){
// function bcoz we can't use <this>
// if => pwd change / update
if(!this.isModified('password')){
    next();
}
// then this condition
// 10 => stong pwd range 10
this.password = await bcrypt.hash(this.password,10);
}) 

// JWT Token Genrate
userSchema.methods.getJWTToken = function(){
  return jwt.sign({id:this._id}, process.env.JWT_SECRET ,{
            // process.env.JWT_EXPIRE = 5
            expiresIn: process.env.JWT_EXPIRE,
  });
};
// compare Password
userSchema.methods.comparePassword = async function(Enterpassword){
    return await bcrypt.compare(Enterpassword, this.password);

}






















module.exports = mongoose.model("User", userSchema);
