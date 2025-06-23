var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var tun = require('./routes/tun')
var ALINFO1=require('./routes/ALINFO1')
var osRouter=require('./routes/os')
var products = require('./routes/productes')

var app = express();
// Step 1

const mongo = require("mongoose");



//Step 2

const mongoconnection = require("./config/mongoconnection.json");



console.log("!!1111 code avant la connexion 1111 !! -> CODE111111");


//Step 3

mongo.connect(mongoconnection.url)

 .then(() => {

  console.log("DataBase Connected Pour la clasee 4TWIN5...!!!!");

 })

 .catch((err) => {

  console.log(err);

 });



 console.log("!!2222 code après la connexion 2222 !! -> CODE22222");


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/tun', tun);
app.use('/ALINFO1', ALINFO1);
app.use('/os', osRouter);
app.use('/prods', products);



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
