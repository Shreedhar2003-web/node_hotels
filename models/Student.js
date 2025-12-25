const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true 
    },
    department:{
        type:String,
        required: true
    },
    marks:{
        type: Number,
        required:true
    }
});

// person model
module.exports = mongoose.model('CollegeDB',studentSchema); 