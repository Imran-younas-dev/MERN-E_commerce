const mongoose = require('mongoose');

const connectDatabase = () => {
  // check err => mongo
    mongoose.connect("mongodb://localhost:27017/Shop").then((msg)=>{
      console.log(`data connected ${msg.connection.host}`);
    }) 
}
module.exports = connectDatabase;
