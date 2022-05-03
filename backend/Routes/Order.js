const express = require('express');
const { CreateOrder } = require('../Controller/Order');
const router = express.Router();
const { isAuthUser, authUserRole } = require('../Middleware/Authentiction');

router.route("/Order/new").post(isAuthUser, CreateOrder);

module.exports = router;