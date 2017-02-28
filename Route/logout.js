var express = require('express');
var router = express.Router();
router.get('/', function(req, res) {
	console.dir(req.session);
	if (req.session.userName) {
		var userName=req.session.userName;
		req.session.destroy();
		res.jsonp({
			logout: true,
			userName: userName,
			msg: 'Logout success!', //TODO
			status: "ok"
		});

	}else{
		res.jsonp({
			logout: false,
			msg: "You did't login!", //TODO
			status: "no"
		});
	}
});
module.exports = router;