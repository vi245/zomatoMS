var express =require('express');
var router= express.Router();
const Stripe=require('stripe');

const order = require('../model/orderModel');
require("dotenv").config();
const stripeAPI=Stripe(process.env.SECRET_KEY);

router.post('/create-checkout-session',async(req,res)=>{
   
 
    
    const line_items=req.body.cartItems.map(item=>{
      return{
       quantity:item.quantity,
      price_data:{
       currency:'inr',
       unit_amount:item.meal_price*100,
       product_data:{
         name:item.meal_name,
         description:item.meal_desc,
         images:[item.meal_image],
       }
      }
      }});
     const customer_email=req.body.userEmail;
    let session;
      try {
          const customer=await stripeAPI.customers.create({
            metadata:{
              userId:req.body.userId,
              email:customer_email,
              cart:JSON.stringify(req.body.cartItems),
            },
          });
           
         session=await stripeAPI.checkout.sessions.create({
            payment_method_types:['card'],
            mode:'payment',
            line_items,
           
            phone_number_collection:{
                enabled:true,
            },
            customer:customer.id,
            success_url:`http://localhost:3001/success`,
            cancel_url:`http://localhost:3001/cancel`,
            shipping_address_collection:{allowed_countries :['IN']}
            });
            console.log(session);
            res.status(200).json({url:session.url});
      } catch (error) {
           console.log(error);
           res.status(400).json({error:'an error occurred,unable to create session'})
      }
  
});
const createOrder= async (customer,data)=>{
  const Items=JSON.parse(customer.metadata.cart);
  const meals=Items.map((item)=>{
    return{
      mealId:item.id,
        quantity:item.quantity,
        meal_name:item.meal_name,
        meal_desc:item.meal_desc,
        meal_image:item.meal_image,
    }
  });
  const newOrder=new order({
    email:customer.metadata.email,
    userId:customer.metadata.userId,
    meals,
    total:data.amount_total/100,
    shipping:data.customer_details,
    customerId:data.customer,
    payment_status:data.payment_status,
  })
  try {
    const savedOrder=await newOrder.save();
    console.log("processed order",savedOrder);
  } catch (error) {
    console.log(error);
  }
}

//WEBHOOK
// This is your Stripe CLI webhook secret for testing your endpoint locally.

router.post('/webhook', express.json({type:'application/json'}), (request, response) => {
  
  let data;
  let eventType;
  
  if(process.env.WEB_HOOK_KEY)
  {
const sig = request.headers['stripe-signature'];
  let event;
try {
    event = stripeAPI.webhooks.constructEvent(request['rawBody'], sig, process.env.WEB_HOOK_KEY);
    console.log("webhook verified");
  } catch (err) {
    console.log(`Webhook Error: ${err.message}`);
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }
  data=event.data.object;
  eventType=event.type;
}
else{
    data=request.body.data.object;
    eventType=request.body.type;
}
  // Handle the event
 if(eventType==="checkout.session.completed")
 {
   stripeAPI.customers.retrieve(data.customer).then(async(customer)=>{
    try {
      createOrder(customer,data);
    } catch (error) {
      console.log(error);
    }
   })

 
 }
  // Return a 200 response to acknowledge receipt of the event
  response.sendStatus(200).end();
});




module.exports=router;