var express = require('express');
var router = express.Router();
var navBarCtrl = require("../Ctrl/navBarCtrl");
/* GET home page. */
router.get('/', function(req, res, next) {
	navBarCtrl.getNavbarByParams(req.query).then(function(data) {
		res.jsonp({total:data.count,rows:data.rows});
	})
});
module.exports = router;