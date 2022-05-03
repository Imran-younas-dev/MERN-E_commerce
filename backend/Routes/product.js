const express = require('express');
const {getAllproduct ,createProduct,updateProduct, deleteProduct, getSingleProduct, createUpdateReveiw, getAllReviewsProduct, DeleteReview} = require('../Controller/Product');
const { isAuthUser, authUserRole } = require('../Middleware/Authentiction');

const router = express.Router();

// this getProduct will authenticate acces
// router.route("/products").get(isAuthUser ,getAllproduct);
router.route("/products").get(getAllproduct);

router.route("/admin/products/new").post(isAuthUser,authUserRole("admin") , createProduct);
router.route("/admin/products/:id").put(isAuthUser,authUserRole("admin") , updateProduct);
router.route("/admin/products/:id").delete(isAuthUser,authUserRole("admin") ,deleteProduct);
router.route("/products/:id").get(getSingleProduct);

// review
router.route("/reviews").put(isAuthUser,createUpdateReveiw)
// someone want to see review then no need to login
router.route("/reviews").get(getAllReviewsProduct);
// for delete login must
router.route("/reviews").delete(isAuthUser,DeleteReview);
module.exports = router;