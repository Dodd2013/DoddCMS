var models = require("./models");
var permissionJson = require("./permission.json");
var functionModelJson = require("./functionModel.json");
Promise.all([
	models.user.sync(),
	models.role.sync(),
	models.permission.sync( /*{force: true}*/ ),
	models.functionModel.sync(),
	models.column.sync(),
	models.content.sync()
]).then(function() {
	//基础表建完之后建立关系表
	return Promise.all([require("../Model/relations/role_permission").promise,
		require("../Model/relations/user_role").promise,
		require("../Model/relations/functionModel_permission").promise
	]);

}).then(function() {
	//初始化功能模块
	for (let obj of functionModelJson) {
		models.functionModel.upsert(obj);
	};
	//初始化权限
	for (let obj of permissionJson) {
		(function() {
			models.permission.upsert(obj.permission).then(function(created) {
				return models.permission.findOne({
					where: {
						permissionId: obj.permission.permissionId
					}
				}).then(function(per) {
					per.setFunctionModel([obj.belongTo]);
				});
			});
		})();
	}
});