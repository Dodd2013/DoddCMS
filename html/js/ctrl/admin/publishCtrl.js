/*global define*/
'use strict';

/**
 * The main controller for the app. The controller:
 * - retrieves and persist the model via the todoStorage service
 * - exposes the model to the template and provides event handlers
 */

define(['require', 'angular', 'ueditor', 'jquery', 'zeroclipboard', 'config'], function (require, angular, UE, $, zcl, config) {
	var CtrlName = "publishCtrl";
	config = config.config;
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
			"fn": ['$scope', '$http', function ($scope, $http) {
				window.ZeroClipboard = zcl;
				window.UE.delEditor("container");
				var editor = window.UE.getEditor('container');
				$scope.selectColumnInput = function () {
					$('#seletColumnModal').modal('show');
				};
				$scope.selectColumnClick = function () {
					$scope.belongtoColumn = $scope.selectedcolumnName;
					$('#seletColumnModal').modal('hide');
				};
				$scope.initJsTree = function () {
					$http({
						url: config.api + '/column',
						method: 'GET',
						withCredentials: true
					}).then(function (data) {
						$scope.originalData = data.data;
						$scope.reCreateTree();
					});
				};
				$scope.selectColumn = function (node, selected, event) {
					for (var key in $scope.originalData) {
						if ($scope.originalData[key].id === selected.selected[0]) {
							$scope.selected = $scope.originalData[key];
							break;
						}
					}
					// $scope.selected = $scope.originalData[parseInt(selected.selected[0]) - 1];
					$scope.selectedcolumnName = $scope.parentColumnName = $scope.selected.text;
					$scope.parentColumnId = $scope.selected.id;
					$scope.selectedDESC = $scope.selected.DESC;
					$scope.type = null;
				};
				$scope.treeEventsObj = {
					'select_node': $scope.selectColumn
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
				$scope.applyModelChanges = function () {
					return !$scope.ignoreChanges;
				};
				$scope.initJsTree();
			}]
		}
	};
});