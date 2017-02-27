var Permission = require("../Model/permission");
module.exports = function(req, res, next) {
	Permission.findOne({
		where: {
			method: req.method,
			actionUrl: req.originalUrl
		}
	}).then(function(permission) {
		console.log(JSON.stringify(permission));
		if (permission) {
			if (permission.public) next();
			else {
				//TODO
				res.jsonp({
					"msg": "You don't have permission to do this!",
					status: "no"
				});
			}
		} else {
			var err = new Error('This api is not exist!');
			err.status = 404;
			next(err);
		}
	});

}