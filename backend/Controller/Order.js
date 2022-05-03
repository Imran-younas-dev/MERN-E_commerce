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

//  Get single Order
exports.getSingleOrder = CatchAsynErros(async (req,res,next)=>{
    // as we used UserID in order DB then by populate method => will go UserDb and get email or pwd 
    const order = await Order.findById(req.params.id).populate("user","name email");

    if(!order){
        return next (new ErrorHander(`Order not found With This ID ${req.params.id}`, 404))
    }
    res.status(200).json({
        succuss : true,
        order,
    });
});

// (LogedIn) Get single Order
exports.getmyOrders = CatchAsynErros(async (req,res,next)=>{
// we find Orders have in user field id ,_id => orders , User=> who ordered
    const order = await Order.find({user : req.user._id});

    if(!order){
        return next (new ErrorHander(`Order not found With This ID ${req.params.id}`, 404))
    }
    res.status(200).json({
        succuss : true,
        order,
    });
});




