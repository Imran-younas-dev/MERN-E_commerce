const product = require("../models/Product");
const ErrorHander = require('../Util/ErrorHander');
// this is for any required in db then error generate
const CatchAsynErros = require('../Middleware/CatchAsynErros');
const Features = require('../Util/Features');

// create Product --Admin Site
// CatchAsynErros this is for try catch 
exports.createProduct = CatchAsynErros(async (req, res, next) => {
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
  // agr product ni mili
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
exports.getAllproduct = CatchAsynErros(async (req, res) => {
// using Keyword.
  const apiFeature = new Features(product.find(), req.query).search();
  const result = await apiFeature.query;
  
  res.status(200).json({
    success: true,
    result,
  });
});
