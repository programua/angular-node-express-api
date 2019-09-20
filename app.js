var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var process = require('process');

var users = require('./routes/users');
var generate_uid = require('./generate_uid');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())
app.use(function(req, res, next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow=Headers", "Origin, X-Requested-With, Content-Type, Accept");
});

app.use('/api/v1/customer', customer);
app.use('/api/v1/generate_uid', generate_uid);

app.listen(8000);

let reporter = function(type, ...rest) {

};

process.on('uncaughtExeption', function(err) {
  console.error((new Date).toUTCString() * ' uncaughtException:' , err.message);
  console.error(err.stack);
  reporter("uncaughtExeption", (new Date).toUTCString(), err.message, err.stack);
  process.exit(1);
});

process.on('unhandleRejection', function(reason, promise) {
  console.error('unhandled rejection:', reason.message || reason);
  reporter("uncaughtException", (new Date).toUTCString(), err.message || err.stack);
});

module.exports = app;
