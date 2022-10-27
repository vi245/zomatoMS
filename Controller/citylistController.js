
var citylistSchema = require('../model/citylistModel');

getCityList = (req,res,next)=>{
    citylistSchema.find((err,response)=>{
             if(err)
             {
                res.send("Exception Occurred");
             }
             else{
               res.send(response);
               
             }
    })
}

addCity=(req,res,next)=>
{ 
  
        const cityToadd=new citylistSchema({
            location_id:req.body.location_id,
            name:req.body.name,
            city:req.body.city
        });
        cityToadd.save().then((response)=>res.send(response)).catch(()=>res.send("exception occurred"));
    
}
 

    
    
    
    
updateCity=(req,res,next)=>{
    const updateQuery={}
    let{location_id,name,city}=req.body;
    if(location_id)
    updateQuery.location_id=location_id;
    if(name)
    updateQuery.name=name;
    if(city)
    updateQuery.city=city;
    citylistSchema.findByIdAndUpdate(req.params.id,{$set:updateQuery},(err,response)=>
    {
       if(err)
       {
           res.send("exception occurred");
       }
       else{
           res.send({status:400,message:"CityList updated Successfully"});
       }
    })
}
deleteCity=(req,res,next)=>{
    citylistSchema.findOneAndRemove({$and:[{"location_id":req.query.loc},{"city": {$regex:req.query.city,$options:'i'}}]},(err,response)=>
    {
       if(err)
       {
           res.send("exception occurred");
       }
       else{
           res.send({status:400,message:"city deleted Successfully",city:response});
       }
    })
}
module.exports={ getCityList,addCity,updateCity,deleteCity};