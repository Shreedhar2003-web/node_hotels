const express = require("express");
const app = express();
const db = require('./db');
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const Person = require('./models/Person');
// hi guys

app.get('/',(req,res)=>{
    res.send("Welcome to our hotel...");
})

const personRoutes = require('./routes/personRoutes');
app.use('/person',personRoutes);

const studentRoutes = require('./routes/studentRoutes');
app.use('/student',studentRoutes);

app.listen(3000,()=>{
    console.log("Server running at 3000")
})

