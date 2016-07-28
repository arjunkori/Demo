var express = require('express');
var oracledb = require('oracledb');
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

router.get('/oracleTest',function(req,res){

oracledb.getConnection(
  {
    user          : "hr",
    password      : "welcome",
    connectString : "localhost/XE"
  },
  function(err, connection)
  {
    if (err) { console.error(err.message); return; }

    connection.execute(
      "SELECT * FROM EMP",  
      function(err, result)
      {
        if (err) { console.error(err.message); return; }
        console.log(result.rows);
      });
  });
})

module.exports = router;
