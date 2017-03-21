var express = require('express');
var router = express.Router();
var navBarCtrl = require("../Ctrl/navBarCtrl");
var premission=require("../Ctrl/permissionCtrl");
router.get('/', function(req, res, next) {
	navBarCtrl.getNavbarByParams(req.query).then(function(data) {
		res.jsonp({total:data.count,rows:data.rows});
	})
});
router.get('/getPermission', function(req, res, next) {
	premission.getPremissionInFunctionModelForUser(req.session.userName,201).then(function(data) {
		console.log(`data: ${JSON.stringify(data)}`);
		res.jsonp(data);
	});
});
router.post('/add', function(req, res, next) {
	navBarCtrl.addNavBar(req.body).then(function(data) {
		if(data!=null)res.jsonp(data);
	});
});
router.post('/edit', function(req, res, next) {
	navBarCtrl.editNavBar(req.body).then(function(data) {
		if(data!=null)res.jsonp(data);
	});
});
router.post('/delete', function(req, res, next) {
	navBarCtrl.deleteNavBar(req.body).then(function(data) {
		if(data==1)res.jsonp({status:'ok'});
	});
});
module.exports = router;