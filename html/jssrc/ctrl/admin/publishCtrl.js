/*global define*/
'use strict';

/**
 * The main controller for the app. The controller:
 * - retrieves and persist the model via the todoStorage service
 * - exposes the model to the template and provides event handlers
 */

define(['require', 'angular', 'ueditor', 'jquery', 'zeroclipboard', 'config', 'pnotify'], function(require, angular, UE, $, zcl, config, PNotify) {
	PNotify.prototype.options.styling = "bootstrap3";
	var CtrlName = "publishCtrl";
	config = config.config;
	return {
		"route": {
			"path": "publish",
			"route": {
				url: '/publish',
				// resolve: {},
				templateUrl: 'tpls/publish.html',
				controller: CtrlName,
				params: {
					'contentId': null
				}
			}
		},
		"ctrl": {
			"name": CtrlName,
			"fn": ['$scope', '$http', '$stateParams', function($scope, $http, $stateParams) {
				let contentId = $stateParams.contentId;
				window.ZeroClipboard = zcl;
				window.UE.delEditor("container");
				$scope.isEdit=false;
				$scope.editor = window.UE.getEditor('container');
				$scope.editor.ready(function() {
					if (contentId) {
						$scope.isEdit=true;
						//编辑逻辑
						$http({
							url: config.api + '/content/getById',
							method: 'GET',
							withCredentials: true,
							params: {
								contentId: contentId
							}
						}).then(function(data) {
							$scope.content = data.data;
							$scope.contentTitle=$scope.content.contentTitle;
							$scope.simpleTitle=$scope.content.simpleTitle;
							$scope.contentDESC=$scope.content.contentDESC;
							$scope.source=$scope.content.source;
							$scope.sourceUrl=$scope.content.sourceUrl;
							$scope.editor.setContent($scope.content.contentWithHTML);
						});
					}
				});
				$scope.selectColumnInput = function() {
					$('#seletColumnModal').modal('show');
				};
				$scope.selectColumnClick = function() {
					$scope.belongtoColumn = $scope.selected.text;
					$scope.belongtoColumnId = $scope.selected.id;
					$('#seletColumnModal').modal('hide');
				};
				$scope.publish = function() {
					if(!$scope.isEdit){
						$http({
							url: config.api + '/content/add',
							method: 'POST',
							withCredentials: true,
							headers: {
								'Content-Type': 'application/x-www-form-urlencoded',
								'Accept': "*/*"
							},
							transformRequest: $.param,
							data: {
								source: $scope.source,
								sourceUrl: $scope.sourceUrl,
								contentTitle: $scope.contentTitle,
								simpleTitle: $scope.simpleTitle,
								columnId: $scope.belongtoColumnId,
								contentDESC: $scope.contentDESC,
								contentType: "default",
								contentWithHTML: $scope.editor.getContent(),
								contentText: $scope.editor.getContentTxt()
							}
						}).then(function(data) {
							if (data.statusText === 'OK') {
								new PNotify({
									type: 'success',
									text: '发布文章成功!'
								});
								//todo
							} else {
								new PNotify({
									type: 'error',
									text: '发布文章失败!'
								});
							}
						}, function(data) {
							new PNotify({
								type: 'error',
								text: '发布文章失败!'
							});
						})
					}else{
						$http({
							url: config.api + '/content/update',
							method: 'POST',
							withCredentials: true,
							headers: {
								'Content-Type': 'application/x-www-form-urlencoded',
								'Accept': "*/*"
							},
							transformRequest: $.param,
							data: {
								contentId:$scope.content.contentId,
								source: $scope.source,
								sourceUrl: $scope.sourceUrl,
								contentTitle: $scope.contentTitle,
								simpleTitle: $scope.simpleTitle,
								contentDESC: $scope.contentDESC,
								contentType: "default",
								contentWithHTML: $scope.editor.getContent(),
								contentText: $scope.editor.getContentTxt()
							}
						}).then(function(data) {
							if (data.statusText === 'OK') {
								new PNotify({
									type: 'success',
									text: '修改文章成功!'
								});
								//todo
							} else {
								new PNotify({
									type: 'error',
									text: '修改文章失败!'
								});
							}
						}, function(data) {
							new PNotify({
								type: 'error',
								text: '修改文章失败!'
							});
						})
					}
				};
				$scope.initJsTree = function() {
					$http({
						url: config.api + '/column',
						method: 'GET',
						withCredentials: true,
					}).then(function(data) {
						$scope.originalData = data.data
						$scope.reCreateTree();
					});
				};
				$scope.selectColumn = function(node, selected, event) {
					for (let key in $scope.originalData) {
						if ($scope.originalData[key].id === selected.selected[0]) {
							$scope.selected = $scope.originalData[key];
							break;
						}
					}
				};
				$scope.treeEventsObj = {
					'select_node': $scope.selectColumn
				}
				$scope.ignoreChanges = false;
				$scope.treeInstance = {};
				$scope.originalData = [];
				$scope.treeData = [];
				angular.copy($scope.originalData, $scope.treeData);
				$scope.treeConfig = {
					core: {
						multiple: false,
						animation: true,
						error: function(error) {
							$log.error('treeCtrl: error from js tree - ' + angular.toJson(error));
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
				$scope.reCreateTree = function() {
					$scope.ignoreChanges = true;
					angular.copy($scope.originalData, $scope.treeData);
					$scope.treeConfig.version++;
				};
				$scope.applyModelChanges = function() {
					return !$scope.ignoreChanges;
				};
				$scope.initJsTree();

			}]
		}
	};
});