var express = require('express');
var CONFIG = require('./config');

var app = express();

app.set('views', 'views');
app.set('view engine', 'jade');

app.get('/login', function (req, res){
  res.render('login');
});

app.get('/secret', function (req, res){
  res.render('secret');
});

app.post('/login', function (req, res){
  //TODO implement logins
  res.send('loggin in');
});

var server = app.listen(3000, function(){
  console.log('Listening on port: ', server.address().port);
});