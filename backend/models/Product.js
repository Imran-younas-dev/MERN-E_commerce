const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true , "Please Enter Product Name"],
        trim : true
    },
    description : {
        type : String,
        required : [true , "Please Enter description"]
    },
    price : {
        type : Number,
        required : [true , "Please Enter Product price"],
        maxlength : [6, "Price cannot exceed 6 figure"]
    },
    ratings : {
        type : Number,
        default : 0
    },
    images : [
        {
            public_id :{
                type : String,
                required : true
            },
            url :{
                type : String,
                required : true
            }
        },
    ],
    category : {
        type : String,
        required : [true , "Plz enter product category"]
    },
    Stock : {
        type  : Number,
        required : [true, "plz enter product Stock"],
        maxlength : [4, "Stock cannot exceed 4 character"],
        default : 1
    },
    numofReviews :{
        type : Number,
        default : 0,
    },
    Reviews : [
        {
            user : {
                type  : mongoose.Schema.ObjectId,
                ref : "User",
                required : true,
            },
            name : {
                type : String,
                required : true
            },
            rating : {
                type : Number,
                required : true
            },            
            Comment : {
                type : String,
                required : true
            }
        }
    ],
    // two user 1. admin 2. created product website
    user : {
        type  : mongoose.Schema.ObjectId,
        ref : "User",
        required : true,
    },
    createdAt : {
        type : Date,
        default : Date.now
    }
});

module.exports = mongoose.model("product", productSchema);