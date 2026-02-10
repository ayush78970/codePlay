const jwt=require('jsonwebtoken')
const User=require("../models/user")
const redisClient=require("../config/redis")

const adminMiddleware=async (req,res,next)=>{

    try {
        const{token}=req.cookies;
        if(!token){
            throw new Error("Token not present");            
        }
        const payload=jwt.verify(token,process.env.JWT_KEY)
            const{_id}=payload;
         
         if(!_id)
            throw new Error("invalid token");
               
         const result=await User.findById(_id);

         if(payload.role!='admin'){
            throw new Error("Invalid Token");            
         }

         if(!result){
            throw new Error("user Dosen't Exist");
            
         }

        //  Redis ke blocklist present toh nahi hai

        const IsBlocked=await redisClient.exists(`token:${token}`);

         if(IsBlocked)
            throw new Error("Invalid Token");

         req.result=result;
         
        
            next();

    }
     catch (error) {
        res.status(401).send("Error:"+error.message)
    }
   
}


module.exports = adminMiddleware
