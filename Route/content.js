var express = require('express');
var router = express.Router();
var contentCtrl = require("../Ctrl/contentCtrl");
/* GET home page. */
router.get('/', function(req, res) {
	return contentCtrl.getContentListByParams(req.query).then(function(data) {
		res.jsonp({
			total: data.count,
			rows: data.rows
		});
	})
});
router.get('/delete', function(req, res) {
	return contentCtrl.deleteContent(req.query.contentId).then(function(data) {
		if(data==1)res.jsonp({status:'ok'});
	}, function(data) {
		res.sendStatus(500);
	});
});
router.post('/add', function(req, res) {
	contentCtrl.addContent(req.body, req.session.userName).then(function(data) {
		res.jsonp(data);
	}, function(data) {
		res.sendStatus(500);
	});
});
router.post('/update', function(req, res) {
	console.log(JSON.stringify(req.body));
	contentCtrl.updateContentById(req.body).then(function(data) {
		res.jsonp(data);
	}, function(data) {
		res.sendStatus(500);
	});
});
router.get('/pass', function(req, res) {
	let state = (req.query.op == 'pass' ? 1 : (req.query.op == 'notpass' ? -1 : 0));
	console.log(req.query.op + ":" + state);
	contentCtrl.setPass(req.query.contentId, state).then(function(data) {
		res.jsonp(data);
	}, function(data) {
		res.sendStatus(500);
	});
});
router.get('/getById', function(req, res) {
	contentCtrl.getContentById(req.query.contentId).then(function(data) {
		res.jsonp(data);
	}, function(data) {
		res.sendStatus(500);
	});
});
module.exports = router;