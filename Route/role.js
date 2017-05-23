var express = require('express');
var router = express.Router();
var roleCtrl = require("../Ctrl/roleCtrl");
router.get('/', function(req, res, next) {
	roleCtrl.getRoleByParams(req.query).then(function(data) {
		res.jsonp({total:data.count,rows:data.rows});
	})
});
router.post('/add', function(req, res, next) {
	roleCtrl.addRole(req.body).then(function(data) {
		if(data!=null)res.jsonp(data);
	});
});
router.post('/edit', function(req, res, next) {
	roleCtrl.editRole(req.body).then(function(data) {
		if(data!=null)res.jsonp(data);
	});
});
router.post('/delete', function(req, res, next) {
	roleCtrl.deleteRole(req.body).then(function(data) {
		if(data===1)res.jsonp({status:'ok'});
		if(data===0)res.jsonp({status:'no'});
	});
});
module.exports = router;