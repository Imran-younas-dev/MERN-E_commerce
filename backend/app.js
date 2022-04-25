// import pakages
const express = require('express');
const ErrorMiddleware = require('./Middleware/ErrorMiddleware')
const dotenv = require("dotenv");
// Route Import
const product = require('./Routes/app');
const user = require('./Routes/User');
// import Database
const connectDatabase = require('./config/database');

const app = express();
// const PORT = 5000;
// env config path
dotenv.config({path : "./config/config.env"});

// Handling Uncought Exception
process.on("uncaughtException", (err) =>{
console.log(`Error : ${err.message}`);
console.log("Shutting Down the server due to Handling Uncought Exception");
process.exit(1);
})



// Call middleware
app.use(express.json());
app.use("/api/v1" , product);
app.use("/api/v1" , user);
// Middleware Error
app.use(ErrorMiddleware);
// connent database
connectDatabase(); // 

const server  = app.listen(process.env.PORT , ()=>{
    console.log(`Server is running in PORT # ${process.env.PORT})`);
})
// unhandled Promise Rejection check Error
process.on("unhandledRejection", err => {
console.log(`Error  : ${err.message}`);
console.log("Shutting Down the server due to unhandled Promise rejection");
server.close(() =>{
    process.exit(1);
});
})