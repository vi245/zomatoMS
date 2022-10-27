var { getOrders,getOrderDetailsByUser,addOrder} =require("../Controller/orderController");
var express =require('express');
var router= express.Router();

router.get('/', (req,res,next)=>{
    getItems(req,res,next);
});
router.get('/getOrders', (req,res,next)=>{
    getOrders(req,res,next);
});
router.get('/getOrderDetailsByUser', (req,res,next)=>{
    getOrderDetailsByUser(req,res,next);
});



module.exports=router;