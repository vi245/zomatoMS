const order = require('../model/orderModel');


exports.getOrders = (req,res,next)=>{
    order.find((err,response)=>{
             if(err)
             {
                res.send("Exception Occurred");
             }
             else{
                res.send(response);
             }
    })
}
exports.getOrderDetailsByUser = (req,res,next)=>{
    order.find({email:req.query.userEmail},(err,response)=>{
             if(err)
             {
                res.send("Exception Occurred");
             }
             else{
                res.send(response);
             }
    });
}

