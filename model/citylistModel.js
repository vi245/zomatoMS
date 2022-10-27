var mongoose = require('mongoose');

const citylistSchema= mongoose.Schema([{
    location_id: String,
    name: String,
    city: String
}])
const citylist=mongoose.model("citylist",citylistSchema);
module.exports= citylist;