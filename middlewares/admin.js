const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");   
const AdminModel = require("../models/admin");
dotenv.config();

const adminAuth=async(req,res,next)=>{
     try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided, authorization denied" });
    }
    const token = authHeader.split(" ")[1]; 
    const decodedData = jwt.verify(token, process.env.JWT_ADMIN_SECRET);

     const {_id} =decodedData
    const admin = await AdminModel.findById(_id)
    if (!admin) {
      return res.status(401).json({
         message: "User not found!!"});
    }
    req.admin = admin; 
    next();
  } catch (err) {
    console.error("Auth error:", err.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = adminAuth;
