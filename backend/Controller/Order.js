const Order = require('../models/Orders');
// for refrence
const product = require("../models/Product");
const CatchAsynErros = require('../Middleware/CatchAsynErros');
const ErrorHander = require('../Util/ErrorHander');

// Create Order 
exports.CreateOrder = CatchAsynErros(async(req,res,next)=>{
    const {ShippingInfo,orderItems,paymentInfo,itemPrice,texPrice,ShippingPrice,totalPrice} = req.body;
    const order = await Order.create({
        ShippingInfo,orderItems,paymentInfo,itemPrice,texPrice,ShippingPrice,totalPrice,
        paidAt : Date.now(),
        // user who logined then can place order
        user : req.user._id,
    });
    res.status(200).json({
        succuss : true,
        order,
    })
});

// Get single Order
exports.getSingleOrder = CatchAsynErros(async (req,res,next)=>{
    
})




