const jwt = require('jsonwebtoken');

const jwtAuthMiddleware = (req,res,next)=>{
    //Extract jwt token from request header
    const token = req.headers.authorization.split(' ')[1];
    if(!token) return res.status(401).json({error:'Unauthorized'});

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);

        //Attach user information to request object
        req.user = decoded;           // instead of using req.user whatever u can used to store decoded data
        next()
    }catch(err){
        console.log(err);
        res.status(401).json({error:'Invalid token'})
    }
}


// Function to generate jwt token
const generateToken = (userData) =>{
    // Generate new JWT token using user data
    return jwt.sign(userData,process.env.JWT_SECRET,{expiresIn:30000})
}
module.exports = {jwtAuthMiddleware,generateToken};