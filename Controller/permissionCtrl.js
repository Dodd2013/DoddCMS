var Permission = require("../Model/permission");
module.exports = function(req, res, next) {
	Permission.findOne({
		where: {
			method: req.method,
			actionUrl: req._parsedUrl.pathname
		}
	}).then(function(permission) {
		console.log(JSON.stringify(permission));
		if (permission) {
			if (permission.public) {
				next();
			} else {
				//TODO
				res.jsonp({
					"msg": "You don't have permission to do this!",
					status: "no"
				});
			}
		} else {
			res.status(404);
			res.jsonp({
				// actionUrl:req._parsedUrl.pathname,
				// method:req.method,
				"msg": "You don't have permission to do this!",
				status: "no"
			});
		}
	});

}