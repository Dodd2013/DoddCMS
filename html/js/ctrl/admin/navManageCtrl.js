/*global define*/
'use strict';

/**
 * The main controller for the app. The controller:
 * - retrieves and persist the model via the todoStorage service
 * - exposes the model to the template and provides event handlers
 */

define(['angular', 'bootstrapTableNg', 'bootstrapTableCN', 'config', 'pnotify', 'jquery'], function (angular) {
    var CtrlName = "navManageCtrl";
    var config = require('config').config;
    var $ = require('jquery');
    var PNotify = require('pnotify');
    PNotify.prototype.options.styling = "bootstrap3";
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
                $scope.canAddNav = true; //true的时候隐藏
                $scope.editNavBar = $scope.deleteNavBtn = false;
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
                            url: config.api + '/getPermission',
                            method: 'GET',
                            withCredentials: true,
                            params: { functionModel: 201 }
                        }).then(function (data) {
                            $scope.premission = data.data;
                            var _iteratorNormalCompletion = true;
                            var _didIteratorError = false;
                            var _iteratorError = undefined;

                            try {
                                for (var _iterator = $scope.premission[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                                    var pms = _step.value;

                                    if (pms.permissionName === 'addNavBar') {
                                        $scope.canAddNav = false;
                                    }
                                    if (pms.permissionName === 'editNavBar') {
                                        $scope.editNavBar = true;
                                    }
                                    if (pms.permissionName === 'deleteNavBar') {
                                        $scope.deleteNavBar = true;
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
                    if ($scope.editNavBar) {
                        editBtn = '<a data-op=\'edit\' data-orderby=\'' + row.orderby + '\' data-url=\'' + row.url + '\' data-itemName=\'' + row.itemName + '\' data-itemId=\'' + row.itemId + '\' class=\'opBtn\' title=\'\u7F16\u8F91\u5BFC\u822A\'><span class=\'glyphicon glyphicon-edit\'></span></a>';
                    }
                    if ($scope.deleteNavBar) {
                        deleteBtn = '<a data-op=\'delete\' data-orderby=\'' + row.orderby + '\' data-url=\'' + row.url + '\' data-itemName=\'' + row.itemName + '\' data-itemId=\'' + row.itemId + '\' class=\'opBtn\' title=\'\u5220\u9664\u5BFC\u822A\'><span class=\'glyphicon glyphicon-trash\'></span></a>';
                    }
                    return editBtn + deleteBtn;
                };
                $scope.addOrEdit = 'add';
                $('#navTable').on('click', '.opBtn', function (e) {
                    var op = $(e.target).parent().attr('data-op');
                    var item = {
                        itemId: $(e.target).parent().attr('data-itemId'),
                        itemName: $(e.target).parent().attr('data-itemName'),
                        url: $(e.target).parent().attr('data-url'),
                        orderby: parseInt($(e.target).parent().attr('data-orderby'))
                    };
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
                //删除导航逻辑
                $scope.deleteNavBtn = function () {
                    $http({
                        url: config.api + '/navbar/delete',
                        method: 'POST',
                        withCredentials: true,
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'Accept': "*/*"
                        },
                        transformRequest: $.param,
                        data: {
                            itemId: $scope.navId
                        }
                    }).then(function (data) {
                        if (data.data.status === 'ok') {
                            new PNotify({
                                type: 'danger',
                                text: '\u5220\u9664\u6210\u529F'
                            });
                            $scope.navId = $scope.navName = $scope.navUrl = $scope.navOrderBy = '';
                            $('#deleteModal').modal('hide');
                            $('#navTable').bootstrapTable('refresh');
                        }
                    });
                };
                //添加导航逻辑
                $scope.addAndEditNavBtn = function () {
                    if ($scope.addOrEdit == 'edit') {
                        $http({
                            url: config.api + '/navbar/edit',
                            method: 'POST',
                            withCredentials: true,
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded',
                                'Accept': "*/*"
                            },
                            transformRequest: $.param,
                            data: {
                                itemId: $scope.navId,
                                itemName: $scope.navName,
                                url: $scope.navUrl,
                                orderby: $scope.navOrderBy
                            }
                        }).then(function (data) {
                            new PNotify({
                                type: 'info',
                                text: '\u4FEE\u6539\u6210\u529F'
                            });
                            $scope.navId = $scope.navName = $scope.navUrl = $scope.navOrderBy = '';
                            $('#addAndEditModal').modal('hide');
                            $('#navTable').bootstrapTable('refresh');
                        }, function (data) {
                            new PNotify({
                                type: 'error',
                                text: '\u4FEE\u6539\u5931\u8D25'
                            });
                        });
                    } else if ($scope.addOrEdit == 'add') {
                        $http({
                            url: config.api + '/navbar/add',
                            method: 'POST',
                            withCredentials: true,
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded',
                                'Accept': "*/*"
                            },
                            transformRequest: $.param,
                            data: {
                                itemName: $scope.navName,
                                url: $scope.navUrl,
                                orderby: $scope.navOrderBy
                            }
                        }).then(function (data) {
                            new PNotify({
                                type: 'info',
                                text: '\u6DFB\u52A0\u6210\u529F'
                            });
                            $scope.navName = $scope.navUrl = $scope.navOrderBy = '';
                            $('#addAndEditModal').modal('hide');
                            $('#navTable').bootstrapTable('refresh');
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