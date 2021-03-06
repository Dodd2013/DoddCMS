var permission = require("../permission");
var functionModel = require("../functionModel");
var Sequelize = require('sequelize');
var sequelize = require("../../DAO/dao");
var functionModelPermission = {
	functionModelId: {
		type: Sequelize.STRING,
		allowNull: false
	},
	permissionId: {
		type: Sequelize.STRING,
		allowNull: false
	}
};
var FunctionModel_Permission = sequelize.define('FunctionModel_Permission', functionModelPermission, {
	freezeTableName: true
});
var p=FunctionModel_Permission.sync().then(function() {
	permission.belongsToMany(functionModel, {
		as: "functionModel",
		through: "FunctionModel_Permission",
		foreignKey: 'permissionId'
	});
	functionModel.belongsToMany(permission, {
		as: "permission",
		through: "FunctionModel_Permission",
		foreignKey: 'functionModelId'
	});
});
module.exports={promise:p,model:FunctionModel_Permission};
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
