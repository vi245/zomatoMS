const {googleLogin,login,register,resetPassword,forgotPassword,confirmationPost,googleRegister} =require("../Controller/userInfoController");
const {auth}=require('../Middleware/auth');
var express =require('express');
var router= express.Router();

router.post('/googleLogin', (req,res,next)=>{
    googleLogin(req,res,next);
});
router.post('/googleRegister', (req,res,next)=>{
    googleRegister(req,res,next);
});
router.post('/login', (req,res,next)=>{
    login(req,res,next);
});
router.post('/register', (req,res,next)=>{
    register(req,res,next);
});
router.put('/confirm/:token',(req,res,next)=>{
    confirmationPost(req,res,next);
})
router.put('/resetPassword/:resetToken', (req,res,next)=>{
    resetPassword(req,res,next);
});
router.post('/forgotPassword', (req,res,next)=>{
    forgotPassword(req,res,next);
});

router.get('/authentication',auth,(req,res)=>{
    res.json({message:"you are authorized to access me"});
})

module.exports=router;