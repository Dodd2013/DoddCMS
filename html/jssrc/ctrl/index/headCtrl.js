/*global define*/
'use strict';

/**
 * The main controller for the app. The controller:
 * - retrieves and persist the model via the todoStorage service
 * - exposes the model to the template and provides event handlers
 */

define([
	'angular','config'
], function (angular,config) {
	return ['$scope',
		function ($scope) {
			$scope.config = config.config;//config.get();
		}
	];
});
