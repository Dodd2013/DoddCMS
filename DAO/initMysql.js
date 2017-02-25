var models = require("./models");

Promise.all([
	models.user.sync(),
	models.role.sync(),
	models.permission.sync()
]).then(function() {
	//基础表建完之后建立关系表
	require("../Model/relations/role_permission");
	require("../Model/relations/user_role");
});