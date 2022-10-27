var mongoose = require('mongoose');

const restaurantSchema = mongoose.Schema([{
    name: String,
    description: String,
    address: String,
    location: String,
    image: String,
    uploadImages:[{
         uploadedImage:String
    }],
    cuisine: String,
    min_price: Number,
    contact: String,
    locality: String,
    city: String,
    type : [{
        mealtype : Number,
        name : String
    }]
}])

const restaurants=mongoose.model("restaurants",restaurantSchema);
module.exports=restaurants;