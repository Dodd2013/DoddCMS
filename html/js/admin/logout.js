(function() {
	var app = angular.module('logout', []);
	app.controller('logoutCtrl', function($scope, $http) {
		$scope.config = config;
		$scope.title = "退出-" + config.projectName;
	});
	$.ajax({
		url: config.api + '/logout',
		type: 'GET',
		dataType: 'json',
		data: {}
	}).success(function(data) {
		if (data.logout) {
			alert("退出成功");
			window.location.href = "/"
				//TODO
		} else {
			alert("你没有登录，退出个P啊！");
			window.location.href = "/admin"
		}

	}).fail(function() {
		alert("退出失败,请稍后再试！");
		//TODO
	});

})();