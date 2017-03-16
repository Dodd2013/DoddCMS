"use strict";

define([], function () {
	return {
		config: {
			"projectName": "DoddCMS",
			"api": "http://localhost:3008"
		},
		adminPages: {
			"1": {
				"icon": "fa-user-o",
				"name": "用户管理"
			},
			"101": {
				"url": "userManage",
				"name": "用户管理"
			},
			"102": {
				"url": "userRoleManage",
				"name": "用户角色管理"
			},
			"2": {
				"icon": "fa-database",
				"name": "系统设置"
			},
			"201": {
				"url": "navManage",
				"name": "导航栏管理"
			},
			"202": {
				"url": "adManage",
				"name": "广告位管理"
			},
			"203": {
				"url": "dbManage",
				"name": "数据库备份"
			},
			"3": {
				"icon": "fa-superpowers",
				"name": "权限管理"
			},
			"301": {
				"url": "roleManage",
				"name": "角色管理"
			},
			"302": {
				"url": "rolePermissionManage",
				"name": "角色权限管理"
			},
			"4": {
				"icon": "fa-book",
				"name": "内容管理"
			},
			"401": {
				"url": "columnManage",
				"name": "栏目管理"
			},
			"402": {
				"url": "publish",
				"name": "投稿"
			},
			"403": {
				"url": "contentManage",
				"name": "内容管理"
			}

		}
	};
});