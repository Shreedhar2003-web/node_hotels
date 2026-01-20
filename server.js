const express = require("express");
const app = express();
const db = require('./db');
const passport = require('./auth');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
require('dotenv').config();

const PORT = process.env.PORT || 3000

// Middleware function 
const Middleware = (req,res,next)=>{
    console.log(`[${new Date().toLocaleString()}] Made request of this Url ${req.originalUrl}`)
    next();
}
app.use(Middleware);


app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local', {session:false});

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

