const express = require("express");
const app = express();
const db = require('./db');

const bodyParser = require('body-parser');
app.use(bodyParser.json());
require('dotenv').config();

const PORT = process.env.PORT || 3000

const Person = require('./models/Person');


app.get('/',(req,res)=>{
    res.send("Welcome to our hotel...");
})

const personRoutes = require('./routes/personRoutes');
app.use('/person',personRoutes);

const studentRoutes = require('./routes/studentRoutes');
app.use('/student',studentRoutes);


app.listen(PORT,()=>{
    console.log("Server running at 3000")
})

