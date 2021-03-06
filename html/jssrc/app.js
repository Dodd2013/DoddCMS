/*global require*/
'use strict';
require.config({
	paths: {
		angular: '../assets/js/angular',
		ueditor_config: '../assets/ueditor/ueditor.config',
		ueditor: '../assets/ueditor/ueditor.all',
		zeroclipboard: '../assets/ueditor/third-party/zeroclipboard/ZeroClipboard.min',
		route: '../assets/js/ui-router',
		jquery: '../assets/js/jquery',
		jstree: '../assets/js/jstree/jstree.min',
		ngJsTree: '../assets/js/ngJsTree.min',
		bootstrap: '../assets/js/bootstrap',
		swiper: '../assets/js/swiper-3.4.1.jquery.min',
		pnotify: '../assets/js/pnotify.min',
		bootstrapTable: '../assets/bs-table/bootstrap-table.min',
		bootstrapTableNg: '../assets/bs-table/extensions/angular/bootstrap-table-angular.min',
		bootstrapTableCN: '../assets/bs-table/locale/bootstrap-table-zh-CN.min',
		config: './config'
	},
	shim: {
		jquery: {
			exports: 'jquery'
		},
		jstree: {
			deps: ['jquery'],
			exports: 'jstree'
		},
		ngJsTree: {
			deps:['jstree']
		},
		swiper: {
			deps: ['jquery']
		},
		bootstrap: {
			deps: ['jquery']
		},
		angular: {
			exports: 'angular'
		},
		route: {
			deps: ['angular']
		},
		bootstrapTable: {
			deps: ['bootstrap', 'jquery'],
			exports: "bootstrapTable"
		},
		bootstrapTableNg: {
			deps: ['bootstrapTable']
		},
		bootstrapTableCN: {
			deps: ['bootstrapTable']
		},
		ueditor_config: {
			deps: ['config'],
			exports: "ueditor_config"
		},
		ueditor: {
			deps: ['jquery', 'ueditor_config', 'zeroclipboard']
		}
	},
	deps: [].concat(deps)
});