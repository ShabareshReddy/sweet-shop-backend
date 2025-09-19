const express=require('express');
const userRouter=express.Router();

userRouter.post('/register',(req,res)=>{
    res.send("User register endpoint");
});

userRouter.post('/login',(req,res)=>{
    res.send("User login endpoint");
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