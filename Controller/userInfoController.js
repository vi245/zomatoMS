const bcrypt=require('bcryptjs');
var userSchema= require('../model/userInfoModel');
const{OAuth2Client}=require('google-auth-library');
var { JWT_SIGN_KEY ,JWT_SECRET_KEY} =require( '../properties');
const jwt =require('jsonwebtoken');
require("dotenv").config();
const sendEmail=require('../helpers/sendMail');

const client=new OAuth2Client(process.env.clientId);

exports.googleLogin=(req,res)=>{
    const {token}=req.body;
    
   client.verifyIdToken({idToken:token,audience:process.env.clientId}).then(response=>{
        const {email_verified,name,email}=response.payload;
        console.log(response.payload);
       if(email_verified)
       {
        userSchema.findOne({email},(err,user)=>{
            if(err)
            {
                return res.status(400).json({
                    error:"something went wrong"
                })
            }
            else{
                if(user)
                {    const {_id}=user._id;
                    const token=jwt.sign({id:user._id},JWT_SIGN_KEY,{expiresIn:'10min'});
                res.send({
                    status:200,
                    message:"Login Successful",
                   name,
                   _id,
                   email,
                    token,
                });
                    
                }
                else{
                    res.send({status:404,message:"No Email Found!Please first signup"});
                }
            }
        })
       }
    })
 
}

exports.googleRegister=(req,res)=>{
     const {token}=req.body;
     client.verifyIdToken({idToken:token,audience:process.env.clientId}).then(response=>{
        const {email_verified,name,email}=response.payload;
        console.log(response.payload);
       if(email_verified)
       {
        userSchema.findOne({email},(err,user)=>{
            if(err)
            {
                return res.status(400).json({
                    error:"something went wrong"
                })
            }
            else{
                if(user)
                {
                   return res.send({status:201,message:"User already exist",});
                }
                else{
                let password=email+JWT_SIGN_KEY;
                    bcrypt.hash(password,10).then((hashedPassword)=>{
                        const newUser=new userSchema({
                            name,
                            email,
                            password:hashedPassword,
                            token:jwt.sign({email:email},JWT_SECRET_KEY,{expiresIn:'10min'}),
                            isVerified:email_verified,
                        });
                   
                    newUser.save((err,data)=>{
                        if(err)
                        {
                            return res.status(500).json({error:"something went wrong..."})
                        }
                      else
                      {
                        return res.send({status:200, message:"user is created successfully ", userData:data});
                      }});
                    });
                }  
                }
            });
        }
    });
}
exports.register=(req,res)=>{
   userSchema.findOne({email:req.body.email},(err,user)=>{
        if(err)
        {
            res.send('exception occurred');
        }
        else{
            if(user)
            {
                return res.send({status:401,message:"user already exist",userData:user,});
            }
            else{
                bcrypt.hash(req.body.password,10).then((hashedPassword)=>{
                    const userdetail=new userSchema({
                        name:req.body.name,
                        email:req.body.email,
                        password:hashedPassword,
                        token:jwt.sign({email:req.body.email},JWT_SECRET_KEY,{expiresIn:'10min'}),
                    });
                
                  
                    
                userdetail.save((err,response)=>{
                    if(err)
                    {
                        res.send({status:500,message:"error creating user",err,});
                    }
                    else{
                        res.send({status:201, message:"user is created successfully but has not been verified yet", userData:response});
                    }
                 });
                      
                    
                       const resetURL=`https://zomatouserinterface.herokuapp.com/verify/${userdetail.token}`;
                       try {
            
                      sendEmail({
                            to:userdetail.email,
                            subject:"Email verification link",
                            text:`<h4> email verification link</h4>
                            <p>please click on below link to verify the email</p>
                            <a href=${resetURL}>${resetURL}</a>`
                   });
                   
                   
                       } catch (error) {
                         console.log(error);
                       }
                    }).catch((e)=>{
                        res.send({status:500, message:"password not hashed",e,});
                    })
                       
                    
            }
        }
    });
  
    
    }
exports.login= (req,res)=>{
userSchema.findOne({email:req.body.email},(err,user)=>{
       if(user)
            {
                bcrypt.compare(req.body.password,user.password).then((passwordCheck)=>{
                if(!passwordCheck)
                 {
                 return res.send({status:400,message:"please provide correct password"});
                  }
                else if(!user.isVerified){
                const resetURL=`https://zomatouserinterface.herokuapp.com/verify/${user.token}`;
                try {sendEmail({
                     to:user.email,
                     subject:"Email verification link",
                     text:`<h4> email verification link</h4>
                     <p>please click on below link to verify the email</p>
                     <a href=${resetURL}>${resetURL}</a>`
            });
            return res.send({status:202,message:"email has been sent"});
    
            } catch (error) {
                  console.log(error);
             }
            }
             else{
                const{_id,name,email}=user;
                const token=jwt.sign({id:user._id},JWT_SIGN_KEY,{expiresIn:'10min'});
                res.send({
                    status:200,
                    message:"Login Successful",
                   name,
                   _id,
                   email,
                    token,
                });
             }}).catch(); 
                   }
                   else{
            res.send({status:404,message:'please provide correct email or sign up first'});
           }
        })
}

exports.forgotPassword=(req,res,next)=>{
    res.send("forgotPassword");
}
exports.resetPassword=(req,res,next)=>{
    res.send("resetPassword");
}
exports.confirmationPost=(req,res,next)=>{
    userSchema.findOne({token:req.params.token},(err,user)=>{
        if(!user)
        {
            return res.send({status:400,type:'not-verified',message:"unable to find token or token may have expired"});
        }
       else if(user.isVerified)
       {
        return res.send({status:201,type:'already-verified',message:"user has already been verified"});
       }
       else{
        user.isVerified=true;
        user.save((err,response)=>{
            if(err)
            {
                return res.status(500).send({message:err.message});
            }
            res.send({status:200,message:"the account has been verified.Please Login"});
        })
       }
    })
}        
