const mongoose = require('mongoose');
const restaurants = require('./restaurantModel');

const orderSchema=mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    userId:{
        type:String,
        required:true,
    },
    meals:[
       {mealId:String,
        quantity:Number,
        meal_name:String,
        meal_desc:String,
        meal_image:String,
        } ],
   total:{
            type:Number,
            required:true,
        },
        shipping:{
            type:Object,
            required:true,
        },
        customerId:{type:String,required:true},
    payment_status:{
        type:String,
        required:true,
    },
  
},
{timestamps:true}
)
const order=mongoose.model("order",orderSchema);
module.exports= order;