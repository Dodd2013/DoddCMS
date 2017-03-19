/*global define*/
'use strict';

/**
 * The main controller for the app. The controller:
 * - retrieves and persist the model via the todoStorage service
 * - exposes the model to the template and provides event handlers
 */

define(['angular', 'bootstrapTableNg', 'config'], function (angular) {
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
			"fn": ['$scope', '$http', function ($scope, $http) {
				$scope.ajaxRequest = function (params) {
					// data you need
					// console.log(JSON.stringify(params));
					$http({
						url: config.api + '/getNavBar',
						method: 'GET',
						withCredentials: true
					}).then(function (data) {
						//todo
						params.success({
							total: 100,
							rows: [{
								"id": 0,
								"name": "Item 0",
								"price": "$0"
							}]
						});
					});
				};
				$scope.tableCtrl = {
					options: {
						ajax: $scope.ajaxRequest,
						rowStyle: function rowStyle(row, index) {
							return {
								classes: 'none'
							};
						},
						sidePagination: 'server',
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
						showToggle: true,
						maintainSelected: true,
						columns: [{
							field: 'id',
							title: 'Item ID',
							align: 'center',
							valign: 'bottom',
							sortable: true
						}, {
							field: 'name',
							title: '名称',
							align: 'center',
							valign: 'middle'
						}, {
							field: 'price',
							title: '价格',
							align: 'left',
							valign: 'top'
						}]
					}
				};
			}]
		}
	};
});