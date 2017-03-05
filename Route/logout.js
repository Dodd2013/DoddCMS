var express = require('express');
var router = express.Router();
router.get('/', function(req, res) {
	if (req.session.userName) {
		var userName=req.session.userName;
		req.session.destroy();
		res.jsonp({
			logout: true,
			userName: userName,
			msg: 'Logout success!',
			status: "ok"
		});

	}else{
		res.jsonp({
			logout: false,
			msg: "You did't login!",
			status: "no"
		});
	}
});
module.exports = router;