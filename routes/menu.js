var { getItems,addItems,updateItems ,deleteItemsById, getItemsByRestaurantId} =require("../Controller/menuController");
var express =require('express');
var router= express.Router();

router.get('/', (req,res,next)=>{
    getItems(req,res,next);
});
router.get('/getItems', (req,res,next)=>{
    getItems(req,res,next);
});
router.get('/getItemsByRestaurantId', (req,res,next)=>{
    getItemsByRestaurantId(req,res,next);
});

router.post('/addItems/:id', (req,res,next)=>{
    addItems(req,res,next);
});
router.put('/updateItems', (req,res,next)=>{
    updateItems(req,res,next);
});
router.delete('/deleteItemsById/:id', (req,res,next)=>{
    deleteItemsById(req,res,next);
});

module.exports=router;