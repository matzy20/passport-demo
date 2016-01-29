var express = require('express');
var CONFIG = require('./config');

var app = express();

var server = app.listen(CONFIG.PORT, function(){
  console.log(CONFIG.PORT);
  console.log('Listening on port: ', server.address().port);
});