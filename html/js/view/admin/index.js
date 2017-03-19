'use strict';

// (function() {

// 	var app = angular.module('admin', ['ui.router']);
// 	app.controller('adminCtrl', function($scope, $http) {
// 		$scope.config = config;
// 		$scope.title = "管理主页-" + config.projectName;
// 		$scope.userName = "";
// 		$scope.password = "";
// 		$scope.adminPages = adminPages;
// 		$scope.navList = [{
// 			"title": "4",
// 			"nav": ["401", "402", "403"]
// 		},{
// 			"title": "1",
// 			"nav": ["101", "102"]
// 		}, {
// 			"title": "3",
// 			"nav": ["301", "302"]
// 		}, {
// 			"title": "2",
// 			"nav": ["201", "202", "203"]
// 		}];
// 		// $scope.login = function() {
// 		// 	alert("fdas");
// 		// 	$http.post(config.api + '/login', {

// 		// 	}).success(function() {

// 		// 	});
// 		// };
// 	});

// $("#loginSubmit").on('click', "", function(event) {
// 	var $scope = $("html").scope(); //获取angular的scope
// 	$.ajax({
// 		url: config.api + '/login',
// 		type: 'POST',
// 		dataType: 'json',
// 		data: {
// 			userName: $scope.userName,
// 			passWord: $scope.password
// 		}
// 	}).success(function(data) {
// 		if (data.status === "ok") window.location.reload();
// 		else {
// 			var msg;
// 			if (data.msg == "PassWord is not right!") msg = "密码不正确！";
// 			else msg = "用户不存在！";
// 			new PNotify({
// 				type: 'error',
// 				text: msg
// 			});
// 		}
// 	});

