const mongoose = require('mongoose');

const mongoURL = 'mongodb://127.0.0.1:27017/mydatabase' //replace 'mydatabase' into your database

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