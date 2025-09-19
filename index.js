const express= require('express');
const app= express();
require('dotenv').config
const PORT = process.env.PORT || 5000;
const connectDB =require('./config/database');

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Sweet Shop API is running 🚀");
});


connectDB();
app.listen(PORT,()=>{
    console.log("server is running at port",PORT);
});