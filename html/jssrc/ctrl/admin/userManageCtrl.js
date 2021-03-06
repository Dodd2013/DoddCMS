/*global define*/
'use strict';

/**
 * The main controller for the app. The controller:
 * - retrieves and persist the model via the todoStorage service
 * - exposes the model to the template and provides event handlers
 */

define(['angular', 'pnotify'], function(angular) {
    var PNotify = require('pnotify');
    PNotify.prototype.options.styling = "bootstrap3";
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
            "fn": ['$scope', '$http','$state', function($scope, $http,$state) {
                $scope.premission = null;
                $scope.canAddUser = true; //true的时候隐藏
                $scope.editUser = $scope.deleteNavBtn = $scope.editUserRole = false;
                //获取数据用的ajax
                $scope.ajaxRequest = function(params) {
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
                            params: {
                                functionModel: 101
                            }
                        }).then(function(data) {
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
                                if (pms.permissionName === 'editUserRole') {
                                    $scope.editUserRole = true;
                                }
                            }
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
                        uniqueId: 'userName',
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
                    var editUserRole='';
                    if ($scope.editUser) {
                        editBtn = `<a data-op="edit" data-userName="${row.userName}"  class="opBtn" title="编辑用户"><span class="glyphicon glyphicon-edit"></span></a>`;
                    }
                    if ($scope.deleteUser) {
                        deleteBtn = `<a data-op="delete" data-userName="${row.userName}" class="opBtn" title="删除用户"><span class="glyphicon glyphicon-trash"></span></a>`;
                    }
                    if (true) {//$scope.editUserRole
                        editUserRole = `<a data-op="editUserRole" data-userName="${row.userName}" class="opBtn" title="分配角色"><span class="glyphicon glyphicon-plus"></span></a>`;
                    }
                    return editBtn + deleteBtn + editUserRole;
                };
                $scope.addOrEdit = 'add';
                $scope.addOrEditBool = false; //add
                $('#userTable').on('click', '.opBtn', function(e) {
                    let op = $(e.target).parent().attr('data-op');
                    let item = $('#userTable').bootstrapTable('getRowByUniqueId', $(e.currentTarget).attr('data-userName'));
                    if (op === 'edit') {
                        $scope.$apply(function() {
                            $scope.showEdit(item);
                        });

                    } else if (op === 'delete') {
                        $scope.$apply(function() {
                            $scope.showRemove(item);
                        });
                    }else if (op === 'editUserRole') {
                        $state.go("userRoleManage",{'userName':item.userName});
                    }
                });
                $scope.showAdd = function() {
                    $scope.addOrEdit = 'add';
                    $scope.addOrEditBool = false;
                    $scope.userName = $scope.email = $scope.passWord = $scope.nickName = $scope.trueName = '';
                    $('#addAndEditModal').modal('show');
                };
                $scope.showEdit = function(item) {
                    $scope.userName = item.userName;
                    $scope.addOrEdit = 'edit';
                    $scope.addOrEditBool = true;
                    $scope.email = item.email;
                    $scope.passWord = '';
                    $scope.nickName = item.nickName;
                    $scope.trueName = item.trueName;
                    $('#addAndEditModal').modal('show');
                };
                $scope.showRemove = function(item) {
                    $scope.userName = item.userName;
                    $('#deleteModal').modal('show');
                };
                //删除导航逻辑
                $scope.deleteNavBtn = function() {
                    $http({
                        url: config.api + '/user/delete',
                        method: 'POST',
                        withCredentials: true,
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'Accept': "*/*"
                        },
                        transformRequest: $.param,
                        data: {
                            userName: $scope.userName,
                        }
                    }).then(function(data) {
                        if (data.data.status === 'ok') {
                            new PNotify({
                                type: 'danger',
                                text: `删除成功`
                            });
                            $scope.userName = $scope.email = $scope.passWord = $scope.nickName = $scope.trueName = '';
                            $('#deleteModal').modal('hide');
                            $('#userTable').bootstrapTable('refresh');
                        }
                    });
                };
                //添加导航逻辑
                $scope.addAndEditNavBtn = function() {
                    if ($scope.addOrEdit == 'edit') {
                        $http({
                            url: config.api + '/user/edit',
                            method: 'POST',
                            withCredentials: true,
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded',
                                'Accept': "*/*"
                            },
                            transformRequest: $.param,
                            data: {
                                userName: $scope.userName,
                                email: $scope.email,
                                passWord: $scope.passWord,
                                nickName: $scope.nickName,
                                trueName: $scope.trueName
                            }
                        }).then(function(data) {
                            new PNotify({
                                type: 'info',
                                text: `修改成功`
                            });
                            $scope.userName = $scope.email = $scope.passWord = $scope.nickName = $scope.trueName = '';
                            $('#addAndEditModal').modal('hide');
                            $('#userTable').bootstrapTable('refresh');
                        }, function(data) {
                            new PNotify({
                                type: 'error',
                                text: `修改失败`
                            });
                        });
                    } else if ($scope.addOrEdit == 'add') {
                        $http({
                            url: config.api + '/user/add',
                            method: 'POST',
                            withCredentials: true,
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded',
                                'Accept': "*/*"
                            },
                            transformRequest: $.param,
                            data: {
                                userName: $scope.userName,
                                email: $scope.email,
                                passWord: $scope.passWord,
                                nickName: $scope.nickName,
                                trueName: $scope.trueName
                            }
                        }).then(function(data) {
                            new PNotify({
                                type: 'info',
                                text: `添加成功`
                            });
                            $scope.userName = $scope.email = $scope.passWord = $scope.nickName = $scope.trueName = '';
                            $('#addAndEditModal').modal('hide');
                            $('#userTable').bootstrapTable('refresh');
                        }, function(data) {
                            new PNotify({
                                type: 'error',
                                text: `添加失败`
                            });
                        });
                    }
                };
            }]
        }
    };
});