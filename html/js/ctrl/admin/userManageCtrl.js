/*global define*/
'use strict';

/**
 * The main controller for the app. The controller:
 * - retrieves and persist the model via the todoStorage service
 * - exposes the model to the template and provides event handlers
 */

define(['angular'], function (angular) {
	var CtrlName = "userManageCtrl";
	return {
		"route": {
			"path": "userManage",
			"route": {
				url: '/userManage',
				// resolve: {},
				templateUrl: 'tpls/userManage.html',
				controller: CtrlName
			}
		},
		"ctrl": {
			"name": CtrlName,
			"fn": ['$scope', function ($scope) {}]
		}
	};
});