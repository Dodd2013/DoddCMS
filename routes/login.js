var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.jsonp({
		msg: 'Error! Plase post your user name and password!',
		status: "no"
	});
});
router.post('/', function(req, res, next) {
	if (req.body.username == undefined || req.body.password == undefined){
		res.jsonp({
			msg: 'Error! Plase post your user name and password!',
			status: "no"
		});
	}else{
		res.jsonp({
			msg: `Login with ${req.body.username}`,
			status: "ok"
		});
	}
});
module.exports = router;