/*global define*/
'use strict';

/**
 * The main controller for the app. The controller:
 * - retrieves and persist the model via the todoStorage service
 * - exposes the model to the template and provides event handlers
 */

define(['angular'], function (angular) {
	var CtrlName = "settingCtrl";
	return {
		"route": {
			"path": "settings",
			"route": {
				url: '/settings',
				resolve: {
					// myData2: function(myData1, $stateParams) {
					// 	return myData1.get({
					// 		id: $stateParams.itemId
					// 	}).$promise.then(function(response) {
					// 		//对取回来的response还可以干些事情
					// 		return response;
					// 	});
					// }
				},
				templateUrl: 'tpls/settings.html',
				controller: CtrlName
			}
		},
		"ctrl": {
			"name": CtrlName,
			"fn": ['$scope', function ($scope) {}]
		}
	};
});