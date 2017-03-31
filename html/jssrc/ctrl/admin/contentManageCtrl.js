/*global define*/
'use strict';

/**
 * The main controller for the app. The controller:
 * - retrieves and persist the model via the todoStorage service
 * - exposes the model to the template and provides event handlers
 */

define(['angular', 'pnotify', 'jquery', 'bootstrapTableNg', 'bootstrapTableCN'], function(angular, PNotify, $) {
	PNotify.prototype.options.styling = "bootstrap3";
	var CtrlName = "contentManageCtrl";
	return {
		"route": {
			"path": "contentManage",
			"route": {
				url: '/contentManage',
				// resolve: {},
				templateUrl: 'tpls/contentManage.html',
				controller: CtrlName
			}
		},
		"ctrl": {
			"name": CtrlName,
			"fn": ['$scope', '$http','$state', function($scope, $http,$state) {
				$scope.premission = null;
				//获取数据用的ajax
				$scope.ajaxRequest = function(params) {
						// data you need
						// console.log(JSON.stringify(params.data));
						var getdata = $http({
							url: config.api + '/content',
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
									functionModel: 402
								}
							}).then(function(data) {
								$scope.premission = data.data;
								return getdata;
							}).then(function(data) {
								params.success(data.data);
							});;
						} else {
							getdata.then(function(data) {
								params.success(data.data);
							});
						}

					}
					//bs-table
				$scope.tableCtrl = {
					options: {
						toolbar: "#toolbar",
						ajax: $scope.ajaxRequest,
						rowStyle: function(row, index) {
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
							field: 'contentId',
							title: '内容序号',
							align: 'center',
							valign: 'middle',
							formatter: idFormatter,
						}, {
							field: 'contentTitle',
							title: '内容标题',
							align: 'center',
							valign: 'middle'
						}, {
							field: 'simpleTitle',
							title: '简单标题',
							align: 'center',
							valign: 'middle'
						}, {
							field: 'contentDESC',
							title: '内容描述',
							align: 'center',
							valign: 'middle'
						}, {
							field: 'contentType',
							title: '内容类型',
							align: 'center',
							valign: 'middle'
						}, {
							field: 'viewCount',
							title: '浏览量',
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
							field: 'state',
							title: '审核状态',
							align: 'center',
							valign: 'middle',
							formatter: stateFormatter,
							sortable: true
						}, {
							field: 'op',
							title: '操作',
							align: 'center',
							valign: 'middle',
							clickToSelect: false,
							formatter: opFormatter
								// 操作按钮单元格
						}]
					}
				};

				function stateFormatter(value, row, index) {
					if (value == 1) return "审核通过";
					if (value == 0) return "未审核";
					if (value == -1) return "审核不通过";
				};

				function idFormatter(value, row, index) {
					return `<a href="/content/${value}" target='_bank'>${value}</a>`
				};

				function timeFormatter(value, row, index) {
					if (value == null) return '未知时间';
					var date = new Date(value);
					var localeString = date.toLocaleString();
					return localeString;
				};

				function opFormatter(value, row, index) {
					let editBtn = ''
					let deleteBtn = '';
					let passBtn = '';
					for (let pms of $scope.premission) {
						if (pms.permissionName === 'passContent') {
							passBtn = `<a data-op='pass' data-contentId='${row.contentId}' class='opBtn' title='审核通过'><span class='glyphicon glyphicon-ok-sign color-success'></span></a>` + `<a data-op='unpass' data-contentId='${row.contentId}' class='opBtn' title='未审核'><span class='glyphicon glyphicon-question-sign color-info'></span></a>` + `<a data-op='notpass' data-contentId='${row.contentId}' class='opBtn' title='审核不通过'><span class='glyphicon glyphicon-remove-sign color-danger'></span></a>`
						}
						if (pms.permissionName === 'editContent') {
							editBtn = `<a data-op='edit' data-contentId='${row.contentId}' class='opBtn' title='编辑内容'><span class='glyphicon glyphicon-edit'></span></a>`;
						}
						if (pms.permissionName === 'deleteContent') {
							deleteBtn = `<a data-op='delete' data-contentId='${row.contentId}' class='opBtn' title='删除内容'><span class='glyphicon glyphicon-trash'></span></a>`;
						}
					}
					return passBtn + editBtn + deleteBtn;
				};

				$('#contentTable').on('click', '.opBtn', function(e) {
					let op = $(e.currentTarget).attr('data-op');
					let contentId = $(e.currentTarget).attr('data-contentId');
					if (op === 'edit') {
						$state.go('publish', {contentId:contentId}); 
					} else if (op === 'delete') {
						$scope.$apply(function() {
							$scope.showRemove(item);
						});
					} else if (op === 'pass' || op === 'unpass' || op === 'notpass') {
						$scope.pass(op, contentId);
					}
				});
				$scope.pass = function(parmas, contentId) {
					$http({
						url: config.api + '/content/pass',
						method: 'GET',
						withCredentials: true,
						headers: {
							'Accept': "*/*"
						},
						params: {
							contentId: contentId,
							op: parmas
						}
					}).then(function(data) {
						new PNotify({
							type: 'success',
							text: `修改审核状态成功`
						});
						$('#contentTable').bootstrapTable('refresh');
					})
				};
				$scope.showEdit = function(item) {
					//修改内容按钮
				};
				$scope.showRemove = function(item) {
					$scope.contentId = item.contentId;
					$('#deleteModal').modal('show');
				};
				//删除导航逻辑
				$scope.deleteContentBtn = function() {
					$http({
						url: config.api + '/content/delete',
						method: 'POST',
						withCredentials: true,
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded',
							'Accept': "*/*"
						},
						transformRequest: $.param,
						data: {
							contentId: $scope.contentId,
						}
					}).then(function(data) {
						if (data.data.status === 'ok') {
							new PNotify({
								type: 'danger',
								text: `删除成功`
							});
							$('#deleteModal').modal('hide');
							$('#contentIdTable').bootstrapTable('refresh');
						}
					});
				};
			}]
		}
	};
});