/*global define*/
'use strict';

/**
 * The main controller for the app. The controller:
 * - retrieves and persist the model via the todoStorage service
 * - exposes the model to the template and provides event handlers
 */

define(['angular'], function(angular) {
	var CtrlName = "userManageCtrl";
	return {
		"route": {
			"path": "userManage",
			"route": {
				url: '/userManage',
				// resolve: {},
				templateUrl: 'tpls/userManage.html',
				controller: CtrlName
			}
		},
		"ctrl": {
			"name": CtrlName,
			"fn": ['$scope','$http', function($scope,$http) {
				$scope.premission = null;
                $scope.canAddUser = true;//true的时候隐藏
                $scope.editUser = $scope.deleteNavBtn = false;
                //获取数据用的ajax
                $scope.ajaxRequest = function (params) {
                    // data you need
                    // console.log(JSON.stringify(params.data));
                    var getdata = $http({
                        url: config.api + '/user',
                        method: 'GET',
                        withCredentials: true,
                        params: params.data
                    });
                    if ($scope.premission === null) {
                        $http({
                            url: config.api + '/getPermission',
                            method: 'GET',
                            withCredentials: true,
                            params: {functionModel: 101}
                        }).then(function (data) {
                            $scope.premission = data.data;
                            for (let pms of $scope.premission) {
                                if (pms.permissionName === 'addUser') {
                                    $scope.canAddUser = false;
                                }
                                if (pms.permissionName === 'editUser') {
                                    $scope.editUser = true;
                                }
                                if (pms.permissionName === 'deleteUser') {
                                    $scope.deleteUser = true;
                                }
                            }
                            return getdata;
                        }).then(function (data) {
                            params.success(data.data);
                        });
                        ;
                    } else {
                        getdata.then(function (data) {
                            params.success(data.data);
                        });
                    }

                }
                $scope.tableCtrl = {
                    options: {
                        toolbar: "#toolbar",
                        ajax: $scope.ajaxRequest,
                        rowStyle: function (row, index) {
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
                            field: 'userName',
                            title: '用户名',
                            align: 'center',
                            valign: 'bottom',
                        }, {
                            field: 'email',
                            title: '邮箱',
                            align: 'center',
                            valign: 'middle',
                        }, {
                            field: 'nickName',
                            title: '昵称',
                            align: 'center',
                            valign: 'middle',
                        }, {
                            field: 'trueName',
                            title: '真实姓名',
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
                            formatter: opFormatter,
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
                    var editBtn = '';
                    var deleteBtn = '';
                    if ($scope.editUser) {
                        editBtn = '<a data-op=\'edit\' data-orderby=\'' + row.orderby + '\' data-url=\'' + row.url + '\' data-itemName=\'' + row.itemName + '\' data-itemId=\'' + row.itemId + '\' class=\'opBtn\' title=\'编辑用户\'><span class=\'glyphicon glyphicon-edit\'></span></a>';
                    }
                    if ($scope.deleteUser) {
                        deleteBtn = '<a data-op=\'delete\' data-orderby=\'' + row.orderby + '\' data-url=\'' + row.url + '\' data-itemName=\'' + row.itemName + '\' data-itemId=\'' + row.itemId + '\' class=\'opBtn\' title=\'删除用户\'><span class=\'glyphicon glyphicon-trash\'></span></a>';
                    }
                    return editBtn + deleteBtn;
                };
                $scope.showAdd = function () {
                    $scope.addOrEdit = 'add';
                    $('#addAndEditModal').modal('show');
                };
                $scope.showEdit = function (item) {
                    $scope.navId = item.itemId;
                    $scope.addOrEdit = 'edit';
                    $scope.navName = item.itemName;
                    $scope.navUrl = item.url;
                    $scope.navOrderBy = item.orderby;
                    $('#addAndEditModal').modal('show');
                };
                $scope.showRemove = function (item) {
                    $scope.navId = item.itemId;
                    $('#deleteModal').modal('show');
                };
			}]
		}
	};
});