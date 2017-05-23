var Role = require("../Model/role");
var User = require("../Model/user");
var User_Role = require("../Model/relations/user_role.js").model;
var config = require("../config.js");
var sequelize = require('../DAO/dao');
var userRoleCtrl = {
	//返回promise对象
	addUserRole: function({
		roleId,
		userName
	}) {
		return User_Role.create({
			userName: userName,
			roleId: roleId
		});
	},
	deleteUserRole: function({
		roleId,
		userName
	}) {
		return User_Role.destroy({
			where: {
				userName: userName,
				roleId: roleId
			}
		});
	},
	getUserRoleByParams: function(params) {
		var sql = `select a.* from role as a JOIN user_role as b WHERE a.roleId=b.roleId and b.userName='${params.userName}'`;
		return sequelize.query(sql, {
			type: sequelize.QueryTypes.SELECT
		});
		// var userName = params.userName;
		// params = params.params;

		// var p = {};
		// if (params.sort && (params.sort in Role.attributes)) {
		// 	p.order = params.sort + ' ' + params.order;
		// }
		// if (params.limit && params.limit < 80) {
		// 	p.limit = Number.parseInt(params.limit);
		// } else {
		// 	p.limit = 20;
		// }
		// if (params.offset) {
		// 	p.offset = Number.parseInt(params.offset);
		// } else {
		// 	p.offset = 0;
		// }
		// if (params.search) {
		// 	// console.log("%"+params.search+"%");
		// 	p.where = {
		// 		roleName: {
		// 			like: "%" + params.search + "%"
		// 		}
		// 	};
		// }
		// return User.findOne({
		// 		where: {
		// 			userName: params.userName
		// 		},
		// 		include: [{
		// 			model: Role
		// 		}]
		// 	});
		// return Role.findAndCountAll(p);
	}

}
module.exports = userRoleCtrl