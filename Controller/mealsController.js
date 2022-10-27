var mealsSchema = require('../model/mealsModel');

getMeals = (req,res,next)=>{
    mealsSchema.find((err,response)=>{
             if(err)
             {
                res.send("Exception Occurred");
             }
             else{
                res.send(response);
             }
    })
}

addMeals=(req,res,next)=>
{
    var mealsToAdd = new mealsSchema({
        meal_type: req.body.meal_type,
        image: req.body.image,
        name: req.body.name,
        content: req.body.content
    })

    mealsToAdd.save((err,response)=>{
        if(err)
        {
            res.send("exception occurred");
        }
        else{
            res.send({status:400,message:"Meals Added Successfully", mealsData:response});
        }
    })
}
updateMeals=(req,res,next)=>{
    const updateQuery={}
    let{image,name,content}=req.body;
    if(image)
    updateQuery.image=image;
    if(name)
    updateQuery.name=name;
    if(content)
    updateQuery.content=content;
    console.log(updateQuery)
    mealsSchema.updateMany({"meal_type":req.query.type},{$set:updateQuery},(err,response)=>
    {
       if(err)
       {
           res.send("exception occurred");
       }
       else{
           res.send({status:400,message:"Meals updated Successfully"});
       }
    })
}
deleteMealsById=(req,res,next)=>{
    mealsSchema.findByIdAndRemove(req.params.id,(err,response)=>
    {
       if(err)
       {
           res.send("exception occurred");
       }
       else{
           res.send({status:400,message:"meal deleted Successfully",meals:response});
       }
    });
}
module.exports={ getMeals,addMeals,updateMeals,deleteMealsById};