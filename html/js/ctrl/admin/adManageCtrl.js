/*global define*/
'use strict';

/**
 * The main controller for the app. The controller:
 * - retrieves and persist the model via the todoStorage service
 * - exposes the model to the template and provides event handlers
 */

define(['angular'], function (angular) {
	var CtrlName = "adManageCtrl";
	return {
		"route": {
			"path": "adManage",
			"route": {
				url: '/adManage',
				// resolve: {},
				templateUrl: 'tpls/adManage.html',
				controller: CtrlName
			}
		},
		"ctrl": {
			"name": CtrlName,
			"fn": ['$scope', function ($scope) {}]
		}
	};
});