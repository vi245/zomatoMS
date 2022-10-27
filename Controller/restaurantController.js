var restaurantSchema = require('../model/restaurantModel');

getRestaurants = (req,res,next)=>{
    restaurantSchema.find((err,response)=>{
             if(err)
             {
                res.send("Exception Occurred");
             }
             else{
                res.send(response);
             }
    });
}

getRestaurantByCityName=(req,res,next)=>{
     restaurantSchema.find({"city":{$regex:req.query.city,$options:'i'}},(err,response)=>
     {
        if(err)
        {
            res.send("exception occurred");
        }
        else{
            res.send(response);
        }
     });
}
getRestaurantsByMealType=(req,res,next)=>{
    restaurantSchema.find({"type.name":{$regex:req.query.type,$options:'i'}},(err,response)=>
    {
       if(err)
       {
           res.send("exception occurred");
       }
       else{
           res.send(response);;
       }
    });
}

getRestaurantById=(req,res,next)=>{
    restaurantSchema.findById(req.params.id,(err,response)=>
    {
       if(err)
       {
           res.send("exception occurred");
       }
       else{
           res.send(response);
       }
    });
}

addRestaurant=(req,res,next)=>
{
    var restaurantToAdd = new restaurantSchema({
        name: req.body.name,
    description: req.body.description,
    address: req.body.address,
    location: req.body.location,
    image: req.body.image,
    uploadImages:req.body.uploadImages,
    cuisine: req.body.cuisine,
    min_price: req.body.min_price,
    contact: req.body.contact,
    locality: req.body.locality,
    city: req.body.city,
    type:req.body.type
    });

    restaurantToAdd.save((err,response)=>{
        if(err)
        {
            res.send("exception occurred");
        }
        else{
            res.send({status:400,message:"Restaurants Added Successfully", restaurantData:response});
        }
    });
}
updateRestaurant=(req,res,next)=>{
    const updateQuery={}
    let{description,address,location,image,uploadImages,cuisine,min_price,contact,locality,city,type}=req.body;
    if(description)
        updateQuery.description=description;
        if(address)
        updateQuery.address=address;
        if(location)
        updateQuery.location=location;
        if(image)
        updateQuery.image=image;
        if(uploadImages)
        updateQuery.uploadImages=uploadImages;      
        if(cuisine)
        updateQuery.cuisine=cuisine;
        if(min_price)
        updateQuery.min_price=min_price;
        if(contact)
        updateQuery.contact=contact;
        if(locality)
        updateQuery.locality=locality;
        if(city)
        updateQuery.city=city;
        if(type)
        updateQuery.type=type;

        console.log(updateQuery);
    restaurantSchema.updateMany({"name":{$regex:req.query.name,$options:'i'}},{$set:updateQuery},(err,response)=>
   
    {
       if(err)
       {
           res.send("exception occurred");
       }
       else{
           res.send({status:400,message:"Restaurants updated Successfully"});
       }
    });
}
deleteRestaurantByName=(req,res,next)=>{
    restaurantSchema.remove({"name":{$regex:req.query.name,$options:'i'}},(err,response)=>
    {
       if(err)
       {
           res.send("exception occurred");
       }
       else{
           res.send({status:400,message:"Restaurants deleted Successfully"});
       }
    });
}
module.exports={ getRestaurants,getRestaurantByCityName, getRestaurantById,addRestaurant,updateRestaurant ,deleteRestaurantByName};