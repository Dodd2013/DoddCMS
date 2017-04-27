var express = require('express');
var router = express.Router();
var navBarCtrl = require("../Ctrl/navBarCtrl");
router.get('/', function(req, res, next) {
	navBarCtrl.getNavbarByParams(req.query).then(function(data) {
		res.jsonp({total:data.count,rows:data.rows});
	})
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
		if(data===1)res.jsonp({status:'ok'});
		if(data===0)res.jsonp({status:'no'});
	});
});
module.exports = router;