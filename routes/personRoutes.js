const express = require("express");
const router = express.Router();

const Person = require('./../models/Person');

router.post('/', async (req,res)=>{
    try{
          const data = req.body;
          const newPerson = new Person(data);

          const response = await newPerson.save();
          console.log('data saved');
          res.status(200).json(response);
    }catch(err){
          console.log(err);
          res.status(500).json(err);
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

module.exports = router;