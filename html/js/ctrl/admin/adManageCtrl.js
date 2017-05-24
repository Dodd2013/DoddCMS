/*global define*/
'use strict';

/**
 * The main controller for the app. The controller:
 * - retrieves and persist the model via the todoStorage service
 * - exposes the model to the template and provides event handlers
 */

define(['angular', 'bootstrapTableNg', 'bootstrapTableCN', 'config', 'pnotify', 'jquery'], function (angular) {
	var config = require('config').config;
	var $ = require('jquery');
	var PNotify = require('pnotify');
	PNotify.prototype.options.styling = "bootstrap3";
	var CtrlName = "adManageCtrl";
	return {
		"route": {
			"path": "adManage",
			"route": {
				url: '/adManage',
				// resolve: {},
				templateUrl: 'tpls/adManage.html',
				controller: CtrlName
			}
		},
		"ctrl": {
			"name": CtrlName,
			"fn": ['$scope', '$http', function ($scope, $http) {
				$scope.premission = null;
				$scope.canAddNav = true; //true的时候隐藏
				$scope.editAd = $scope.deleteNavBtn = false;
				//获取数据用的ajax
				$scope.ajaxRequest = function (params) {
					// data you need
					// console.log(JSON.stringify(params.data));
					var getdata = $http({
						url: config.api + '/ad',
						method: 'GET',
						withCredentials: true,
						params: params.data
					});
					if ($scope.premission === null) {
						$http({
							url: config.api + '/getPermission',
							method: 'GET',
							withCredentials: true,
							params: {
								functionModel: 202
							}
						}).then(function (data) {
							$scope.premission = data.data;
							var _iteratorNormalCompletion = true;
							var _didIteratorError = false;
							var _iteratorError = undefined;

							try {
								for (var _iterator = $scope.premission[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
									var pms = _step.value;

									if (pms.permissionName === 'addAd') {
										$scope.canAddNav = false;
									}
									if (pms.permissionName === 'editAd') {
										$scope.editAd = true;
									}
									if (pms.permissionName === 'deleteAd') {
										$scope.deleteAd = true;
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
							field: 'adId',
							title: '广告位ID',
							align: 'center',
							valign: 'bottom',
							sortable: true
						}, {
							field: 'adName',
							title: '广告位名称',
							align: 'center',
							valign: 'middle'
						}, {
							field: 'adUrl',
							title: '广告位连接',
							align: 'center',
							valign: 'middle'
						}, {
							field: 'adPos',
							title: '广告位位置',
							align: 'center',
							valign: 'middle'
						}, {
							field: 'adData',
							title: '广告位数据',
							align: 'center',
							valign: 'middle'
						}, {
							field: 'orderby',
							title: '优先级',
							align: 'center',
							valign: 'middle',
							sortable: true
						}, {
							field: 'createdAt',
							title: '创建时间',
							align: 'center',
							valign: 'middle',
							formatter: timeFormatter,
							sortable: true
						}, {
							field: 'updatedAt',
							title: '更新时间',
							align: 'center',
							valign: 'middle',
							formatter: timeFormatter,
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

				function timeFormatter(value, row, index) {
					if (value == null) return '未知时间';
					var date = new Date(value);
					var localeString = date.toLocaleString();
					return localeString;
				};

				function opFormatter(value, row, index) {
					var editBtn = '';
					var deleteBtn = '';
					if ($scope.editAd) {
						editBtn = '<a data-op=\'edit\' data-orderby=\'' + row.orderby + '\' data-adPos=\'' + row.adPos + '\' data-adData=\'' + row.adData + '\' data-adUrl=\'' + row.adUrl + '\' data-adName=\'' + row.adName + '\' data-adId=\'' + row.adId + '\' class=\'opBtn\' title=\'\u7F16\u8F91\u5E7F\u544A\u4F4D\'><span class=\'glyphicon glyphicon-edit\'></span></a>';
					}
					if ($scope.deleteAd) {
						deleteBtn = '<a data-op=\'delete\' data-orderby=\'' + row.orderby + '\' data-adPos=\'' + row.adPos + '\' data-adData=\'' + row.adData + '\' data-adUrl=\'' + row.adUrl + '\' data-adName=\'' + row.adName + '\' data-adId=\'' + row.adId + '\' class=\'opBtn\' title=\'\u5220\u9664\u5E7F\u544A\u4F4D\'><span class=\'glyphicon glyphicon-trash\'></span></a>';
					}
					return editBtn + deleteBtn;
				};
				$scope.addOrEdit = 'add';
				$('#adTable').on('click', '.opBtn', function (e) {
					var op = $(e.currentTarget).attr('data-op');
					var ad = {
						adId: $(e.currentTarget).attr('data-adId'),
						adPos: $(e.currentTarget).attr('data-adPos'),
						adData: $(e.currentTarget).attr('data-adData'),
						adName: $(e.currentTarget).attr('data-adName'),
						adUrl: $(e.currentTarget).attr('data-adUrl'),
						orderby: parseInt($(e.currentTarget).attr('data-orderby'))
					};
					if (op === 'edit') {
						$scope.$apply(function () {
							$scope.showEdit(ad);
						});
					} else if (op === 'delete') {
						$scope.$apply(function () {
							$scope.showRemove(ad);
						});
					}
				});
				$scope.showAdd = function () {
					$scope.addOrEdit = 'add';
					$('#addAndEditModal').modal('show');
				};
				$scope.showEdit = function (ad) {

					$scope.adId = ad.adId;
					$scope.addOrEdit = 'edit';
					$scope.adName = ad.adName;
					$scope.adUrl = ad.adUrl;
					$scope.adPos = ad.adPos;
					$scope.adData = ad.adData;
					$scope.adOrderBy = ad.orderby;
					$('#addAndEditModal').modal('show');
				};
				$scope.showRemove = function (ad) {
					$scope.adId = ad.adId;
					$('#deleteModal').modal('show');
				};
				//删除导航逻辑
				$scope.deleteNavBtn = function () {
					$http({
						url: config.api + '/ad/delete',
						method: 'POST',
						withCredentials: true,
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded',
							'Accept': "*/*"
						},
						transformRequest: $.param,
						data: {
							adId: $scope.adId
						}
					}).then(function (data) {
						if (data.data.status === 'ok') {
							new PNotify({
								type: 'danger',
								text: '\u5220\u9664\u6210\u529F'
							});
							$scope.adId = $scope.adName = $scope.adUrl = $scope.adPos = $scope.adData = $scope.adOrderBy = '';
							$('#deleteModal').modal('hide');
							$('#adTable').bootstrapTable('refresh');
						} else {
							new PNotify({
								type: 'danger',
								text: '\u5220\u9664\u5931\u8D25'
							});
							$scope.adId = $scope.adName = $scope.adUrl = $scope.adPos = $scope.adData = $scope.adOrderBy = '';
							$('#deleteModal').modal('hide');
							$('#adTable').bootstrapTable('refresh');
						}
					});
				};
				//添加导航逻辑
				$scope.addAndEditNavBtn = function () {
					if ($scope.addOrEdit == 'edit') {
						$http({
							url: config.api + '/ad/edit',
							method: 'POST',
							withCredentials: true,
							headers: {
								'Content-Type': 'application/x-www-form-urlencoded',
								'Accept': "*/*"
							},
							transformRequest: $.param,
							data: {
								adId: $scope.adId,
								adPos: $scope.adPos,
								adData: $scope.adData,
								adName: $scope.adName,
								adUrl: $scope.adUrl,
								orderby: $scope.adOrderBy
							}
						}).then(function (data) {
							new PNotify({
								type: 'info',
								text: '\u4FEE\u6539\u6210\u529F'
							});
							$scope.adId = $scope.adName = $scope.adUrl = $scope.adPos = $scope.adData = $scope.adOrderBy = '';
							$('#addAndEditModal').modal('hide');
							$('#adTable').bootstrapTable('refresh');
						}, function (data) {
							new PNotify({
								type: 'error',
								text: '\u4FEE\u6539\u5931\u8D25'
							});
						});
					} else if ($scope.addOrEdit == 'add') {
						$http({
							url: config.api + '/ad/add',
							method: 'POST',
							withCredentials: true,
							headers: {
								'Content-Type': 'application/x-www-form-urlencoded',
								'Accept': "*/*"
							},
							transformRequest: $.param,
							data: {
								adName: $scope.adName,
								adPos: $scope.adPos,
								adData: $scope.adData,
								adUrl: $scope.adUrl,
								orderby: $scope.adOrderBy
							}
						}).then(function (data) {
							new PNotify({
								type: 'info',
								text: '\u6DFB\u52A0\u6210\u529F'
							});
							$scope.adId = $scope.adName = $scope.adUrl = $scope.adPos = $scope.adData = $scope.adOrderBy = '';
							$('#addAndEditModal').modal('hide');
							$('#adTable').bootstrapTable('refresh');
						}, function (data) {
							new PNotify({
								type: 'error',
								text: '\u6DFB\u52A0\u5931\u8D25'
							});
						});
					}
				};
			}]
		}
	};
});