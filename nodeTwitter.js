var express = require('express');
var connect = require('connect');
// module for parsing the body of a request --> MIDDLEWARE
var app = express();
app.use(connect.bodyParser());
var tweets = [];

app.get('/', function(req,res){
  res.send('Welcome to Node Twitter');
  // .send() will create the appropriate HTTP headers
  // and also close the connection
});
app.get('/sup', function(req,res){
  res.send('HEY');
})

app.post('/send', function(req,res){
  console.log(req.params, req.body)
  if (req.body && req.body.tweet){
    tweets.push(req.body.tweet);
    res.send({status:"ok", message:"Tweet received"});
  } else {
    res.send({status:"nok", message:"Error!"});
  }
})

app.get('/tweets', function(req,res){
  res.send(tweets);
})

app.listen(8000);

