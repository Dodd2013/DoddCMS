var userCtrl = require("../Ctrl/userCtrl");
var roleCtrl = require("../Ctrl/roleCtrl");
var permissionCtrl = require("../Ctrl/permissionCtrl");
var config = require("../config.js");
module.exports = function() {
	roleCtrl.addRole({
		roleName: 'admin',
		DESC: '超级管理员角色'
	}).spread(function(role, created) {
		permissionCtrl.getAllPermissions().then(function(permissions) {
			role.addPermission(permissions);
		});
		return userCtrl.addUser(config.admin).spread(function(user, created) {
			if (created) {
				console.log("管理用户已存在，忘记密码请重新设置管理用户名!");
			}
			return user.setRole(role);
		});
	}).then(function(data) {
		console.log("adminRoleAdd"+JSON.stringify(data));
	});

};