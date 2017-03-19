var Permission = require("../Model/permission");
var user = require("../Model/user");
module.exports = function(req, res, next) {
	Permission.findOne({
		where: {
			method: req.method,
			actionUrl: req._parsedUrl.pathname
		}
	}).then(function(permission) {
		// console.log(JSON.stringify(permission));
		// todo效率有待修正
		if (permission) {
			if (permission.public) {
				next();
			} else {
				user.findOne({
					where: {
						userName: req.session.userName
					}
				}).then(function(user) {
					return user.getRole();
				}).then(function(roles) {
					var rp = [];
					for (let role of roles) {
						rp.push(role.hasPermission(permission));
					}
					return Promise.all(rp);
				}).then(function(data) {
					// console.log(JSON.stringify(data));
					let f = false;
					for (let flag of data) {
						if (flag) {
							next();
							f=true;
							break;
						}
					}
					if (!f) {
						res.jsonp({
							"msg": "You don't have permission to do this!",
							status: "no"
						});
					}

				});
			}
		} else {
			res.status(404);
			res.jsonp({
				// actionUrl:req._parsedUrl.pathname,
				// method:req.method,
				"msg": "This api is not find!",
				status: "no"
			});
		}
	});

}