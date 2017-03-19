/*global require*/
'use strict';

require.config({
	paths: {
		angular: '../assets/js/angular',
		route: '../assets/js/ui-router',
		jquery: '../assets/js/jquery',
		bootstrap: '../assets/js/bootstrap',
		swiper: '../assets/js/swiper-3.4.1.jquery.min',
		pnotify: '../assets/js/pnotify.min',
		bootstrapTable: '../assets/bs-table/bootstrap-table.min',
		bootstrapTableNg: '../assets/bs-table/extensions/angular/bootstrap-table-angular.min',
		config: './config'
	},
	shim: {
		jquery: {
			exports: 'jquery'
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
		}
	},
	deps: [].concat(deps)
});