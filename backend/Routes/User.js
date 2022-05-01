const express = require('express');
const { registerUser, loginUser, UserLogOut, getUserDetails, updatePassword, updateUserProfile } = require('../Controller/User');
const router = express.Router();
const {authUserRole,isAuthUser} = require('../Middleware/Authentiction')

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(UserLogOut);
// isAuthor => we set id and verify token and just will check by => req.user.id
// You will not get pwd coz we set select pwd false  
router.route("/me").get(isAuthUser,getUserDetails);

router.route("/password/update").put(isAuthUser, updatePassword);
router.route("/Profile/update").put(isAuthUser, updateUserProfile);
module.exports = router;