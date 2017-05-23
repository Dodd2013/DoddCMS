/*global define*/
'use strict';

/**
 * The main controller for the app. The controller:
 * - retrieves and persist the model via the todoStorage service
 * - exposes the model to the template and provides event handlers
 */

define(['angular', 'config', 'jquery', 'pnotify'], function(angular, config, $, PNotify) {
	PNotify.prototype.options.styling = "bootstrap3";
	var removeLoadCover = function() {
		$(".load-cover").css({
			opacity: 0
		});
		setTimeout(function() {
			$(".load-cover").remove();
		}, 2000);
	};
	var fn = function($scope, $http) {
		var adminPages = config.adminPages;
		config = config.config;
		$scope.config = config;
		$scope.title = "管理主页-" + config.projectName;
		$scope.userName = "";
		$scope.password = "";
		$scope.adminPages = adminPages;
		$scope.login = function() {
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
			}).then(function(data) {
				var resdata = data.data;
				if (resdata.status === "ok") window.location.reload();
				else {
					var msg;
					if (resdata.msg == "PassWord is not right!") msg = "密码不正确！";
					else msg = "用户不存在！";
					// alert(msg);
					new PNotify({
						type: 'error',
						text: msg
					});
				}
			});

		}
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
			"nav": ["201", "202"]
		}];
		$http({
			url: config.api + '/login/status',
			method: 'GET',
			withCredentials: true,
		}).then(function(data) {
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
	};
	return ['$scope', '$http', fn];
});