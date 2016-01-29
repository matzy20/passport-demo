var express = require('express');
var bodyParser = require('body-parser');
var CONFIG = require('./config');
var passport = require('passport');
var session = require('express-session');
var LocalStrategy = require('passport-local').Strategy;


var app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(session(CONFIG.SESSION));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
  function (username, password, done){
    var isAuthenticated = authenticate(username, password);
    if(!isAuthenticated){
      //Not Authenticated
      // return done(new Error('Not Authenticated'));
      return done(null, false); //no error, but not authenticated
    }
    //Authenticated
    return done(null, {
      user: "Tony",
      role: "ADMIN",
      color: "orange"
    });
  }
  ));
/*serialize - creates and gives you access to data,
letting the server know who you are*/
//usually lookup ids, however none for this example
//no data other than from login page
passport.serializeUser(function (user, done){
  //user is passed in from LocalStrategy
  //user is attached to req.user
  console.log(user);
  done(null, user);
});

//takes in a user based on serialize
passport.deserializeUser(function (user, done){
  return done(null, user);
});

app.set('views', 'views');
app.set('view engine', 'jade');

app.get('/login', function (req, res){
  res.render('login');
});

/*referencing function below, which was originally anonymous
we named it isAuthenticated*/
app.get('/secret',
  isAuthenticated,
  function (req, res){
    res.render('secret', {
      role: req.user.role.toLowerCase()
    });
  }
);

app.post('/login',
  passport.authenticate('local', {
    successRedirect: '/secret',
    failureRedirect: '/login'
  })
);

//a function that returns true or false
function authenticate (username, password) {
  var CREDENTIALS = CONFIG.CREDENTIALS;
  var USERNAME = CREDENTIALS.USERNAME;
  var PASSWORD = CREDENTIALS.PASSWORD;
  if (username === USERNAME && password === PASSWORD) {
    return true;
  } else {
    return false;
  }
}

function isAuthenticated (req, res, next){
  console.log(req.user);
if (!req.isAuthenticated()){
  return res.redirect('/login');
}
return next();
}

app.get('/logout', function (req, res){
  //passport provides this
  //just need to call req.logout()
  req.logout();
  res.redirect('/login');
});

var server = app.listen(3000, function(){
  console.log('Listening on port: ', server.address().port);
});