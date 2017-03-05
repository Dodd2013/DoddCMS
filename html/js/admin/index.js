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
		// $scope.login = function() {
		// 	alert("fdas");
		// 	$http.post(config.api + '/login', {

		// 	}).success(function() {

		// 	});
		// };
	});

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
				if(data.msg=="PassWord is not right!")msg="密码不正确！";
				else msg="用户不存在！";
				new PNotify({
					type: 'error',
					text: msg
				});
			}
		});

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