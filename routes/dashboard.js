var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

	var currentUser = req.session.user;
	console.log(currentUser);
	if(currentUser) {
		res.render('dashboard', { title: 'Express' });
	} else {
		res.redirect('/users/login');
	}
});

module.exports = router;
