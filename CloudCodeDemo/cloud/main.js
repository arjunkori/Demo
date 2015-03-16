
// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
Parse.Cloud.define("hello", function(request, response) {
  response.success("Hello world!");
});


Parse.Cloud.define("signup", function(req, res) 
{

 var user = new Parse.User();
  user.set("email", req.params.email);
  user.set("username", req.params.email);
  user.set("password", req.params.password);
  user.set("fullName", req.params.fullName);
  user.signUp(null, {
  	success: function(user) {
  		window.alert(Sign Up Succesfully.......);
  		res.success(user);
  	},
  	error: function(user, error) {
  		res.error(error);
  
  	}
  });
});
