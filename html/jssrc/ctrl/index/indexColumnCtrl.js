'use strict';

define([
	'angular', 'config'
], function(angular, config) {
	return ['$scope', '$http',
		function($scope, $http) {
			config = config.config;
			$http({
				url: config.api + '/column/getColumnAndContentOnIndexPage',
				method: 'GET',
				withCredentials: true
			}).then(function(data) {
				$scope.indexColumData = data.data;
			});
			$scope.config = config.config; //config.get();
		}
	];
});