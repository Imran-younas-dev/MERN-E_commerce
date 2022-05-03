const product = require("../models/Product");
const ErrorHander = require('../Util/ErrorHander');
// this is for any required in db then error generate
const CatchAsynErros = require('../Middleware/CatchAsynErros');
const ApiFeatures = require('../Util/ApiFeatures');

// create Product --Admin Site
// CatchAsynErros this is for try catch 
exports.createProduct = CatchAsynErros(async (req, res, next) => {
//  Acces name  e.g req.body.name 
// req.user.id => user logedin we save user Id 
  req.body.user = req.user.id; //direct val assign => id
  // using create method
  const Product = await product.create(req.body);
  res.status(200).json({
    success: true,
    Product,
  });
});

// updateProduct -- adminSiite
exports.updateProduct = CatchAsynErros(async (req, res, next) => {
  // let is liye q k isi ko change krne valy hai
  let Product = await product.findById(req.params.id);
  // if product didn't get
  if (!Product) {
  return next(new ErrorHander("Product Not Fount", 404))
    
  }
  Product = await product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
      success : true,
      Product
  })
});

// Delete Products --admin site
exports.deleteProduct = CatchAsynErros(async (req,res , next) =>{
    const Product = await product.findById(req.params.id);
    // agr product ni mili
    if(!Product){
  return next(new ErrorHander("Product Not Fount", 404))
        
    }
    await Product.remove();
    res.status(200).json({
        success : true,
        message : "Product delete Succussfully"
    })
});

// Get Single Product
exports.getSingleProduct = CatchAsynErros(async (req, res, next) =>{
const Product =  await product.findById(req.params.id);
if(!Product){
  // Next => call back function
  return next(new ErrorHander("Product Not Fount", 404))
    
}
  res.status(200).json({
      success : true,
      Product
  })
});


// get All products
exports.getAllproduct = CatchAsynErros(async (req, res, next) => {
  const resultPerPage = 5;
  // count for show in dashboard
  const productCount = await product.countDocuments(); 
  const apiFeature = new ApiFeatures(product.find(), req.query)
    .search()
    .pagination(resultPerPage);
    let products = await apiFeature.query;
  res.status(200).json({
    success: true,
    products,
    productCount,
  });
});

// Create Review || update Review
exports.createUpdateReveiw = CatchAsynErros(async (req,res,next)=>{
// destructuring.
const {rating,Comment,producId} = req.body;
// producId will add manually
// create obj ..
const Review = {
  // all properties featch from data
  user : req.user._id,
  name : req.user.name,
  rating : Number(rating), //rating should be number
  Comment,
};
// user id find by this
const Product = await product.findById(producId);

const isReviewed = Product.Reviews.find(
  (review)=> review.user.toString() === req.user._id.toString()  
); 
if(isReviewed){
  Product.Reviews.forEach((review) => {
    if(review.user.toString() === req.user._id.toString())
    (review.rating = rating), (review.Comment = Comment)
  });
}else{
  // Reviews => DB 
  Product.Reviews.push(Review);
  Product.numofReviews = Product.Reviews.length
}
// e.g => rating = 3,2,1,3 = 9/total rating => average
let average = 0;
Product.Reviews.forEach((review) =>{
  average = average + review.rating;
})
Product.ratings = average / Product.Reviews.length; 
await Product.save({validateBeforeSave : false});
res.status(200).json({
  success : true,
});
});


// Get All User Reviews of a single product
exports.getAllReviewsProduct = CatchAsynErros(async (req,res,next)=>{
  // we will get product using findById
  const Product = await product.findById(req.query.id);
  if(!product){
    return next(new ErrorHander("Product Not Found", 404));
  }
  res.status(200).json({
    success: true,
    Reviews : Product.Reviews,
  })
});

// Not working we will do letter..

// Delete All User Reviews of a single product
exports.DeleteReview = CatchAsynErros(async (req,res,next)=>{
  // we will get product using findById
  const Product = await product.findById(req.query.productId);
  if(!Product){
    return next(new ErrorHander("Product Not Found", 404));
  }
//bellow condition reviews will be not deleted
const reviews = Product.Reviews.filter(
  (review)=> review._id.toString() !== req.query.id.toString()
); 
// const reviews = Product.Reviews.filter((review) => review._id.toString() !== req.query.id.toString());
// Now reviews comes new then rating will also change
let average = 0;
// After deleted review
reviews.forEach((review) =>{
  average = average + review.rating;
})
const ratings = average / reviews.length; // get new rating
const numofReviews = reviews.length;

await product.findByIdAndUpdate(req.query.productId, {reviews,ratings,numofReviews},{
  new : true,
  runValidators : true,
  useFindAndModify: false
});
res.status(200).json({
    success: true,
  })
})






