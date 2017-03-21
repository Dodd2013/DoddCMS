var Permission = require("../Model/permission");
var user = require("../Model/user");
var sequelize = require('../DAO/dao');
module.exports = {
	getPremissionInFunctionModelForUser: function(userName, FunctionModelId) {
		var sql = `select a.permissionId,a.actionUrl,a.permissionName,a.method,a.DESC from permission as a JOIN role_permission as b JOIN user_role as c WHERE a.permissionId=b.permissionId and c.roleId =b.roleId and c.userName='${ userName }'`;

		return sequelize.query(sql, {
			type: sequelize.QueryTypes.SELECT
		});
	},
	middleware: function(req, res, next) {
		Permission.findOne({
			where: {
				method: req.method,
				actionUrl: req._parsedUrl.pathname
			}
		}).then(function(permission) {
			console.log(JSON.stringify(permission));
			// todo效率有待修正
			if (permission != null) {
				if (permission.public) {
					next();
				} else {
					var sql = `select a.permissionId from permission as a join role_permission as b JOIN user_role as c where a.permissionId=b.permissionId and b.roleId=c.roleId and c.userName='${req.session.userName}' and a.permissionId='${permission.permissionId}'`;
					sequelize.query(sql, {
						type: sequelize.QueryTypes.SELECT
					}).then(function(data) {
						console.log(JSON.stringify(data));
						if (data.length != 0) {
							next();
						} else {
							res.jsonp({
								"msg": "You don't have permission to do this!",
								status: "no"
							});
						}
					});
					// user.findOne({
					// 	where: {
					// 		userName: req.session.userName
					// 	}
					// }).then(function(user) {
					// 	return user.getRole();
					// }).then(function(roles) {
					// 	var rp = [];
					// 	for (let role of roles) {
					// 		rp.push(role.hasPermission(permission));
					// 	}
					// 	return Promise.all(rp);
					// }).then(function(data) {
					// 	// console.log(JSON.stringify(data));
					// 	let f = false;
					// 	for (let flag of data) {
					// 		if (flag) {
					// 			next();
					// 			f = true;
					// 			break;
					// 		}
					// 	}
					// 	if (!f) {

					// 	}

					// });
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
}