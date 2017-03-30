/*global define*/
'use strict';

/**
 * The main controller for the app. The controller:
 * - retrieves and persist the model via the todoStorage service
 * - exposes the model to the template and provides event handlers
 */

define(['angular'], function(angular) {
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
			"fn": ['$scope', '$http', function($scope, $http) {
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
								params:{functionModel:401}
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
							field: 'contentTitle',
							title: '内容标题',
							align: 'center',
							valign: 'bottom'
						}, {
							field: 'simpleTitle',
							title: '简单标题',
							align: 'center',
							valign: 'middle'
						}, {
							field: 'contentDESC',
							title: '内容描述',
							align: 'left',
							valign: 'top'
						}, {
							field: 'contentType',
							title: '内容类型',
							align: 'left',
							valign: 'top'
						},{
							field: 'viewCount',
							title: '浏览量',
							align: 'left',
							valign: 'top',
							sortable: true
						}, {
							field: 'createdAt',
							title: '创建时间',
							align: 'left',
							valign: 'top',
							formatter: timeFormatter,
							sortable: true
						}, {
							field: 'updatedAt',
							title: '更新时间',
							align: 'left',
							valign: 'top',
							formatter: timeFormatter,
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

				function timeFormatter(value, row, index) {
					if (value == null) return '未知时间';
					var date = new Date(value);
					var localeString = date.toLocaleString();
					return localeString;
				};

				function opFormatter(value, row, index) {
					let editBtn = ''
					let deleteBtn = '';
					for (let pms of $scope.premission) {
						if (pms.permissionName === 'addNavBar') {
							$scope.canAddNav = false;
						}
						if (pms.permissionName === 'editNavBar') {
							editBtn = `<a data-op='edit' data-orderby='${row.orderby}' data-url='${row.url}' data-itemName='${row.itemName}' data-itemId='${row.itemId}' class='opBtn' title='编辑导航'><span class='glyphicon glyphicon-edit'></span></a>`
						}
						if (pms.permissionName === 'deleteNavBar') {
							deleteBtn = `<a data-op='delete' data-orderby='${row.orderby}' data-url='${row.url}' data-itemName='${row.itemName}' data-itemId='${row.itemId}' class='opBtn' title='删除导航'><span class='glyphicon glyphicon-trash'></span></a>`
						}
					}
					return editBtn + deleteBtn;
				};
				$scope.addOrEdit = 'add';
				$('#navTable').on('click', '.opBtn', function(e) {
					let op = $(e.currentTarget).attr('data-op');
					let item = {
						contentId: $(e.currentTarget).attr('data-itemId'),
						contentTitle: $(e.currentTarget).attr('data-itemName'),
						url: $(e.currentTarget).attr('data-url'),
						orderby: parseInt($(e.currentTarget).attr('data-orderby'))
					};
					if (op === 'edit') {
						$scope.$apply(function() {
							$scope.showEdit(item);
						});

					} else if (op === 'delete') {
						$scope.$apply(function() {
							$scope.showRemove(item);
						});
					}
				});
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