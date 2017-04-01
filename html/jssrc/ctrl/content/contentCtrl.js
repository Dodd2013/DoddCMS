/*global define*/
'use strict';

/**
 * The main controller for the app. The controller:
 * - retrieves and persist the model via the todoStorage service
 * - exposes the model to the template and provides event handlers
 */

define(function(require, module, exports) {
	var config = require('config');
	function GetQueryString(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) return unescape(r[2]);
		return null;
	}
	return ['$scope', '$http',
		function($scope, $http) {
			$http({
				url: config.config.api + '/content/getById',
				method: 'GET',
				xhrFields: {
					withCredentials: true //全局跨域session
				},
				params: {
					contentId:GetQueryString('contentId')
				}
			}).then(function(data) {
				$scope.content = data.data;
			}, function(data) {

			});
			$scope.config = config.config; //config.get();
		}
	];
});