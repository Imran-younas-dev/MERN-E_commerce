const Order = require('../models/Orders');
// for refrence
const Product = require("../models/Product");
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

//(User) Get single Order
exports.getSingleOrder = CatchAsynErros(async (req,res,next)=>{
    // as we used UserID in order DB then by populate method => will go UserDb and get email or pwd 
    const order = await Order.findById(req.params.id).populate("user","name email");
// req.params.id => target the Order Id & then go userCollection by ID and get name or Email=> check who order placed
    if(!order){
        return next (new ErrorHander(`Order not found With This ID ${req.params.id}`, 404))
    }
    res.status(200).json({
        succuss : true,
        order,
    });
});

// (User) LogedIn User Orders
exports.getmyOrders = CatchAsynErros(async (req,res,next)=>{
// we find Orders have in user field id ,_id => orders , User as we used ref in Order DB=> who ordered 
    const order = await Order.find({user : req.user._id});

    res.status(200).json({
        succuss : true,
        order,
    });
});

// (Admin) get All User Orders
exports.getAllOrdersByAdmin = CatchAsynErros(async (req,res,next)=>{
    // we find Orders have in user field id ,_id => orders , User as we used ref in Order DB=> who ordered 
        const orders = await Order.find();
    var totalAmmount = 0;
        orders.forEach((order)=>{
            // we will get Total ammounts of All user orders
        totalAmmount = totalAmmount + order.totalPrice;
    })
        res.status(200).json({
            succuss : true,
            totalAmmount,
            orders,
        });
    });

    
// (Admin) Update Order Status
exports.updateOrderStatusByAdmin = CatchAsynErros(async (req,res,next)=>{
    // we find Orders have in user field id ,_id => orders , User as we used ref in Order DB=> who ordered 
    const order = await Order.findById(req.params.id);
    if(!order){
        return next(new ErrorHander(`Order Not Found with this ID ${req.params.id}`));
    }// STEPS TO APPLY IN API
    // 1. update  status : "Delivered"
    // 2. go getAllOrders => refresh , update => "orderStatus" : "Delivered"
    // 3. go products Id which is used as a ref and refresh it =>get stock in decrease as per order quantity order 
    if(order.orderStatus === "Delivered"){
        return next(new ErrorHander(`You have delivered this order`,404));
    }
    //if order  delivered then 
   order.orderItems.forEach( async (order)=>{
        // for everyOrder call function => order=>productId or quantity,
        //  stock will update by this function
        await UpdateStock(order.product,order.quantity);
    }); 
// when update stock then orderStatus  = succeded
    order.orderStatus = req.body.status
if(req.body.status === "Delivered"){
    // delivered order then uodate date
    order.createdAt = Date.now();
}
// save the order now
await order.save({validateBeforeSave : false});
        res.status(200).json({
            succuss : true,
        });
    });
// Uppdate Stock function
async function UpdateStock(id,quantity){
    // we will get product.. advantage to save the ref in DB
const product = await Product.findById(id);
    // quantity user order placed quantity minus from stock
    product.Stock =  product.Stock - quantity;
    // After decrease stock then we will save the product
    await product.save({validateBeforeSave : false});
}


// (Admin) delete Order => when order completed then admin can delete the order
exports.DeleteOrder = CatchAsynErros(async (req,res,next)=>{
    // we find Orders have in user field id ,_id => orders , User as we used ref in Order DB=> who ordered 
        const order = await Order.findById(req.params.id);
    if(!order){
        return next(new ErrorHander(`order Not Found with This id ${req.params.id}`));
    }
// target order by req.params.id delete
    await order.remove()
        res.status(200).json({
            succuss : true,
        });
    });



