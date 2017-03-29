var Content = require("../Model/content");
var config = require("../config.js");
var contentCtrl = {
	//返回promise对象
	addContent:function(content,userName) {
		content.userName=userName;
		return Content.create(content);
	}
}
module.exports = contentCtrl;