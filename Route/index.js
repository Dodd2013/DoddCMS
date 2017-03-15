var express = require('express');
var router = express.Router();
var navBarCtrl=require("../Ctrl/navBarCtrl");
/* GET home page. */
router.get('/', function(req, res, next) {
  	res.jsonp({ msg: 'Welcome to DoddCMS API',status:"ok"});
});
router.get('/getNavBar',function(req, res, next) {
	navBarCtrl.getNavbarByOrder().then(function(data) {
		res.jsonp(data);
	})
	
});
module.exports = router;
