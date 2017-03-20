var permission = require("./Ctrl/permissionCtrl");
var routes = {
	"/": require("./Route/index"),
	"/login": require("./Route/login.js"),
	"/logout": require("./Route/logout.js"),
	"/navbar": require("./Route/navbar.js")
}
module.exports = function(app) {
	app.use(permission.middleware);//权限过滤器
	for (var key of Object.keys(routes)) {
		app.use(key, routes[key]);
	}
};