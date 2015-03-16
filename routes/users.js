var express = require('express');
var router = express.Router();

router.get('/login', function(req, res, next) 
{
  res.render('login', {error: ""});
});

router.get('/', function(req, res, next) 
{
 var userList = [];
  
  var userQuery = new Parse.Query(Parse.User);
  userQuery.find({
    success: function(users) {
      console.log('USER SUCCESS');
      if(users) {
        users.forEach(function(user) {
          var _user = {
            email: user.getUsername(),
            fullName: user.get('fullName')
          }
          userList.push(_user);
        });
        res.render('users1', {userList: userList});
      } else {
        console.log('NO USERS PRESENT');
      }
    },
    error: function(error) {
      console.log('ERROR FINDING USERS: ' + error.message);
    }
  });
});





router.get('/signup', function(req, res, next) {
  res.render('signup', {error: ""});
});

router.post('/login', function(req, res, next) {

  /*var currentUser = req.session.user ? JSON.parse(req.session.user) : null;

  console.log("current user:" + JSON.stringify(currentUser));*/

  console.log('USERNAME:' + req.body.username);
  
  if(req.body.username && req.body.password) {
    Parse.User.logIn(req.body.username, req.body.password, {
      success: function(user) {
        console.log('INSIDE SUCCESS');
        if(user) {
          console.log('INSIDE SUCCESS: 200');
          req.session.user = JSON.stringify(user);
          var response = {
            message: "Login successful!",
            status: 200
          }
          res.end(JSON.stringify(response));
        } else {
          console.log('INSIDE SUCCESS: 400');
          var response = {
            message: "No such user found!",
            status: 400
          }
          res.end(JSON.stringify(response));
        }
      },
      error: function(user, error) {
        console.log('INSIDE SUCCESS: 500' + error.message);
        var response = {
          message: error.message,
          status: 500
        }
        res.end(JSON.stringify(response));
      }
    });
  } else {
    var response = {
      message: "Bad request!",
      status: 400
    }
    res.end(JSON.stringify(response));
  }
});


/* GET users listing. */
router.get('/signup', function(req, res, next) {
  res.render('signup', {error: ""});
});

router.post('/signup', function(req, res, next) 
{
  var requestObj = {
    email: req.body.email,
    username:req.body.email,
    password:req.body.password,
    fullName:req.body.fullName

  }
//calling cloud coode
  Parse.Cloud.run('signup', requestObj, {
    success: function(response) {
     
      res.redirect('login',{success:""});
    },
    error: function(error) {
      console.log('ERROR CALLING CLOUD CODE: ' + error.message);
    }
  });
  
  /*
  var user = new Parse.User();
  user.set("email", req.body.email);
  user.set("username", req.body.email);
  user.set("password", req.body.password);
  user.set("fullName", req.body.fullName);
  user.signUp(null, {
  	success: function(user) {
  		res.render('signup', {error: ""});
  	},
  	error: function(user, error) {
  		res.render('signup', {error: error.message});
  	}
  });
*/
});

router.get('/logout', function(req, res, next) {
  Parse.User.logOut();
  var currentUser = Parse.User.current();
  console.log("CURRENT USER: " + JSON.stringify(currentUser));
  res.redirect('/users/login');
});

module.exports = router;
