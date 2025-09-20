const express=require('express');
const userRouter=express.Router();
const UserModel=require('../models/user');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const { validateSignUpData } = require('../utils/validations');


userRouter.post('/register',async(req,res)=>{
    try{
        validateSignUpData(req.body);
        const {name,emailId,password}=req.body;
        
        const existingUser= await UserModel.find({emailId});
        if(existingUser){
            return res.status(400).json({message:"User with this email already exists"});
        }
        const hashedPassword=await bcrypt.hash(password,10);
        const newUser=await UserModel.create({
            name,
            emailId,
            password:hashedPassword
        });
        res.status(201).json({message:"User registered successfully",userId:newUser._id});
    }catch(error){
        res.status(500).json({message:error.message});
    }
});

userRouter.post('/login',async(req,res)=>{
    try{
        const {emailId,password}=req.body;
        if(!emailId || !password){
            return res.status(400).json({message:"Email and password are required"});
        }
        const user=await UserModel.find({emailId});
        if(!user){
            return res.status(400).json({message:"Invalid email or password"});
        }
        const isPasswordValid=await bcrypt.compare(password,user.password);
        if(!isPasswordValid){
            return res.status(400).json({message:"Invalid email or password"});
        }
        const token=jwt.sign({userId:user._id},process.env.JWT_USER_SECRET,{expiresIn:'1h'});
        res.status(200).json({message:"Login successful",token});
    }catch(error){
        res.status(500).json({message:error.message});
    }
});

userRouter.get('/sweets',(req,res)=>{
    res.send("Get all sweets endpoint");
});

userRouter.get('/sweets/search',(req,res)=>{
    res.send("Search sweets endpoint");
});

userRouter.post('/sweets/:id/purchase',(req,res)=>{
    res.send("Purchase sweet endpoint");        
});




module.exports=userRouter;