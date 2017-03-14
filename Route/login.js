var express = require('express');
var router = express.Router();
var userCtrl = require("../Ctrl/userCtrl");
/* GET home page. */
router.get('/', function(req, res, next) {
	res.jsonp({
		msg: 'Error! Plase post your userName and passWord!',
		status: "no"
	});
});
router.get('/status', function(req, res, next) {
	if (req.session.userName) {
		res.jsonp({
			isLogin: true,
			userName: req.session.userName,
			msg: 'Welcome!',
			status: "ok"
		});
	}else{
		res.jsonp({
			isLogin: false,
			msg: 'Plase Login!',
			status: "no"
		});
	}
});

router.post('/', function(req, res) {
	if (req.body.userName == undefined || req.body.passWord == undefined) {
		res.jsonp({
			msg: 'Error! Plase post your userName and passWord!',
			status: "no"
		});
	} else {
		userCtrl.loginWithUNAndPWD(req.body).then(function(data) {
			if (data.status) {
				req.session.userName = req.body.userName;
				res.jsonp({
					msg: `Login with ${req.body.userName}`,
					status: "ok"
				});
			} else {
				res.jsonp({
					msg: data.msg,
					status: "no"
				});
			}
		});
	}
});
module.exports = router;