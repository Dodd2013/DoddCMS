/*global define*/
'use strict';

/**
 * The main controller for the app. The controller:
 * - retrieves and persist the model via the todoStorage service
 * - exposes the model to the template and provides event handlers
 */

define(['require', 'angular', 'ueditor', 'jquery', 'zeroclipboard', 'config'], function(require, angular, UE, $, zcl, config) {
	var CtrlName = "publishCtrl";
	config = config.config;
	return {
		"route": {
			"path": "publish",
			"route": {
				url: '/publish',
				// resolve: {},
				templateUrl: 'tpls/publish.html',
				controller: CtrlName
			}
		},
		"ctrl": {
			"name": CtrlName,
			"fn": ['$scope', '$http', function($scope, $http) {
				window.ZeroClipboard = zcl;
				window.UE.delEditor("container");
				var editor = window.UE.getEditor('container');
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
					
				});
			}]
		}
	};
});