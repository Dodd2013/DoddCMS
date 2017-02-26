var express = require('express');
var router = express.Router();
var userCtrl = require("../Controller/userCtrl");
/* GET home page. */
router.get('/', function(req, res, next) {
	res.jsonp({
		msg: 'Error! Plase post your userName and passWord!',
		status: "no"
	});
});
router.post('/', function(req, res, next) {
	if (req.body.userName == undefined || req.body.passWord == undefined) {
		res.jsonp({
			msg: 'Error! Plase post your userName and passWord!',
			status: "no"
		});
	} else {
		userCtrl.loginWithUNAndPWD(req.body).then(function(data) {
			if (data.status) {
				req.session.userName=req.body.userName;
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