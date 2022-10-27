var {JWT_SIGN_KEY ,JWT_SECRET_KEY} =require( '../properties');
const jwt =require('jsonwebtoken');
require("dotenv").config();
var userSchema= require('../model/userInfoModel');

exports.auth=async(req,res,next)=>{
       let token;
       if(req.headers.authorization && req.headers.authorization.startsWith("Bearer"))
       {
        token=req.headers.authorization.split(' ')[1];
       }
       if(!token)
       {
        return res.status(401).send({
            success:false,
            error:"Not authorized to access this route",
        })
       }
       else{
        try {
            const decoded=jwt.verify(token,JWT_SIGN_KEY);
            console.log(decoded);
            const user=await userSchema.findById(decoded.id)
            if(!user)
            {
               res.status(404).send({
                success:false,
                error:"No user found"
               })
            }
            req.user=user;
            console.log(req.user);
            next();
        } catch (error) {
            return res.status(401).send({
                success:false,
                error:"Not authorized for this route",
            })
        }
       }
}