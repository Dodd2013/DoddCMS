define(function(require, exports, module) {
	var ng = require('angular');
	var $ = require('jquery');
	var config = require('config').config;
	var adminPages = require('config').adminPages;
	var bootstrap = require('bootstrap');
	var route = require('route');
	var routeCtrlsBasePath = "ctrl/admin/";
	var routeCtrls = ['settingCtrl', 'indexCtrl', 'userManageCtrl', 'navManageCtrl'
	, 'adManageCtrl', 'dbManageCtrl', 'roleManageCtrl', 'rolePermissionManageCtrl'
	,'columnManageCtrl','publishCtrl','contentManageCtrl','userRoleManageCtrl'];
	var routeCtrlsImpl = [];
	var bootstrapTableNg=require('bootstrapTableNg');
	//todo 用ng去代替
	$('.sidebar').on('click', '.nav-model .nav-model-header', function(event) {
		$(event.target).parent(".nav-model").toggleClass('active');
	});

	for (let xCtrl in routeCtrls) {
		routeCtrls[xCtrl] = routeCtrlsBasePath + routeCtrls[xCtrl];
	}
	require(['require', 'ctrl/admin/adminCtrl'].concat(routeCtrls), function() {
		//加载ctrl文件
		for (let xCtrl of routeCtrls) {
			routeCtrlsImpl.push(require(xCtrl));
		}

		var app = ng.module('admin', ['ui.router','bsTable']);

		// 注册Ctrl
		for (let xCtrl of routeCtrlsImpl) {
			app.controller(xCtrl.ctrl.name, xCtrl.ctrl.fn);
		}

		app.config(['$stateProvider', '$urlRouterProvider',
			function($stateProvider, $urlRouterProvider) {
				//注册route
				for (let xCtrl of routeCtrlsImpl) {
					$stateProvider.state(xCtrl.route.path, xCtrl.route.route)
				}
				//默认路由
				$urlRouterProvider
					.otherwise('/');
			}
		]);
		app.controller('adminCtrl', require('ctrl/admin/adminCtrl'));
		ng.bootstrap(document, ['admin']);
	});

});