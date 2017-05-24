var express = require('express');
var router = express.Router();
var rolePermissionCtrl = require("../Ctrl/rolePermissionCtrl");
var permissionCtrl=require("../Ctrl/permissionCtrl");
router.get('/', function(req, res, next) {
	rolePermissionCtrl.getRolePermissionByParams(req.query).then(function(data) {
		res.jsonp(data);//
	})
});
router.post('/add', function(req, res, next) {
	rolePermissionCtrl.addRolePermission(req.body).then(function(data) {
		if(data!=null)res.jsonp(data);
	});
});
router.post('/delete', function(req, res, next) {
	rolePermissionCtrl.deleteRolePermission(req.body).then(function(data) {
		if(data===1)res.jsonp({status:'ok'});
		if(data===0)res.jsonp({status:'no'});
	});
});
module.exports = router;