// });
// 	$('.sidebar').on('click', '.nav-model .nav-model-header', function(event) {
// 		$(event.target).parent(".nav-model").toggleClass('active');
// 	});
// $.ajax({
// 	url: config.api + '/login/status',
// 	type: 'GET',
// 	dataType: 'json',
// 	data: {}
// }).success(function(data) {
// 	var $scope = $("html").scope(); //获取angular的scope
// 	if (data.isLogin) {
// 		$scope.$apply(function() {
// 			$scope.userName = data.userName;
// 		});
// 		removeLoadCover();
// 	} else {
// 		$('#loginModal').modal({
// 			backdrop: 'static',
// 			keyboard: false
// 		});
// 	}
// });
// 	//setTimeout(removeLoadCover, 2000);
// })();
// 
define(['angular', 'require', 'jquery', 'config', 'bootstrap', 'route'], function (ng, require) {
	var $ = require('jquery');
	var config = require('config').config;
	var adminPages = require('config').adminPages;
	// 	//消除load遮盖层
	var removeLoadCover = function removeLoadCover() {
		$(".load-cover").css({
			opacity: 0
		});
		setTimeout(function () {
			$(".load-cover").remove();
		}, 2000);
	};
	//todo 用ng去代替
	$('.sidebar').on('click', '.nav-model .nav-model-header', function (event) {
		$(event.target).parent(".nav-model").toggleClass('active');
	});
	//'ui.router'
	var app = ng.module('admin', ['ui.router']);
	app.controller('userManageCtrl', function ($scope, $http) {});
	app.controller('userRoleManageCtrl', function ($scope, $http) {});
	app.controller('navManageCtrl', function ($scope, $http) {});
	app.controller('adManageCtrl', function ($scope, $http) {});
	app.controller('dbManageCtrl', function ($scope, $http) {});
	app.controller('rolePermissionManageCtrl', function ($scope, $http) {});
	app.controller('roleManageCtrl', function ($scope, $http) {});
	app.controller('columnManageCtrl', function ($scope, $http) {});
	app.controller('publishCtrl', function ($scope, $http) {});
	app.controller('contentManageCtrl', function ($scope, $http) {});
	app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
		$stateProvider.state('settings', {
			url: '/settings',
			resolve: {
				// myData2: function(myData1, $stateParams) {
				// 	return myData1.get({
				// 		id: $stateParams.itemId
				// 	}).$promise.then(function(response) {
				// 		//对取回来的response还可以干些事情
				// 		return response;
				// 	});
				// }
			},
			templateUrl: 'tpls/settings.html'
		}).state('index', {
			url: '/',
			resolve: {
				// myData2: function(myData1, $stateParams) {
				// 	return myData1.get({
				// 		id: $stateParams.itemId
				// 	}).$promise.then(function(response) {
				// 		//对取回来的response还可以干些事情
				// 		return response;
				// 	});
				// }
			},
			templateUrl: 'tpls/hello.html'
		}).state('userManage', {
			url: '/userManage',
			resolve: {
				// myData2: function(myData1, $stateParams) {
				// 	return myData1.get({
				// 		id: $stateParams.itemId
				// 	}).$promise.then(function(response) {
				// 		//对取回来的response还可以干些事情
				// 		return response;
				// 	});
				// }
			},
			templateUrl: 'tpls/userManage.html',
			controller: 'userManageCtrl'
		}).state('userRoleManage', {
			url: '/userRoleManage',
			resolve: {
				// myData2: function(myData1, $stateParams) {
				// 	return myData1.get({
				// 		id: $stateParams.itemId
				// 	}).$promise.then(function(response) {
				// 		//对取回来的response还可以干些事情
				// 		return response;
				// 	});
				// }
			},
			templateUrl: 'tpls/userRoleManage.html',
			controller: 'userRoleManageCtrl'
		}).state('navManage', {
			url: '/navManage',
			resolve: {
				// myData2: function(myData1, $stateParams) {
				// 	return myData1.get({
				// 		id: $stateParams.itemId
				// 	}).$promise.then(function(response) {
				// 		//对取回来的response还可以干些事情
				// 		return response;
				// 	});
				// }
			},
			templateUrl: 'tpls/navManage.html',
			controller: 'navManageCtrl'
		}).state('adManage', {
			url: '/adManage',
			resolve: {
				// myData2: function(myData1, $stateParams) {
				// 	return myData1.get({
				// 		id: $stateParams.itemId
				// 	}).$promise.then(function(response) {
				// 		//对取回来的response还可以干些事情
				// 		return response;
				// 	});
				// }
			},
			templateUrl: 'tpls/adManage.html',
			controller: 'adManageCtrl'
		}).state('dbManage', {
			url: '/dbManage',
			resolve: {
				// myData2: function(myData1, $stateParams) {
				// 	return myData1.get({
				// 		id: $stateParams.itemId
				// 	}).$promise.then(function(response) {
				// 		//对取回来的response还可以干些事情
				// 		return response;
				// 	});
				// }
			},
			templateUrl: 'tpls/dbManage.html',
			controller: 'dbManageCtrl'
		}).state('roleManage', {
			url: '/roleManage',
			resolve: {
				// myData2: function(myData1, $stateParams) {
				// 	return myData1.get({
				// 		id: $stateParams.itemId
				// 	}).$promise.then(function(response) {
				// 		//对取回来的response还可以干些事情
				// 		return response;
				// 	});
				// }
			},
			templateUrl: 'tpls/roleManage.html',
			controller: 'roleManageCtrl'
		}).state('rolePermissionManage', {
			url: '/rolePermissionManage',
			resolve: {
				// myData2: function(myData1, $stateParams) {
				// 	return myData1.get({
				// 		id: $stateParams.itemId
				// 	}).$promise.then(function(response) {
				// 		//对取回来的response还可以干些事情
				// 		return response;
				// 	});
				// }
			},
			templateUrl: 'tpls/rolePermissionManage.html',
			controller: 'rolePermissionManageCtrl'
		}).state('columnManage', {
			url: '/columnManage',
			resolve: {
				// myData2: function(myData1, $stateParams) {
				// 	return myData1.get({
				// 		id: $stateParams.itemId
				// 	}).$promise.then(function(response) {
				// 		//对取回来的response还可以干些事情
				// 		return response;
				// 	});
				// }
			},
			templateUrl: 'tpls/columnManage.html',
			controller: 'columnManageCtrl'
		}).state('publish', {
			url: '/publish',
			resolve: {
				// myData2: function(myData1, $stateParams) {
				// 	return myData1.get({
				// 		id: $stateParams.itemId
				// 	}).$promise.then(function(response) {
				// 		//对取回来的response还可以干些事情
				// 		return response;
				// 	});
				// }
			},
			templateUrl: 'tpls/publish.html',
			controller: 'publishCtrl'
		}).state('contentManage', {
			url: '/contentManage',
			resolve: {
				// myData2: function(myData1, $stateParams) {
				// 	return myData1.get({
				// 		id: $stateParams.itemId
				// 	}).$promise.then(function(response) {
				// 		//对取回来的response还可以干些事情
				// 		return response;
				// 	});
				// }
			},
			templateUrl: 'tpls/contentManage.html',
			controller: 'contentManageCtrl'
		});
		$urlRouterProvider.otherwise('/');
	}]);
	app.controller('adminCtrl', function ($scope, $http) {
		$scope.config = config;
		$scope.title = "管理主页-" + config.projectName;
		$scope.userName = "";
		$scope.password = "";
		$scope.adminPages = adminPages;
		$scope.login = function () {
			$http({
				url: config.api + '/login',
				method: 'POST',
				withCredentials: true,
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'Accept': "*/*"
				},
				transformRequest: $.param,
				data: {
					userName: $scope.userName,
					passWord: $scope.password
				}
			}).then(function (data) {
				var resdata = data.data;
				if (resdata.status === "ok") window.location.reload();else {
					var msg;
					if (resdata.msg == "PassWord is not right!") msg = "密码不正确！";else msg = "用户不存在！";
					alert(msg);
					// new PNotify({
					// 	type: 'error',
					// 	text: msg
					// });
				}
			});
		};
		$scope.navList = [{
			"title": "4",
			"nav": ["401", "402", "403"]
		}, {
			"title": "1",
			"nav": ["101", "102"]
		}, {
			"title": "3",
			"nav": ["301", "302"]
		}, {
			"title": "2",
			"nav": ["201", "202", "203"]
		}];
		$http({
			url: config.api + '/login/status',
			method: 'GET',
			withCredentials: true
		}).then(function (data) {
			var resdata = data.data;
			if (resdata.isLogin) {
				$scope.userName = resdata.userName;
				removeLoadCover();
			} else {
				$('#loginModal').modal({
					backdrop: 'static',
					keyboard: false
				});
			}
		});
	});
	ng.bootstrap(document, ['admin']);
	// $.ajax({
	// 	url: config.api + '/login/status',
	// 	type: 'GET',
	// 	dataType: 'json',
	// 	data: {}
	// }).success(function(data) {
	// 	var $scope = $("html").scope(); //获取angular的scope
	// 	if (data.isLogin) {
	// 		$scope.$apply(function() {
	// 			$scope.userName = data.userName;
	// 		});
	// 		removeLoadCover();
	// 	} else {
	// 		$('#loginModal').modal({
	// 			backdrop: 'static',
	// 			keyboard: false
	// 		});
	// 	}
	// });

	// ng.module('index', [])
	// 	.config(function($httpProvider) {
	// 		$httpProvider.defaults.withCredentials = true;
	// 	})
	// 	.controller('headCtrl', headCtrl)
	// 	.controller('navCtrl', navCtrl)
	// 	.controller('swiperCtrl', swiperCtrl);
});