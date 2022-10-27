const mongoose = require('mongoose');
const restaurants = require('./restaurantModel');

const menuSchema=mongoose.Schema([{
    restaurant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'restaurants',
    },
    meal_name:String,
    meal_kind:String,
    meal_price:Number,
    meal_desc:String,
    meal_image:String,
    
}])
const menu=mongoose.model("menu",menuSchema);
module.exports= menu;