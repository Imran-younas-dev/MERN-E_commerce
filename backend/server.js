const app = require('./app');
const connectDatabase = require('./config/database');
const cors = require('cors');
const cloudinary = require('cloudinary');

const corsOptions ={
  origin:'http://localhost:3000', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}
app.use(cors(corsOptions));
// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});

// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/config.env" });
}

// connent database
connectDatabase(); //

cloudinary.config({
  cloud_name : process.env.CLOUDINARY_NAME,
  api_key : process.env.API_KEY,
  api_secret : process.env.SECRETE_KEY,
});

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is working on http://localhost :${process.env.PORT}`);
});

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);

  server.close(() => {
    process.exit(1);
  });
});