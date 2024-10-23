const mongoose = require('mongoose');
require('dotenv').config();

const mongoURI = "mongodb+srv://toyashpatil17:HpUTnWxLq8MLDfUy@cluster0.tzxak.mongodb.net/";

const connectTOMongo = async () => {
    await mongoose.connect(mongoURI);
    console.log("Connected to Mongodb")

}

module.exports = connectTOMongo;