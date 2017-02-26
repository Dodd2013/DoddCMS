var user = require("../user");
var role = require("../role");
var Sequelize = require('sequelize');
var sequelize = require("../../DAO/dao");
var userRole = {
	roleId: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	userName: {
		type: Sequelize.STRING,
		allowNull: false
	}
};
var User_Role = sequelize.define('User_Role', userRole, {
	freezeTableName: true
});
User_Role.sync().then(function() {
	user.belongsToMany(role, {
		as: "role",
		through: "User_Role",
		foreignKey: 'roleId',
	});
	role.belongsToMany(user, {
		as: "user",
		through: "User_Role",
		foreignKey: 'userName'
	});
});
module.exports=User_Role;