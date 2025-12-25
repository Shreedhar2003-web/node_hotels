const express = require('express');
const router = express.Router();

const Student = require('./../models/Student');

router.post('/', async (req,res)=>{
    try{
          const data = req.body;
          const newStudent = new Student(data);

          const response = await newStudent.save();
          console.log('student data saved');
          res.status(200).json(response);
    }catch(err){
          console.log(err);
          res.status(500).json(err);
    }
})

router.get('/',async (req,res)=>{
    try{
         const data = await Student.find();
         console.log('student data fetched');
         res.status(200).json(data);
    }catch(err){
        console.log(err);
         res.status(500).json(err);
    }
})

router.put('/:id',async(req,res)=>{
    try{
         const studentId = req.params.id;
         const updateStudentData = req.body;

         const response = await Student.findByIdAndUpdate(studentId,updateStudentData,
            {new:true} // return updated document
         );
         console.log("student data updated");
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
          const studentId = req.params.id;

          const response = await Student.findByIdAndDelete(studentId);
          console.log('student data deleted successfully')
          res.status(200).json({message:"student deleted successfully"});

          if(!response){
               return res.status(404).json('Student Not Found');
          }
     }catch(err){
          console.log(err);
          res.status(500).json({err:'Server Error'})
     }
})

module.exports = router;