const express= require('express');
const app= express();
require('dotenv').config
const PORT = process.env.PORT || 5000;

const connectDB =require('./config/database');
app.use(express.json());

const userRouter=require('./routes/user');
const adminRouter=require('./routes/admin');


app.use('/api/users',userRouter);
app.use('/api/admins',adminRouter);



connectDB();
app.listen(PORT,()=>{
    console.log("server is running at port",PORT);
});