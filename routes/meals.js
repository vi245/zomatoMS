var { getMeals,addMeals,updateMeals ,deleteMealsById} =require("../Controller/mealsController");
var express =require('express');
var router= express.Router();

router.get('/', (req,res,next)=>{
    getMeals(req,res,next);
});
router.get('/getMeals', (req,res,next)=>{
    getMeals(req,res,next);
});

router.post('/addMeals', (req,res,next)=>{
    addMeals(req,res,next);
});
router.put('/updateMeals', (req,res,next)=>{
    updateMeals(req,res,next);
});
router.delete('/deleteMealsById/:id', (req,res,next)=>{
    deleteMealsById(req,res,next);
});

module.exports=router;