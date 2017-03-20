/*global define*/
'use strict';

/**
 * The main controller for the app. The controller:
 * - retrieves and persist the model via the todoStorage service
 * - exposes the model to the template and provides event handlers
 */

define(['angular', 'bootstrapTableNg', 'bootstrapTableCN', 'config'], function (angular) {
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
				$scope.premission = null;
				//获取数据用的ajax
				$scope.ajaxRequest = function (params) {
					// data you need
					// console.log(JSON.stringify(params.data));
					var getdata = $http({
						url: config.api + '/navbar',
						method: 'GET',
						withCredentials: true,
						params: params.data
					});
					if ($scope.premission === null) {
						$http({
							url: config.api + '/navbar/getPermission',
							method: 'GET',
							withCredentials: true
						}).then(function (data) {
							$scope.premission = data.data;
							return getdata;
						}).then(function (data) {
							params.success(data.data);
						});;
					} else {
						getdata.then(function (data) {
							params.success(data.data);
						});
					}
				};
				//bs-table
				$scope.tableCtrl = {
					options: {
						toolbar: "#toolbar",
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
							valign: 'middle'
						}, {
							field: 'url',
							title: '地址',
							align: 'left',
							valign: 'top'
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
						}, {
							field: 'op',
							title: '操作',
							align: 'center',
							valign: 'middle',
							clickToSelect: false,
							formatter: opFormatter
						}]
					}
				};
				function opFormatter(value, row, index) {
					var editBtn = '';
					var deleteBtn = '';
					var _iteratorNormalCompletion = true;
					var _didIteratorError = false;
					var _iteratorError = undefined;

					try {
						for (var _iterator = $scope.premission[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
							var pms = _step.value;

							if (pms.permissionName === 'editNavBar') {
								editBtn = "<a href='#' class='opBtn'><span class='glyphicon glyphicon-edit'></span></a>";
							}
							if (pms.permissionName === 'deleteNavBar') {
								deleteBtn = "<a href='#' class='opBtn'><span class='glyphicon glyphicon-trash'></span></a>";
							}
						}
					} catch (err) {
						_didIteratorError = true;
						_iteratorError = err;
					} finally {
						try {
							if (!_iteratorNormalCompletion && _iterator.return) {
								_iterator.return();
							}
						} finally {
							if (_didIteratorError) {
								throw _iteratorError;
							}
						}
					}

					return editBtn + deleteBtn;
				}
			}]
		}
	};
});