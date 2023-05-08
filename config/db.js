const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
  mongoose.set('strictQuery', false);
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true
    });
    console.log('mongo connected');
  } catch (err) {
    console.log(err.message);
    //exit
    process.exit(1);
  }
};

module.exports = connectDB;
