var config = {
	"projectName": "DoddCMS",
	"api": "http://localhost:3008"
};
var adminPages = {
	"1": {
		"icon": "fa-user-o",
		"name": "用户管理"
	},
	"101": {
		"url": "userManage",
		"name": "用户管理"
	},
	"102": {
		"url": "#",
		"name": "用户角色管理"
	},
	"2": {
		"icon": "fa-database",
		"name": "系统设置"
	},
	"201": {
		"url": "#",
		"name": "导航栏管理"
	},
	"202": {
		"url": "#",
		"name": "广告位管理"
	},
	"203": {
		"url": "#",
		"name": "数据库备份"
	},
	"3": {
		"icon": "fa-superpowers",
		"name": "权限管理"
	},
	"301": {
		"url": "#",
		"name": "角色管理"
	},
	"302": {
		"url": "#",
		"name": "角色权限管理"
	},
	"4": {
		"icon": "fa-book",
		"name": "内容管理"
	},
	"401": {
		"url": "#",
		"name": "栏目管理"
	},
	"402": {
		"url": "#",
		"name": "投稿"
	},
	"403": {
		"url": "#",
		"name": "内容管理"
	}
};
if (typeof($) != "undefined"){
	$.ajaxSetup({
		xhrFields: {
			withCredentials: true //全局跨域session
		}
	});
}
if (typeof(PNotify) != "undefined") {
	PNotify.prototype.options.styling = "bootstrap3"; //"fontawesome";}
}