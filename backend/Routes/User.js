const express = require('express');
// Logic layer from Controller
const { registerUser, loginUser, UserLogOut, getUserDetails, updatePassword, updateUserProfile, adminGetAllUsers, adminGetSingleUser, updateUserRole, DeleteUser } = require('../Controller/User');
const router = express.Router();
// User accessibility
const {authUserRole,isAuthUser} = require('../Middleware/Authentiction')
// CRUD OPERATIONS
//get => user req to server read.   |( read )  
//post => User can post to server   |(Create)
//put => user can update thier data |(Update)
//delete => User can dlt own data   |(delete)


router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(UserLogOut);
// isAuthor => we set id and verify token and just will check by => req.user.id
// You will not get pwd coz we set select pwd false  
router.route("/me").get(isAuthUser,getUserDetails);
// User can update profile or pwd
router.route("/password/update").put(isAuthUser, updatePassword);
router.route("/Profile/update").put(isAuthUser, updateUserProfile);
// Admin Check users details
router.route("/admin/users").get(isAuthUser,authUserRole("admin") , adminGetAllUsers);
router.route("/admin/user/:id").get(isAuthUser,authUserRole("admin") , adminGetSingleUser);
// admin change role of user
router.route("/admin/updateRole/:id").put(isAuthUser , authUserRole("admin") , updateUserRole);
// admin delete user
router.route("/admin/deleteUser/:id").delete(isAuthUser , authUserRole("admin") , DeleteUser);

module.exports = router;