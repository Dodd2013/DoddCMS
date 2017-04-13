/*global define*/
'use strict';

/**
 * The main controller for the app. The controller:
 * - retrieves and persist the model via the todoStorage service
 * - exposes the model to the template and provides event handlers
 */

define(['angular', 'bootstrapTable', 'bootstrapTableNg', 'bootstrapTableCN', 'config', 'pnotify', 'jquery'], function (angular) {
	var config = require('config').config;
	var $ = require('jquery');
	var PNotify = require('pnotify');
	PNotify.prototype.options.styling = "bootstrap3";
	return ['$scope', '$http', function ($scope, $http) {
		function GetQueryString(name) {
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
			var r = window.location.search.substr(1).match(reg);
			if (r != null) return decodeURIComponent(r[2]);
			return null;
		}
		$http({
			url: config.api + '/column/getColumnNameByColumnID',
			method: 'GET',
			withCredentials: true,
			params: {
				columnId: GetQueryString('columnId')
			}
		}).then(function (data) {
			$scope.columnName = data.data.columnName;
		});
		// $scope.premission = null;
		// $scope.canAddNav = true;
		//获取数据用的ajax
		$scope.ajaxRequest = function (params) {
			$http({
				url: config.api + '/column/getContentListByColumnID',
				method: 'GET',
				withCredentials: true,
				params: {
					columnId: GetQueryString('columnId'),
					params: params.data
				}
			}).then(function (data) {
				params.success(data.data);
			});
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
					field: 'contentId',
					title: '内容ID',
					align: 'center',
					valign: 'middle',
					visible: false
				}, {
					field: 'simpleTitle',
					title: '内容标题',
					align: 'center',
					valign: 'middle',
					formatter: urlFormatter,
					width: '70%'
				}, {
					field: 'viewCount',
					title: '浏览量',
					align: 'center',
					valign: 'middle',
					sortable: true
				}, {
					field: 'updatedAt',
					title: '更新时间',
					align: 'center',
					valign: 'middle',
					formatter: timeFormatter,
					sortable: true
				}]
			}
		};

		function urlFormatter(value, row, index) {
			return '<a href="/content/?contentId=' + row.contentId + '">' + value + '</a>';
		}

		function timeFormatter(value, row, index) {
			if (value == null) return '未知时间';
			var date = new Date(value);
			var localeString = date.toLocaleString();
			return localeString;
		};
	}];
});