// creating token and saving in cookie
exports.sendToken = (user, statusCode, res)=>{
    // token access user get from parameter
    const token = user.getJwtToken();
    // options for cokies => we can't send cokies without options
    const options = {
        expires : new Date(
            // process.env.COOKIE_EXPIRE = 5
            // day hours=>24 , 60=>min 60=>sec 1000=>miliSec
            Date.now() + 5 * 24 * 60 * 60 * 1000),
            httpOnly : true,
    };
    
    res.status(statusCode).cookie("token", token , options).json({
    success : true,
    user,
    token,
})
}




