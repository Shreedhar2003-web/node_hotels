const mongoose = require('mongoose');
require('dotenv').config();

const mongoURL = process.env.MONGODB_URL_LOCAL //replace 'mydatabase' into your database
//const mongoURL = process.env.MONGODB_URL

mongoose.connect(mongoURL)

const db = mongoose.connection

// Event listeners
db.on('connected',()=>{
    console.log('Connected to MongoDB Server');
})

db.on('error',(err)=>{
    console.log('MongoDB Connection error:',err)
})

db.on('disconnected',()=>{
    console.log('MongoDB Disconnected');
})

module.exports = db;