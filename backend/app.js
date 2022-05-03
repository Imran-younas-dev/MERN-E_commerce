const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const path = require("path");

const ErrorMiddleware = require('./Middleware/ErrorMiddleware')


// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/config.env" });
}

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

// Route Imports
const product = require('./Routes/product');
const user = require('./Routes/User');
const Orders = require('./Routes/Order');

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", Orders);



// Middleware for Errors
app.use(ErrorMiddleware);

module.exports = app;













// // import pakages
// const express = require('express');
// const ErrorMiddleware = require('./Middleware/ErrorMiddleware')
// const dotenv = require("dotenv");
// const cookieParser = require('cookie-parser');
// const cors = require('cors');
// const bodyparser = require('body-parser')
// // Route Import
// const product = require('./Routes/product');
// const user = require('./Routes/User');

// // import Databases

// const app = express();
// dotenv.config({path : "./config/config.env"});

// // Call middleware
// app.use(bodyparser.json());
// app.use(cors());
// app.use(cookieParser());
// // const PORT = 5000;
// // env config path

// // Handling Uncought Exception
// process.on("uncaughtException", (err) =>{
// console.log(`Error : ${err.message}`);
// console.log("Shutting Down the server due to Handling Uncought Exception");
// process.exit(1);
// })



// app.use("/api/v1" , product);
// app.use("/api/v1" , user);
// // Middleware Error

// app.use(ErrorMiddleware);
 

// const server  = app.listen(process.env.PORT , ()=>{
//     console.log(`Server is running in PORT # ${process.env.PORT})`);
// })
// // unhandled Promise Rejection check Error
// process.on("unhandledRejection", err => {
// console.log(`Error  : ${err.message}`);
// console.log("Shutting Down the server due to unhandled Promise rejection");
// server.close(() =>{
//     process.exit(1);
// });
// })