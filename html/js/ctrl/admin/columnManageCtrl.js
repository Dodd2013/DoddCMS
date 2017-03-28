/*global define*/
'use strict';

/**
 * The main controller for the app. The controller:
 * - retrieves and persist the model via the todoStorage service
 * - exposes the model to the template and provides event handlers
 */

define(['angular', 'jquery', 'jstree', 'ngJsTree', 'config'], function (angular, $, jstree, ngtree, config) {
	var CtrlName = "columnManageCtrl";
	config = config.config;
	return {
		"route": {
			"path": "columnManage",
			"route": {
				url: '/columnManage',
				// resolve: {},
				templateUrl: 'tpls/columnManage.html',
				controller: CtrlName
			}
		},
		"ctrl": {
			"name": CtrlName,
			"fn": ['$scope', '$timeout', '$http', function ($scope, $timeout, $http) {
				$scope.initJsTree = function () {
					$http({
						url: config.api + '/column',
						method: 'GET',
						withCredentials: true
					}).then(function (data) {
						$scope.originalData = data.data;
						// $scope.treeInstance.refresh();
						$scope.reCreateTree();
					});
				};
				$scope.ignoreChanges = false;
				$scope.treeInstance = {};
				$scope.originalData = [];
				$scope.treeData = [];
				angular.copy($scope.originalData, $scope.treeData);

				$scope.treeConfig = {
					core: {
						multiple: false,
						animation: true,
						error: function error(_error) {
							$log.error('treeCtrl: error from js tree - ' + angular.toJson(_error));
						},
						check_callback: true,
						worker: true
					},
					types: {
						default: {
							icon: 'glyphicon glyphicon-th'
						},
						root: {
							icon: 'glyphicon glyphicon-th-large'
						}
					},
					version: 1,
					plugins: ['types', 'contextmenu']
				};
				$scope.reCreateTree = function () {
					$scope.ignoreChanges = true;
					angular.copy($scope.originalData, $scope.treeData);
					$scope.treeConfig.version++;
				};

				$scope.addNewNode = function () {
					$scope.treeData.push({
						id: (newId++).toString(),
						parent: $scope.newNode.parent,
						text: $scope.newNode.text
					});
				};

				$scope.applyModelChanges = function () {
					return !$scope.ignoreChanges;
				};
				$scope.initJsTree();
			}]
		}
	};
});