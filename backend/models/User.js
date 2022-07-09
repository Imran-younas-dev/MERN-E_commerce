const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
// reset pwd
const crypto  = require('crypto')

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
            // required : true
        },
        url :{
            type : String,
            // required : true
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
// function bcoz we can't use <this> in arrow
// if => pwd change / update
// Only run this function if password was moddified (not on other update functions)
if (!this.isModified('password')) return next();
// then this condition
// 10 => stong pwd range 10
 // Hash password with strength of 10
 this.password = await bcrypt.hash(this.password, 10);
}) 
//Return JSON web token
userSchema.methods.getJwtToken = function(){
    return jwt.sign({id:this._id}, process.env.JWT_SECRET, {
        expiresIn:process.env.JWT_EXPIRES_TIME
    });
}
// compare Password
userSchema.methods.comparePassword = async function(enteredpassword){
    return await bcrypt.compare(enteredpassword, this.passsword);
}
// Reset password through token
userSchema.methods.getResetPasswordToken() = async function(){
    // Generate new Token 
    const newRestToken = crypto.randomBytes(20).toString("hex");
    //  hash and adding resetPass to schema
    this.getResetPasswordToken = crypto.createHash("sha256").update(newRestToken).digest('hex');
// pwd expire when generaten token = 10mnt
    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;   
    return newRestToken;
}






















module.exports = mongoose.model("User", userSchema);
