var express = require('express');
var router = express.Router();
var adCtrl = require("../Ctrl/adCtrl");
router.get('/', function(req, res, next) {
	adCtrl.getAdByParams(req.query).then(function(data) {
		res.jsonp({total:data.count,rows:data.rows});
	})
});
router.post('/add', function(req, res, next) {
	adCtrl.addAd(req.body).then(function(data) {
		if(data!=null)res.jsonp(data);
	});
});
router.post('/edit', function(req, res, next) {
	adCtrl.editAd(req.body).then(function(data) {
		if(data!=null)res.jsonp(data);
	});
});
router.post('/delete', function(req, res, next) {
	adCtrl.deleteAd(req.body).then(function(data) {
		if(data===1)res.jsonp({status:'ok'});
		if(data===0)res.jsonp({status:'no'});
	});
});
module.exports = router;