const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

const Person = require('./models/Person');

passport.use(new localStrategy(async(USERNAME,password,done) =>{
    try{
       //console.log("Received credencial:", USERNAME,password);
       
       const user = await Person.findOne({username:USERNAME});
       if(!user)
        return done(null,false,{message: 'Incorrect username'})
       
       const isMatchPassword = await user.comparePassword(password);
       if(isMatchPassword){
         return done(null,user)
       }else{
        return done(null,false,{message:'Incorrect Password'});
       }
    }catch(err){
        return done(err);
    }
}))

module.exports = passport;