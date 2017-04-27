/*global define*/
'use strict';

/**
 * The main controller for the app. The controller:
 * - retrieves and persist the model via the todoStorage service
 * - exposes the model to the template and provides event handlers
 */

define(['angular', 'pnotify'], function (angular) {
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
            "fn": ['$scope', '$http', function ($scope, $http) {
                $scope.premission = null;
                $scope.canAddUser = true; //true的时候隐藏
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
                            params: {
                                functionModel: 101
                            }
                        }).then(function (data) {
                            $scope.premission = data.data;
                            var _iteratorNormalCompletion = true;
                            var _didIteratorError = false;
                            var _iteratorError = undefined;

                            try {
                                for (var _iterator = $scope.premission[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                                    var pms = _step.value;

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
                        uniqueId: 'userName',
                        columns: [{
                            field: 'userName',
                            title: '用户名',
                            align: 'center',
                            valign: 'bottom'
                        }, {
                            field: 'email',
                            title: '邮箱',
                            align: 'center',
                            valign: 'middle'
                        }, {
                            field: 'nickName',
                            title: '昵称',
                            align: 'center',
                            valign: 'middle'
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
                    if ($scope.editUser) {
                        editBtn = '<a data-op="edit" data-userName="' + row.userName + '"  class="opBtn" title="\u7F16\u8F91\u7528\u6237"><span class="glyphicon glyphicon-edit"></span></a>';
                    }
                    if ($scope.deleteUser) {
                        deleteBtn = '<a data-op="delete" data-userName="' + row.userName + '" class="opBtn" title="\u5220\u9664\u7528\u6237"><span class="glyphicon glyphicon-trash"></span></a>';
                    }
                    return editBtn + deleteBtn;
                };
                $scope.addOrEdit = 'add';
                $scope.addOrEditBool = false; //add
                $('#userTable').on('click', '.opBtn', function (e) {
                    var op = $(e.target).parent().attr('data-op');
                    var item = $('#userTable').bootstrapTable('getRowByUniqueId', $(e.currentTarget).attr('data-userName'));
                    if (op === 'edit') {
                        $scope.$apply(function () {
                            $scope.showEdit(item);
                        });
                    } else if (op === 'delete') {
                        $scope.$apply(function () {
                            $scope.showRemove(item);
                        });
                    }
                });
                $scope.showAdd = function () {
                    $scope.addOrEdit = 'add';
                    $scope.addOrEditBool = false;
                    $scope.userName = $scope.email = $scope.passWord = $scope.nickName = $scope.trueName = '';
                    $('#addAndEditModal').modal('show');
                };
                $scope.showEdit = function (item) {
                    $scope.userName = item.userName;
                    $scope.addOrEdit = 'edit';
                    $scope.addOrEditBool = true;
                    $scope.email = item.email;
                    $scope.passWord = '';
                    $scope.nickName = item.nickName;
                    $scope.trueName = item.trueName;
                    $('#addAndEditModal').modal('show');
                };
                $scope.showRemove = function (item) {
                    $scope.userName = item.userName;
                    $('#deleteModal').modal('show');
                };
                //删除导航逻辑
                $scope.deleteNavBtn = function () {
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
                            userName: $scope.userName
                        }
                    }).then(function (data) {
                        if (data.data.status === 'ok') {
                            new PNotify({
                                type: 'danger',
                                text: '\u5220\u9664\u6210\u529F'
                            });
                            $scope.userName = $scope.email = $scope.passWord = $scope.nickName = $scope.trueName = '';
                            $('#deleteModal').modal('hide');
                            $('#userTable').bootstrapTable('refresh');
                        }
                    });
                };
                //添加导航逻辑
                $scope.addAndEditNavBtn = function () {
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
                        }).then(function (data) {
                            new PNotify({
                                type: 'info',
                                text: '\u4FEE\u6539\u6210\u529F'
                            });
                            $scope.userName = $scope.email = $scope.passWord = $scope.nickName = $scope.trueName = '';
                            $('#addAndEditModal').modal('hide');
                            $('#userTable').bootstrapTable('refresh');
                        }, function (data) {
                            new PNotify({
                                type: 'error',
                                text: '\u4FEE\u6539\u5931\u8D25'
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
                        }).then(function (data) {
                            new PNotify({
                                type: 'info',
                                text: '\u6DFB\u52A0\u6210\u529F'
                            });
                            $scope.userName = $scope.email = $scope.passWord = $scope.nickName = $scope.trueName = '';
                            $('#addAndEditModal').modal('hide');
                            $('#userTable').bootstrapTable('refresh');
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