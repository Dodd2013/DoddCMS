var models = require("./models");
var permissionJson = require("./permission.json");
Promise.all([
	models.user.sync(),
	models.role.sync(),
	models.permission.sync( /*{force: true}*/ )
]).then(function() {
	//基础表建完之后建立关系表
	require("../Model/relations/role_permission");
	require("../Model/relations/user_role");
}).then(function() {
	//初始化权限
	for (var obj of permissionJson) {
		models.permission.upsert(obj);
	}
});