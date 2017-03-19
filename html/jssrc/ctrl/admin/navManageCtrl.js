/*global define*/
'use strict';

/**
 * The main controller for the app. The controller:
 * - retrieves and persist the model via the todoStorage service
 * - exposes the model to the template and provides event handlers
 */

define(['angular', 'bootstrapTableNg', 'config'], function(angular) {
	var CtrlName = "navManageCtrl";
	var config = require('config').config;
	return {
		"route": {
			"path": "navManage",
			"route": {
				url: '/navManage',
				// resolve: {},
				templateUrl: 'tpls/navManage.html',
				controller: CtrlName
			}
		},
		"ctrl": {
			"name": CtrlName,
			"fn": ['$scope', '$http', function($scope, $http) {
				$scope.ajaxRequest = function(params) {
					// data you need
					// console.log(JSON.stringify(params.data));
					$http({
						url: config.api + '/navbar',
						method: 'GET',
						withCredentials: true,
						params:params.data
					}).then(function(data) {
						//todo
						params.success(data.data);
					});
				}
				$scope.tableCtrl = {
					options: {
						ajax: $scope.ajaxRequest,
						rowStyle: function(row, index) {
							return {
								classes: 'none'
							};
						},
						sidePagination:'server',
						cache: false,
						height: 500,
						striped: true,
						pagination: true,
						pageSize: 10,
						pageList: [5, 10, 25, 50, 100, 200],
						search: true,
						showColumns: true,
						showRefresh: true,
						minimumCountColumns: 2,
						clickToSelect: false,
						maintainSelected: true,
						columns: [{
							field: 'itemId',
							title: '导航ID',
							align: 'center',
							valign: 'bottom',
							sortable: true
						}, {
							field: 'itemName',
							title: '导航名称',
							align: 'center',
							valign: 'middle',
						}, {
							field: 'url',
							title: '地址',
							align: 'left',
							valign: 'top',
						}, {
							field: 'orderby',
							title: '优先级',
							align: 'left',
							valign: 'top',
							sortable: true
						}, {
							field: 'createdAt',
							title: '创建时间',
							align: 'left',
							valign: 'top',
							sortable: true
						}, {
							field: 'updatedAt',
							title: '更新时间',
							align: 'left',
							valign: 'top',
							sortable: true
						}]
					}
				};
			}]
		}
	};
});