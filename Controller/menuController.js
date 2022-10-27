const menu = require('../model/menuModel');
var restaurantSchema = require('../model/restaurantModel');

exports.getItems = (req,res,next)=>{
    menu.find((err,response)=>{
             if(err)
             {
                res.send("Exception Occurred");
             }
             else{
                res.send(response);
             }
    })
}
exports.getItemsByRestaurantId = (req,res,next)=>{
    menu.find({"restaurant":req.query.restaurantid},(err,response)=>{
             if(err)
             {
                res.send("Exception Occurred");
             }
             else{
                res.send(response);
             }
    })
}

exports.addItems=(req,res,next)=>
{  
   

    var itemsToAdd = new menu({
        restaurant:req.params.id,
        meal_name:req.body.meal_name,
        meal_kind:req.body.meal_kind,
        meal_price:req.body.meal_price,
        meal_desc:req.body.meal_desc,
        meal_image:req.body.meal_image,
    })

    itemsToAdd.save((err,response)=>{
        if(err)
        {
            res.send("exception occurred");
        }
        else{
            res.send({status:400,message:"Menu Added Successfully", Menu:response});
        }
    })
}

exports.updateItems=(req,res,next)=>{
    const updateQuery={}
    let{meal_name,meal_kind,meal_price,meal_desc,meal_image}=req.body;
    if(meal_name)
    updateQuery.meal_name=meal_name;
    if(meal_kind)
    updateQuery.meal_kind=meal_kind;
    if(meal_price)
    updateQuery.meal_price=meal_price;
    if(meal_desc)
    updateQuery.meal_desc=meal_desc;
    if(meal_image)
    updateQuery.meal_desc=meal_image;
    console.log(updateQuery)
    menu.updateMany({"restaurant":req.query.type},{$set:updateQuery},(err,response)=>
    {
       if(err)
       {
           res.send("exception occurred");
       }
       else{
           res.send({status:400,message:"menu updated Successfully"});
       }
    })
}
exports.deleteItemsById=(req,res,next)=>{
    menu.findByIdAndRemove(req.params.id,(err,response)=>
    {
       if(err)
       {
           res.send("exception occurred");
       }
       else{
           res.send({status:400,message:"menu deleted Successfully",menu:response});
       }
    });
}