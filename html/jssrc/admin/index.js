(function() {

	//消除load遮盖层
	var removeLoadCover = function() {
		$(".load-cover").css({
			opacity: 0
		});
		setTimeout(function() {
			$(".load-cover").remove();
		}, 2000);
	};
	var app = angular.module('admin', ['ui.router']);

	app.controller('adminCtrl', function($scope, $http) {
		$scope.config = config;
		$scope.title = "管理主页-" + config.projectName;
		$scope.userName = "";
		$scope.password = "";
		$scope.adminPages = adminPages;
		$scope.navList = [{
			"title": "1",
			"nav": ["101", "102"]
		}, {
			"title": "2",
			"nav": ["201", "202", "203"]
		}, {
			"title": "3",
			"nav": ["301", "302"]
		}, {
			"title": "4",
			"nav": ["401", "402", "403"]
		}];
		// $scope.login = function() {
		// 	alert("fdas");
		// 	$http.post(config.api + '/login', {

		// 	}).success(function() {

		// 	});
		// };
	});
	app.config(['$stateProvider', '$urlRouterProvider',
		function($stateProvider, $urlRouterProvider) {
			$urlRouterProvider
			// // 错误的路由重定向
			// 	.when('/c?id', '/contacts/:id')
			// 	.when('/user/:id', '/contacts/:id')
				.otherwise('/');
			$stateProvider.
			state('userManage', {
				url: '/userManage',
				// template: '<h1>Welcome to UI-Router Demo</h1>',

				// optional below
				// templateProvider: ['$timeout',
				// 	function($timeout) {
				// 		return $timeout(function() {
				// 			return '<p class="lead">UI-Router Resource</p>' +
				// 				'<p>The second line</p>'
				// 		}, 100);
				// 	}
				// ],
				resolve: {
					// myData2: function(myData1, $stateParams) {
					// 	return myData1.get({
					// 		id: $stateParams.itemId
					// 	}).$promise.then(function(response) {
					// 		//对取回来的response还可以干些事情
					// 		return response;
					// 	});
					// },
					// contacts: function() {
					// 	// 以下方法被放在 contacts.service.js 中，以 factory 存在
					// 	return contacts.all();
					// }
				},
				templateUrl: 'tpls/hello.html',

				// templateUrl: function() {
				// 	return 'about.html';
				// },

				controller: 'UIRouterCtrl',
			});
		}
	]);
	$("#loginSubmit").on('click', "", function(event) {
		var $scope = $("html").scope(); //获取angular的scope
		$.ajax({
			url: config.api + '/login',
			type: 'POST',
			dataType: 'json',
			data: {
				userName: $scope.userName,
				passWord: $scope.password
			}
		}).success(function(data) {
			if (data.status === "ok") window.location.reload();
			else {
				var msg;
				if (data.msg == "PassWord is not right!") msg = "密码不正确！";
				else msg = "用户不存在！";
				new PNotify({
					type: 'error',
					text: msg
				});
			}
		});

	});
	$('.sidebar').on('click', '.nav-model .nav-model-header', function(event) {
		$(event.target).parent(".nav-model").toggleClass('active');
	});
	$.ajax({
		url: config.api + '/login/status',
		type: 'GET',
		dataType: 'json',
		data: {}
	}).success(function(data) {
		var $scope = $("html").scope(); //获取angular的scope
		if (data.isLogin) {
			$scope.$apply(function() {
				$scope.userName = data.userName;
			});
			removeLoadCover();
		} else {
			$('#loginModal').modal({
				backdrop: 'static',
				keyboard: false
			});
		}
	});
	//setTimeout(removeLoadCover, 2000);
})();