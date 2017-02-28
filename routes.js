var permission = require("./Controller/permissionCtrl");
var routes = {
	"/": require("./Route/index"),
	"/login": require("./Route/login.js"),
	"/logout": require("./Route/logout.js")
}
module.exports = function(app) {
	app.use(permission);//权限过滤器
	for (var key of Object.keys(routes)) {
		app.use(key, routes[key]);
	}
};