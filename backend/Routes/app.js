const express = require('express');
const {getAllproduct ,createProduct,updateProduct, deleteProduct, getSingleProduct} = require('../Controller/Product');

const router = express.Router();

router.route("/products").get(getAllproduct);
router.route("/products/new").post(createProduct);
router.route("/products/:id").put(updateProduct);
router.route("/products/:id").delete(deleteProduct);
router.route("/products/:id").get(getSingleProduct);

module.exports = router;