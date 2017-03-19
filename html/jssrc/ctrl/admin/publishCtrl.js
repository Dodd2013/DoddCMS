/*global define*/
'use strict';

/**
 * The main controller for the app. The controller:
 * - retrieves and persist the model via the todoStorage service
 * - exposes the model to the template and provides event handlers
 */

define(['angular'], function(angular) {
	var CtrlName = "publishCtrl";
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
			"fn": ['$scope', function($scope) {

			}]
		}
	};
});