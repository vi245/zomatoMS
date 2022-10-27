var mongoose=require("mongoose");
const bcrypt=require('bcryptjs');
const jwt =require('jsonwebtoken');
const { JWT } = require("google-auth-library");
const { JWT_SIGN_KEY } = require("../properties");
const userInfoSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:[true,"Please provide an Email!"],
        unique:[true,"Email Exist"],
        
    },
    password:{
        type:String,
        required:[true,"Please provide a password!"],
        unique:false,
    },
    token:{
       type: String,
       required:true,
    },
    isVerified:{
        type:Boolean,
        required:true,
        default:false,
    }
},


{timestamps:true}
);
 



const user=mongoose.model("user",userInfoSchema);
module.exports =user;