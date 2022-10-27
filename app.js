var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
require("dotenv").config();
const cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var citylistRouter=require('./routes/citylist');
var mealsRouter=require('./routes/meals');
var restaurantRouter=require('./routes/restaurants');
var userInfoRouter=require('./routes/userInfo');
var menuRouter=require('./routes/menu');
var orderRouter=require('./routes/order');
var paymentRouter=require('./routes/stripe');
const bodyParser = require('body-parser');

mongoose.connect(process.env.DB_URL);
var app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(cors({
  origin:"*"
}));
app.use(logger('dev'));
app.use(express.json({verify:(req,res,buffer)=>
  req['rawBody']=buffer,
}));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/citylist',citylistRouter);
app.use('/meals',mealsRouter);
app.use('/restaurant',restaurantRouter);
app.use('/loginUser',userInfoRouter);
app.use('/menu',menuRouter);
app.use('/order',orderRouter);
app.use('/api',paymentRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
