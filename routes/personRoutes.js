const express = require("express");
const router = express.Router();
const {jwtAuthMiddleware,generateToken} = require('./../jwt')

const Person = require('./../models/Person');

router.post('/signup', async (req,res)=>{
    try{
          const data = req.body;
          const newPerson = new Person(data);

          const response = await newPerson.save();
          console.log('data saved');

          const payload = {
               id: response.id,
               username: response.username
          }
          //console.log(JSON.stringify(payload))

          const token = generateToken(payload);
          console.log('Token is:', token);

          res.status(200).json({response:response,token:token});
    }catch(err){
          console.log(err);
          res.status(500).json(err);
    }
})

router.post('/login',async(req,res) =>{
     try{
          //Extract username and password from request body
          const {username,password} = req.body;

          //Find user by username
          const user = await Person.findOne({username:username});

          //If user or password does not exist throw err
          if( !user || !(await user.comparePassword(password))){
               return res.status(401).json({error:'Invalid username and password'});
          }

          //generate token
          const payload = {
               id: user.id,
               username: user.username
          }
          const token = generateToken(payload);

          //return token as response
          res.json({token});
     }catch(err){
          console.log(err);
          res.status(500).json({error: 'Internal server error'})
     }
})

// Create profile
router.get('/profile', jwtAuthMiddleware ,async(req,res) =>{
     try{
          const userData = req.user;
          console.log('User data:', userData);

          const userId = userData.id;
          const user = await Person.findById(userId);

          res.status(200).json({user});
     }catch(err){
         console.log(err);
         res.status(500).json({error:'Internal server error'}) 
     }
})

router.get('/:workType',async(req,res)=>{
    try{
         const workType = req.params.workType;
         if(workType == 'chef' || workType == 'manager' || workType == 'waiter'){
            const response = await Person.find({work:workType});
            console.log('response fetched');
            res.status(200).json(response);
         }else{
            res.status(404).json('data Not found');
         }
    }catch(err){
         res.status(500).json(err);
    }
})

router.get('/',async (req,res)=>{
    try{
         const data = await Person.find();
         console.log('data fetched');
         res.status(200).json(data);
    }catch(err){
        console.log(err);
         res.status(500).json(err);
    }
})

router.put('/:id',async(req,res)=>{
    try{
         const personId = req.params.id;
         const updatePersonData = req.body;

         const response = await Person.findByIdAndUpdate(personId,updatePersonData,
            {new:true} // return updated document
         );
         console.log("data updated");
         res.status(200).json(response);

         if(!response){
            return res.status(404).json({err:'Person Not Found'})
         }

    }catch(err){
         console.log(err);
         res.status(500).json({err:'Server error'})
    }
})

router.delete('/:id',async(req,res)=>{
     try{
          const personId = req.params.id;

          const response = await Person.findByIdAndDelete(personId);
          console.log('data deleted successfully')
          res.status(200).json({message:"person deleted successfully"});

          if(!response){
               return res.status(404).json('Person Not Found');
          }
     }catch(err){
          console.log(err);
          res.status(500).json({err:'Server Error'})
     }
})
//comment added
module.exports = router;