var express = require('express');
var router = express.Router();
var userCtrl = require("../Ctrl/userCtrl");
router.get('/', function(req, res, next) {
	userCtrl.getUserByParams(req.query).then(function(data) {
		res.jsonp({total:data.count,rows:data.rows});
	})
});
router.post('/add', function(req, res, next) {
	userCtrl.addUser(req.body).then(function(data) {
		if(data!=null)res.jsonp(data);
	});
});
router.post('/edit', function(req, res, next) {
	userCtrl.editUser(req.body).then(function(data) {
		if(data!=null)res.jsonp(data);
	});
});
router.post('/delete', function(req, res, next) {
	userCtrl.deleteUser(req.body).then(function(data) {
		if(data===1)res.jsonp({status:'ok'});
		if(data===0)res.jsonp({status:'no'});
	});
});
module.exports = router;