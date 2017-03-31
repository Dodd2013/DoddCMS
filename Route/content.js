var express = require('express');
var router = express.Router();
var contentCtrl = require("../Ctrl/contentCtrl");
/* GET home page. */
router.get('/', function(req, res) {
	return contentCtrl.getContentListByParams(req.query).then(function(data) {
		res.jsonp({total:data.count,rows:data.rows});
	})
});
router.post('/add',function(req, res) {
	contentCtrl.addContent(req.body,req.session.userName).then(function(data) {
		res.jsonp(data);
	},function(data) {
		res.sendStatus(500);
	});
});
router.get('/pass',function(req, res) {
	let state=(req.query.op=='pass'?1:(req.query.op=='notpass'?-1:0));
	console.log(req.query.op+":"+state);
	contentCtrl.setPass(req.query.contentId,state).then(function(data) {
		res.jsonp(data);
	},function(data) {
		res.sendStatus(500);
	});
});
router.get('/getById',function(req, res) {
	console.log("fdsafdafda"+req.query.contentId);
	contentCtrl.getContentById(req.query.contentId).then(function(data) {
		res.jsonp(data);
	},function(data) {
		res.sendStatus(500);
	});
});
module.exports = router;