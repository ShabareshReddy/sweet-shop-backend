const express = require('express');
const adminRouter=express.Router();

adminRouter.post('/register',(req,res)=>{
    res.send("Admin register endpoint");
});

adminRouter.post('/login',(req,res)=>{
    res.send("Admin login endpoint");
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
