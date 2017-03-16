/*global require*/
'use strict';

require.config({
	paths: {
		angular: '../assets/js/angular',
		jquery: '../assets/js/jquery',
		bootstrap: '../assets/js/bootstrap',
		swiper: '../assets/js/swiper-3.4.1.jquery.min',
		config:'./config'
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
		}
	}
	deps: [].concat(deps)
});