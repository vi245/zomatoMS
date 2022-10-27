var { getCityList,addCity,updateCity ,deleteCity} =require("../Controller/citylistController");
var express =require('express');
var router= express.Router();

router.get('/', (req,res,next)=>{
    getCityList(req,res,next);
});
router.get('/getCityList', (req,res,next)=>{
    getCityList(req,res,next);
});

router.post('/addCity', (req,res,next)=>{
    addCity(req,res,next);
});
router.put('/updateCity/:id', (req,res,next)=>{
    updateCity(req,res,next);
});
router.delete('/deleteCity', (req,res,next)=>{
    deleteCity(req,res,next);
});

module.exports=router;