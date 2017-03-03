var role = require("../role");
var permission = require("../permission");
var Sequelize = require('sequelize');
var sequelize = require("../../DAO/dao");
var rolePermission = {
	roleId: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	permissionId: {
		type: Sequelize.STRING,
		allowNull: false
	}
};
var Role_Permission = sequelize.define('Role_Permission', rolePermission, {
	freezeTableName: true
});
var p=Role_Permission.sync().then(function() {
	permission.belongsToMany(role, {
		as: "role",
		through: "Role_Permission",
		foreignKey: 'permissionId'
	});
	role.belongsToMany(permission, {
		as: "permission",
		through: "Role_Permission",
		foreignKey: 'roleId'
	});
});
module.exports={promise:p,model:Role_Permission};
// .then(function() {
// 	return role.create({
// 		// where: {
// 			roleName: 'test',
// 		// },
// 		// defaults: {
// 			DESC: 'this is a test!'
// 		// }
// 	});
// }).then(function(rol) {
// 	return permission.create({
// 		// where: {
// 			permissionId: '0011',
// 		// },
// 		// defaults: {
// 			actionUrl: '/',
// 			permissionName: "home_get",
// 			DESC: "主页访问权限"
// 		// }
// 	}).then(function(per) {
// 		console.log(per.addRole(rol));
// 	});
// });