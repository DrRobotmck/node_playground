var express = require('express');
var connect = require('connect');
var app = express();
app.use(connect.bodyParser());

app.get('/welcome', function(req,res){
  res.send("Hi");
})

app.listen(8000)