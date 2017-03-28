'use strict';

define(function (require, exports, module) {
	var ng = require('angular');
	var $ = require('jquery');
	var ngJsTree = require('ngJsTree');
	var config = require('config').config;
	var adminPages = require('config').adminPages;
	var bootstrap = require('bootstrap');
	var route = require('route');
	var routeCtrlsBasePath = "ctrl/admin/";
	var routeCtrls = ['settingCtrl', 'indexCtrl', 'userManageCtrl', 'navManageCtrl', 'adManageCtrl', 'dbManageCtrl', 'roleManageCtrl', 'rolePermissionManageCtrl', 'columnManageCtrl', 'publishCtrl', 'contentManageCtrl', 'userRoleManageCtrl'];
	var routeCtrlsImpl = [];
	var bootstrapTableNg = require('bootstrapTableNg');
	//todo 用ng去代替
	$('.sidebar').on('click', '.nav-model .nav-model-header', function (event) {
		$(event.target).parent(".nav-model").toggleClass('active');
	});

	for (var xCtrl in routeCtrls) {
		routeCtrls[xCtrl] = routeCtrlsBasePath + routeCtrls[xCtrl];
	}
	require(['require', 'ctrl/admin/adminCtrl'].concat(routeCtrls), function () {
		//加载ctrl文件
		var _iteratorNormalCompletion = true;
		var _didIteratorError = false;
		var _iteratorError = undefined;

		try {
			for (var _iterator = routeCtrls[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
				var _xCtrl2 = _step.value;

				routeCtrlsImpl.push(require(_xCtrl2));
			}
		} catch (err) {
			_didIteratorError = true;
			_iteratorError = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion && _iterator.return) {
					_iterator.return();
				}
			} finally {
				if (_didIteratorError) {
					throw _iteratorError;
				}
			}
		}

		var app = ng.module('admin', ['ui.router', 'bsTable', 'ngJsTree']);

		// 注册Ctrl
		var _iteratorNormalCompletion2 = true;
		var _didIteratorError2 = false;
		var _iteratorError2 = undefined;

		try {
			for (var _iterator2 = routeCtrlsImpl[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
				var _xCtrl3 = _step2.value;

				app.controller(_xCtrl3.ctrl.name, _xCtrl3.ctrl.fn);
			}
		} catch (err) {
			_didIteratorError2 = true;
			_iteratorError2 = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion2 && _iterator2.return) {
					_iterator2.return();
				}
			} finally {
				if (_didIteratorError2) {
					throw _iteratorError2;
				}
			}
		}

		app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
			//注册route
			var _iteratorNormalCompletion3 = true;
			var _didIteratorError3 = false;
			var _iteratorError3 = undefined;

			try {
				for (var _iterator3 = routeCtrlsImpl[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
					var _xCtrl = _step3.value;

					$stateProvider.state(_xCtrl.route.path, _xCtrl.route.route);
				}
				//默认路由
			} catch (err) {
				_didIteratorError3 = true;
				_iteratorError3 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion3 && _iterator3.return) {
						_iterator3.return();
					}
				} finally {
					if (_didIteratorError3) {
						throw _iteratorError3;
					}
				}
			}

			$urlRouterProvider.otherwise('/');
		}]);
		app.controller('adminCtrl', require('ctrl/admin/adminCtrl'));
		ng.bootstrap(document, ['admin']);
	});
});