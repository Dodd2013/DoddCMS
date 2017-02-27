(function() {
	//消除load遮盖层
	var removeLoadCover = function() {
		$(".load-cover").css({
			opacity: 0
		});
		setTimeout(function() {
			$(".load-cover").remove();
		}, 1000);
	};
	var app = angular.module('admin', []);
	app.controller('adminCtrl', function($scope) {
		$scope.config = config;
		$scope.title = "管理主页"
	})

	setTimeout(function() {
		removeLoadCover();
	}, 2000);
})();