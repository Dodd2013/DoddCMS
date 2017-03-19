/*global define*/
'use strict';

/**
 * The main controller for the app. The controller:
 * - retrieves and persist the model via the todoStorage service
 * - exposes the model to the template and provides event handlers
 */

define(['angular'], function(angular) {
	var CtrlName = "dbManageCtrl";
	return {
		"route": {
			"path": "dbManage",
			"route": {
				url: '/dbManage',
				// resolve: {},
				templateUrl: 'tpls/dbManage.html',
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