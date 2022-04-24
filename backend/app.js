// import pakages
const express = require('express');
const ErrorMiddleware = require('./Middleware/ErrorMiddleware')
// Route Import
const product = require('./Routes/app');
// import Database
const connectDatabase = require('./config/database');

const app = express();
const PORT = 5000;

// Handling Uncought Exception
process.on("uncaughtException", (err) =>{
console.log(`Error : ${err.message}`);
console.log("Shutting Down the server due to Handling Uncought Exception");
process.exit(1);
})



// Call middleware
app.use(express.json());
app.use("/api/v1" , product);
// Middleware Error
app.use(ErrorMiddleware);
// connent database
connectDatabase(); // 


const server  = app.listen(PORT , ()=>{
    console.log(`Server is running in PORT # ${PORT})`);
})

// unhandled Promise Rejection check Error
process.on("unhandledRejection", err => {
console.log(`Error  : ${err.message}`);
console.log("Shutting Down the server due to unhandled Promise rejection");
server.close(() =>{
    process.exit(1);
});
})