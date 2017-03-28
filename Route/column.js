var express = require('express');
var router = express.Router();
var columnCtrl = require("../Ctrl/columnCtrl");
/* GET home page. */
router.get('/', function(req, res, next) {
	columnCtrl.getColumnList().then(function(columnList) {
		var columnListx=JSON.stringify(columnList);
		columnList=JSON.parse(columnListx);
		for (let i = 0; i < columnList.length; i++) {
			columnList[i].id += '';
		}
		res.jsonp(columnList);
	});
});

module.exports = router;