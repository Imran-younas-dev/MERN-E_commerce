const express = require('express');
const { CreateOrder, getmyOrders, getSingleOrder, getAllOrdersByAdmin, updateOrderStatusByAdmin, DeleteOrder } = require('../Controller/Order');
const router = express.Router();
const { isAuthUser, authUserRole } = require('../Middleware/Authentiction');

router.route("/Order/new").post(isAuthUser, CreateOrder);
// Admin can get users Information using user ID
router.route("/Order/:id").get(isAuthUser, getSingleOrder);
// this route for 
router.route("/Orders/me").get(isAuthUser, getmyOrders);

router.route("/admin/Orders").get(isAuthUser, authUserRole("admin"), getAllOrdersByAdmin);
router.route("/admin/order/:id").put(isAuthUser, authUserRole("admin"), updateOrderStatusByAdmin);
router.route("/admin/order/:id").delete(isAuthUser, authUserRole("admin"), DeleteOrder);


module.exports = router;