var { getRestaurants,getRestaurantByCityName, getRestaurantById,addRestaurant,updateRestaurant ,deleteRestaurantByName} =require("../Controller/restaurantController");
var express =require('express');
const { MongooseError } = require("mongoose");
var router= express.Router();

router.get('/', (req,res,next)=>{
    getRestaurants(req,res,next);
});
router.get('/getRestaurants', (req,res,next)=>{
    getRestaurants(req,res,next);
});
router.get('/getRestaurantByCityName', (req,res,next)=>{
    getRestaurantByCityName(req,res,next);
});
router.get('/getRestaurantsByMealType', (req,res,next)=>{
    getRestaurantsByMealType(req,res,next);
});
router.get('/getRestaurantById/:id', (req,res,next)=>{
    getRestaurantById(req,res,next);
});
router.post('/addRestaurant', (req,res,next)=>{
    addRestaurant(req,res,next);
});
router.put('/updateRestaurant', (req,res,next)=>{
    updateRestaurant(req,res,next);
});
router.delete('/deleteRestaurantByName', (req,res,next)=>{
    deleteRestaurantByName(req,res,next);
});

module.exports=router;