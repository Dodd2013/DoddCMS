/*global define*/
'use strict';

/**
 * The main controller for the app. The controller:
 * - retrieves and persist the model via the todoStorage service
 * - exposes the model to the template and provides event handlers
 */

define([
	'angular','config'
], function(angular,config) {
	return ['$scope', '$http',
		function($scope, $http) {
			$http({
				url: config.config.api + '/getNavBar',
				method: 'GET',
				xhrFields: {
					withCredentials: true //全局跨域session
				}
			}).then(function(data) {
				$scope.navbar = data.data;
			}, function(data) {

			});
		}
	];
});