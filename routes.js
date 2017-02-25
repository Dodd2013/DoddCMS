var routes={
	"/":require("./routes/index"),
	"/login":require("./routes/login.js")
}
module.exports = function(app) {
	for(var key of Object.keys(routes)){
		app.use(key,routes[key]);
	}
};