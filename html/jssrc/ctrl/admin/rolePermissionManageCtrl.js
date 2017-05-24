/*global define*/
'use strict';

/**
 * The main controller for the app. The controller:
 * - retrieves and persist the model via the todoStorage service
 * - exposes the model to the template and provides event handlers
 */

define(['angular','pnotify'], function(angular,PNotify) {
    PNotify.prototype.options.styling = "bootstrap3";
	var CtrlName = "rolePermissionManageCtrl";
	return {
		"route": {
			"path": "rolePermissionManage",
			"route": {
				url: '/rolePermissionManage',
				// resolve: {},
				templateUrl: 'tpls/rolePermissionManage.html',
				controller: CtrlName,
				params:{'role':{}}
			}
		},
		"ctrl": {
			"name": CtrlName,
			"fn": ['$scope','$state','$stateParams','$http', function($scope,$state,$stateParams,$http) {
				var role=$stateParams.role;
				if(!role.roleName){
					$scope.role=false;
				}else{
					$scope.role=role;
				}$scope.premission = null;
                $scope.canAddRolePermission = true; //true的时候隐藏
                $scope.deleteRolePermissionBtn = false;
                //获取数据用的ajax
                $scope.ajaxRequest = function (params) {
                    // data you need
                    // console.log(JSON.stringify(params.data));
                    var getdata = $http({
                        url: config.api + '/rolePermission',
                        method: 'GET',
                        withCredentials: true,
                        params: {params:params.data,roleId:$scope.role.roleId}
                    });
                    var getpermission = $http({
                        url: config.api + '/getPermission',
                        method: 'GET',
                        withCredentials: true,
                    }).then(function(data) {
                    	$scope.permissionList=data.data;
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
                                if (pms.permissionName === 'addRolePermission') {
                                    $scope.canAddRolePermission = false;
                                }
                                if (pms.permissionName === 'deleteRolePermission') {
                                    $scope.deleteRolePermission = true;
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
                        sidePagination: 'client',
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
                            field: 'permissionId',
                            title: '权限ID',
                            align: 'center',
                            valign: 'bottom',
                            sortable: true
                        }, {
                            field: 'actionUrl',
                            title: 'API地址',
                            align: 'center',
                            valign: 'middle'
                        },{
                            field: 'method',
                            title: '方法',
                            align: 'center',
                            valign: 'middle'
                        },{
                            field: 'permissionName',
                            title: '权限名',
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
                    if ($scope.deleteRolePermission) {
                        deleteBtn = '<a data-op=\'delete\' data-DESC=\'' + row.DESC + '\' data-permissionId=\'' + row.permissionId + '\' class=\'opBtn\' title=\'删除用户角色\'><span class=\'glyphicon glyphicon-trash\'></span></a>';
                    }
                    return editBtn + deleteBtn;
                };
                $scope.addOrEdit = 'add';
                $('#RolePermissionTable').on('click', '.opBtn', function (e) {
                    var op = $(e.target).parent().attr('data-op');
                    var permission = {
                        permissionId: $(e.target).parent().attr('data-permissionId'),
                        DESC: $(e.target).parent().attr('data-DESC')
                    };
					if (op === 'delete') {
						
                        $scope.$apply(function () {
                            $scope.showRemove(permission);
                        });
                    }
                });
                $scope.showAdd = function () {
                    $scope.addOrEdit = 'add';
                    $('#addAndEditModal').modal('show');
                };
                $scope.showRemove = function (item) {
                	
                    $scope.permissionId = item.permissionId;
                    $('#deleteModal').modal('show');
                };
                //删除导航逻辑
                $scope.deleteRolePermissionBtn = function () {
                    $http({
                        url: config.api + '/rolePermission/delete',
                        method: 'POST',
                        withCredentials: true,
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'Accept': "*/*"
                        },
                        transformRequest: $.param,
                        data: {
                            roleId: $scope.role.roleId,
                            permissionId:$scope.permissionId
                        }
                    }).then(function (data) {
                        if (data.data.status === 'ok') {
                            new PNotify({
                                type: 'danger',
                                text: '\u5220\u9664\u6210\u529F'
                            });
                            $scope.roleId = $scope.roleName = $scope.DESC = '';
                            $('#deleteModal').modal('hide');
                            $('#RolePermissionTable').bootstrapTable('refresh');
                        }
                        if (data.data.status === 'no') {
                            new PNotify({
                                type: 'danger',
                                text: '删除失败！'
                            });
                            $scope.roleId = $scope.roleName = $scope.DESC = '';
                            $('#deleteModal').modal('hide');
                            $('#RolePermissionTable').bootstrapTable('refresh');
                        }
                    });
                };
                $scope.datax={};
                //添加导航逻辑
                $scope.addAndEditRoleBtn = function () {
					if ($scope.addOrEdit == 'add') {
                        $http({
                            url: config.api + '/rolePermission/add',
                            method: 'POST',
                            withCredentials: true,
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded',
                                'Accept': "*/*"
                            },
                            transformRequest: $.param,
                            data: {
                                permissionId: $scope.datax.selectRole.permissionId,
                                roleId:$scope.role.roleId
                            }
                        }).then(function (data) {
                            new PNotify({
                                type: 'info',
                                text: '\u6DFB\u52A0\u6210\u529F'
                            });
                            $scope.roleId = $scope.roleName = $scope.DESC = '';
                            $('#addAndEditModal').modal('hide');
                            $('#RolePermissionTable').bootstrapTable('refresh');
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