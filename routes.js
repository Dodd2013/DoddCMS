var permission = require("./Ctrl/permissionCtrl");
var ueditor = require("./ueditor");
var path = require("path");
var routes = {
	"/": require("./Route/index"),
	"/login": require("./Route/login.js"),
	"/logout": require("./Route/logout.js"),
	"/navbar": require("./Route/navbar.js"),
	"/column": require("./Route/column.js"),
	"/content":require("./Route/content.js"),
	"/user":require("./Route/user.js"),
	"/role":require("./Route/role.js"),
	"/userRole":require("./Route/userRole.js"),
	"/rolePermission":require("./Route/rolePermission.js")
}
module.exports = function(app) {

	app.use("/ue", ueditor(path.join(__dirname, 'public/upload/'), function(req, res, next) {
		// ueditor 客户发起上传图片请求

		if (req.query.action === 'uploadscrawl' || req.query.action === 'uploadimage' || req.query.action === 'uploadfile' || req.query.action === 'uploadvideo') {

			// 这里你可以获得上传图片的信息
			var foo = req.ueditor;
			// console.log(foo.filename); // exp.png
			// console.log(foo.encoding); // 7bit
			// console.log(foo.mimetype); // image/png

			// 下面填写你要把图片保存到的路径 （ 以 path.join(__dirname, 'public') 作为根路径）
			var img_url = req.session.userName + "/" + req.query.action;
			res.ue_up(img_url); //你只要输入要保存的地址 。保存操作交给ueditor来做
		}
		//  客户端发起图片列表请求
		else if (req.query.action === 'listimage') {
			var dir_url = req.session.userName + "/" + 'uploadimage'; // 要展示给客户端的文件夹路径
			res.ue_list(dir_url); // 客户端会列出 dir_url 目录下的所有图片
		} else if (req.query.action === 'listfile') {
			var dir_url = req.session.userName + "/" + 'uploadfile'; // 要展示给客户端的文件夹路径
			res.ue_list(dir_url); // 客户端会列出 dir_url 目录下的所有文件
		} else { // 客户端发起其它请求

			res.setHeader('Content-Type', 'application/json');
			// 这里填写 ueditor.config.json 这个文件的路径
			res.jsonp(require('./ueditor.config.json'));
		}
	}));
	app.use(permission.middleware); //权限过滤器
	for (var key of Object.keys(routes)) {
		app.use(key, routes[key]);
	}
};