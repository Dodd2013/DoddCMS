/*global define*/
'use strict';

/**
 * The main controller for the app. The controller:
 * - retrieves and persist the model via the todoStorage service
 * - exposes the model to the template and provides event handlers
 */

define(['angular', 'jquery', 'jstree', 'ngJsTree', 'config', 'pnotify'], function (angular, $, jstree, ngtree, config, PNotify) {
	PNotify.prototype.options.styling = "bootstrap3";
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
				$scope.columnName = '';
				$scope.DESC = '';
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
				$scope.onIndexPage = true;
				$scope.createNewColumn = function () {
					if ($scope.parentColumnId != '#' && $scope.selected.type != 'root') {
						new PNotify({
							type: 'warning',
							text: '子栏目不允许有二级子栏目!'
						});
					} else {
						if ($scope.columnName === '' || $scope.DESC === '') {
							new PNotify({
								type: 'warning',
								text: '栏目名称或者栏目描述不能为空!'
							});
						} else {
							$http({
								url: config.api + '/column/add',
								method: 'POST',
								withCredentials: true,
								headers: {
									'Content-Type': 'application/x-www-form-urlencoded',
									'Accept': "*/*"
								},
								transformRequest: $.param,
								data: {
									parentColumnId: $scope.parentColumnId,
									type: $scope.type,
									columnName: $scope.columnName,
									DESC: $scope.DESC,
									onIndexPage: $scope.onIndexPage
								}
							}).then(function (data) {
								new PNotify({
									type: 'success',
									text: '添加栏目成功!'
								});
								$scope.initJsTree();
							}, function () {
								new PNotify({
									type: 'error',
									text: '添加栏目失败!'
								});
							});
						}
					}
				};
				$scope.editColumn = function () {
					$http({
						url: config.api + '/column/edit',
						method: 'POST',
						withCredentials: true,
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded',
							'Accept': "*/*"
						},
						transformRequest: $.param,
						data: {
							columnId: $scope.selected.id,
							columnName: $scope.selectedcolumnName,
							DESC: $scope.selectedDESC,
							onIndexPage: $scope.selectedOnIndexPage
						}
					}).then(function (data) {
						new PNotify({
							type: 'success',
							text: '修改栏目成功!'
						});
						$scope.initJsTree();
					}, function () {
						new PNotify({
							type: 'error',
							text: '修改栏目失败!'
						});
					});
				};
				$scope.deleteColumn = function () {
					$http({
						url: config.api + '/column/delete',
						method: 'POST',
						withCredentials: true,
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded',
							'Accept': "*/*"
						},
						transformRequest: $.param,
						data: {
							columnId: $scope.selected.id
						}
					}).then(function (data) {
						new PNotify({
							type: 'success',
							text: '删除栏目成功!'
						});
						$scope.initJsTree();
						$("#deleteColumnModal").modal("hide");
					}, function () {
						new PNotify({
							type: 'error',
							text: '删除栏目失败!'
						});
					});
				};
				$scope.selectRootColumn = function () {
					$scope.parentColumnName = "顶级父节点";
					$scope.parentColumnId = '#';
					$scope.selected.type = $scope.type = 'root';
					$scope.treeInstance.jstree(true).deselect_all();
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
					$scope.selectedOnIndexPage = $scope.selected.onIndexPage;
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