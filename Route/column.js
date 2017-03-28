var express = require('express');
var router = express.Router();
var columnCtrl = require("../Ctrl/columnCtrl");
/* GET home page. */
router.get('/', function(req, res) {
	columnCtrl.getColumnList().then(function(columnList) {
		var columnListx = JSON.stringify(columnList);
		columnList = JSON.parse(columnListx);
		for (let i = 0; i < columnList.length; i++) {
			columnList[i].id += '';
		}
		res.jsonp(columnList);
	});
});
router.post('/add', function(req, res) {
	columnCtrl.addColumn(req.body).then(function(data) {
		res.jsonp(data);
	});
});
router.post('/edit',function(req,res) {
	columnCtrl.editColumn(req.body).then(function(data) {
		res.jsonp(data);
	});
});
router.post('/delete',function(req,res) {
	columnCtrl.deleteColumn(req.body).then(function(data) {
		res.jsonp(data);
	});
});
module.exports = router;