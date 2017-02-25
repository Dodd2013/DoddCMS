var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  	res.jsonp({ msg: 'Welcome to DoddCMS API',status:"ok"});
});

module.exports = router;
