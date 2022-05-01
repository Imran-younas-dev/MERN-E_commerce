const express = require('express');
const {getAllproduct ,createProduct,updateProduct, deleteProduct, getSingleProduct} = require('../Controller/Product');
const { isAuthUser, authUserRole } = require('../Middleware/Authentiction');

const router = express.Router();

// this getProduct will authenticate acces
// router.route("/products").get(isAuthUser ,getAllproduct);
router.route("/products").get(getAllproduct);

router.route("/products/new").post(isAuthUser,authUserRole("admin") , createProduct);
router.route("/products/:id").put(isAuthUser,authUserRole("admin") , updateProduct);
router.route("/products/:id").delete(isAuthUser,authUserRole("admin") ,deleteProduct);
router.route("/products/:id").get(getSingleProduct);

module.exports = router;