const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");   
const UserModel = require("../models/user");
dotenv.config();

const userAuth=async(req,res,next)=>{
     try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided, authorization denied" });
    }
    const token = authHeader.split(" ")[1]; 
    const decodedData = jwt.verify(token, process.env.JWT_USER_SECRET);

     const {_id} =decodedData
    const user = await UserModel.findById(_id)
    if (!user) {
      return res.status(401).json({
         message: "User not found!!"});
    }
    req.user = user; 
    next();
  } catch (err) {
    console.error("Auth error:", err.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = userAuth;
