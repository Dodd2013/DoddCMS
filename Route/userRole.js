var express = require('express');
var router = express.Router();
var userRoleCtrl = require("../Ctrl/userRoleCtrl");
router.get('/', function(req, res, next) {
	userRoleCtrl.getUserRoleByParams(req.query).then(function(data) {
		res.jsonp(data);//
	})
});
router.post('/add', function(req, res, next) {
	userRoleCtrl.addUserRole(req.body).then(function(data) {
		if(data!=null)res.jsonp(data);
	});
});
router.post('/delete', function(req, res, next) {
	userRoleCtrl.deleteUserRole(req.body).then(function(data) {
		if(data===1)res.jsonp({status:'ok'});
		if(data===0)res.jsonp({status:'no'});
	});
});
module.exports = router;