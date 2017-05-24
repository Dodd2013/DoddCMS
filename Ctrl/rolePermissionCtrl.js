var Role = require("../Model/role");
var User = require("../Model/user");
var Role_Permission = require("../Model/relations/role_permission.js").model;
var config = require("../config.js");
var sequelize = require('../DAO/dao');
var rolePermissionCtrl = {
	//返回promise对象
	addRolePermission: function({
		roleId,
		permissionId
	}) {
		return Role_Permission.create({
			permissionId: permissionId,
			roleId: roleId
		});
	},
	deleteRolePermission: function({
		roleId,
		permissionId
	}) {
		return Role_Permission.destroy({
			where: {
				permissionId: permissionId,
				roleId: roleId
			}
		});
	},
	getRolePermissionByParams: function(params) {
		var sql = `select * from permission as a JOIN role_permission as b WHERE a.permissionId=b.permissionId AND b.roleId='${params.roleId}'`;
		return sequelize.query(sql, {
			type: sequelize.QueryTypes.SELECT
		});
	}

}
module.exports = rolePermissionCtrl