var routes={
	"/":require("./Route/index"),
	"/login":require("./Route/login.js")
}
module.exports = function(app) {
	for(var key of Object.keys(routes)){
		app.use(key,routes[key]);
	}
};