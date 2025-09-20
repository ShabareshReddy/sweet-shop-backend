const express = require('express');
const adminRouter=express.Router();
const AdminModel=require('../models/admin');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const { validateSignUpData } = require('../utils/validations');

adminRouter.post('/register',async(req,res)=>{
  try{
    validateSignUpData(req.body);
    const {name,emailId,password}=req.body;

    const existingAdmin=await AdminModel.findOne({emailId});
    if(existingAdmin){
      return res.status(400).json({message:"Admin with this email already exists"});
    }       
    const hashedPassword=await bcrypt.hash(password,10);
    const newAdmin = await AdminModel.create({
        name,
        emailId,
        password:hashedPassword
    });
    res.status(201).json({message:"Admin registered successfully",adminId:newAdmin._id});
  }catch(error){
    res.status(500).json({message:error.message}); 
  }
});

adminRouter.post('/login',async(req,res)=>{
    try{
        const {emailId,password}=req.body;
        if(!emailId || !password){
            return res.status(400).json({message:"Email and password are required"});
        }
        const admin=await AdminModel.findOne({emailId});
        if(!admin){
            return res.status(400).json({message:"Invalid email or password"});
        }
        const isPasswordValid=await bcrypt.compare(password,admin.password);
        if(!isPasswordValid){
            return res.status(400).json({message:"Invalid email or password"});
        }   
        const token=jwt.sign({adminId:admin._id},process.env.JWT_ADMIN_SECRET,{expiresIn:'1h'});
        res.status(200).json({message:"Login successful",token});
    }catch(error){
        res.status(500).json({message:error.message});

    }

});

adminRouter.post('/sweets',(req,res)=>{
    res.send("Add new sweet endpoint");
});

adminRouter.get('/sweets',(req,res)=>{
    res.send("Get all sweets endpoint");
});

adminRouter.get('/sweets/search',(req,res)=>{
    res.send("Search sweets endpoint");
});

adminRouter.put('/sweets/:id',(req,res)=>{
    res.send("Update sweet endpoint");
});

adminRouter.delete('/sweets/:id',(req,res)=>{
    res.send("Delete sweet endpoint");
});




module.exports=adminRouter;
