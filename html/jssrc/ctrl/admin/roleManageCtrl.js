/*global define*/
'use strict';

/**
 * The main controller for the app. The controller:
 * - retrieves and persist the model via the todoStorage service
 * - exposes the model to the template and provides event handlers
 */

define(['angular','bootstrapTableNg', 'bootstrapTableCN', 'config', 'pnotify', 'jquery'], function (angular) {
	var CtrlName = "roleManageCtrl";
	var config = require('config').config;
    var $ = require('jquery');
    var PNotify = require('pnotify');
    PNotify.prototype.options.styling = "bootstrap3";
	return {
		"route": {
			"path": "roleManage",
			"route": {
				url: '/roleManage',
				// resolve: {},
				templateUrl: 'tpls/roleManage.html',
				controller: CtrlName
			}
		},
		"ctrl": {
			"name": CtrlName,
			"fn": ['$scope','$http','$state', function ($scope, $http,$state){
				$scope.premission = null;
                $scope.canAddRole = true; //true的时候隐藏
                $scope.editRole = $scope.deleteRoleBtn = false;
                //获取数据用的ajax
                $scope.ajaxRequest = function (params) {
                    // data you need
                    // console.log(JSON.stringify(params.data));
                    var getdata = $http({
                        url: config.api + '/role',
                        method: 'GET',
                        withCredentials: true,
                        params: params.data
                    });
                    if ($scope.premission === null) {
                        $http({
                            url: config.api + '/getPermission',
                            method: 'GET',
                            withCredentials: true,
                            params: { functionModel: 301 }
                        }).then(function (data) {
                            $scope.premission = data.data;
                            for (let pms of $scope.premission) {
                                if (pms.permissionName === 'addRole') {
                                    $scope.canAddRole = false;
                                }
                                if (pms.permissionName === 'editRole') {
                                    $scope.editRole = true;
                                }
                                if (pms.permissionName === 'deleteRole') {
                                    $scope.deleteRole = true;
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
                            field: 'roleId',
                            title: '角色ID',
                            align: 'center',
                            valign: 'bottom',
                            sortable: true
                        }, {
                            field: 'roleName',
                            title: '角色名称',
                            align: 'center',
                            valign: 'middle'
                        }, {
                            field: 'DESC',
                            title: '描述',
                            align: 'center',
                            valign: 'middle'
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
                    var editRolePermission='';
                    if ($scope.editRole) {
                        editBtn = '<a data-op=\'edit\' data-DESC=\'' + row.DESC + '\' data-roleName=\'' + row.roleName + '\' data-roleId=\'' + row.roleId + '\' class=\'opBtn\' title=\'\u7F16\u8F91\u5BFC\u822A\'><span class=\'glyphicon glyphicon-edit\'></span></a>';
                    }
                    if ($scope.deleteRole) {
                        deleteBtn = '<a data-op=\'delete\' data-DESC=\'' + row.DESC + '\' data-roleName=\'' + row.roleName + '\' data-roleId=\'' + row.roleId + '\' class=\'opBtn\' title=\'\u5220\u9664\u5BFC\u822A\'><span class=\'glyphicon glyphicon-trash\'></span></a>';
                    }
                    if (true) {//$scope.editUserRole
                        editRolePermission = '<a data-op=\'editRolePermission\' data-DESC=\'' + row.DESC + '\' data-roleName=\'' + row.roleName + '\' data-roleId=\'' + row.roleId + '\' class=\'opBtn\' title=\'分配权限\'><span class=\'glyphicon glyphicon-plus\'></span></a>';
                    }
                    return editBtn + deleteBtn+editRolePermission;
                };
                $scope.addOrEdit = 'add';
                $('#roleTable').on('click', '.opBtn', function (e) {
                    var op = $(e.target).parent().attr('data-op');
                    var role = {
                        roleId: $(e.target).parent().attr('data-roleId'),
                        roleName: $(e.target).parent().attr('data-roleName'),
                        DESC: $(e.target).parent().attr('data-DESC')
                    };
                    if (op === 'edit') {
                        $scope.$apply(function () {
                            $scope.showEdit(role);
                        });
                    } else if (op === 'delete') {
                        $scope.$apply(function () {
                            $scope.showRemove(role);
                        });
                    }else if(op==='editRolePermission'){
                        $state.go("rolePermissionManage",{role:role})
                    }
                });
                $scope.showAdd = function () {
                    $scope.addOrEdit = 'add';
                    $('#addAndEditModal').modal('show');
                };
                $scope.showEdit = function (item) {

                    $scope.roleId = item.roleId;
                    $scope.addOrEdit = 'edit';
                    $scope.roleName = item.roleName;
                    $scope.DESC = item.DESC;
                    $('#addAndEditModal').modal('show');
                };
                $scope.showRemove = function (item) {
                    $scope.roleId = item.roleId;
                    $('#deleteModal').modal('show');
                };
                //删除导航逻辑
                $scope.deleteRoleBtn = function () {
                    $http({
                        url: config.api + '/role/delete',
                        method: 'POST',
                        withCredentials: true,
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'Accept': "*/*"
                        },
                        transformRequest: $.param,
                        data: {
                            roleId: $scope.roleId
                        }
                    }).then(function (data) {
                        if (data.data.status === 'ok') {
                            new PNotify({
                                type: 'danger',
                                text: '\u5220\u9664\u6210\u529F'
                            });
                            $scope.roleId = $scope.roleName = $scope.DESC = '';
                            $('#deleteModal').modal('hide');
                            $('#roleTable').bootstrapTable('refresh');
                        }
                    });
                };
                //添加导航逻辑
                $scope.addAndEditRoleBtn = function () {
                    if ($scope.addOrEdit == 'edit') {
                        $http({
                            url: config.api + '/role/edit',
                            method: 'POST',
                            withCredentials: true,
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded',
                                'Accept': "*/*"
                            },
                            transformRequest: $.param,
                            data: {
                                roleId: $scope.roleId,
                                roleName: $scope.roleName,
                                DESC: $scope.DESC
                            }
                        }).then(function (data) {
                            new PNotify({
                                type: 'info',
                                text: '\u4FEE\u6539\u6210\u529F'
                            });
                           $scope.roleId = $scope.roleName = $scope.DESC = '';
                            $('#addAndEditModal').modal('hide');
                            $('#roleTable').bootstrapTable('refresh');
                        }, function (data) {
                            new PNotify({
                                type: 'error',
                                text: '\u4FEE\u6539\u5931\u8D25'
                            });
                        });
                    } else if ($scope.addOrEdit == 'add') {
                        $http({
                            url: config.api + '/role/add',
                            method: 'POST',
                            withCredentials: true,
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded',
                                'Accept': "*/*"
                            },
                            transformRequest: $.param,
                            data: {
                                roleName: $scope.roleName,
                                DESC: $scope.DESC
                            }
                        }).then(function (data) {
                            new PNotify({
                                type: 'info',
                                text: '\u6DFB\u52A0\u6210\u529F'
                            });
                            $scope.roleId = $scope.roleName = $scope.DESC = '';
                            $('#addAndEditModal').modal('hide');
                            $('#roleTable').bootstrapTable('refresh');
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