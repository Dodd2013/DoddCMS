'use strict';

define(['angular'], function (ng) {
	require(['ctrl/index/headCtrl', 'ctrl/common/navCtrl', 'ctrl/index/swiperCtrl'
	// 'directives/todoFocus', 
	// 'directives/todoEscape',
	// 'services/todoStorage'
	], function (headCtrl, navCtrl, swiperCtrl) {
		ng.module('index', []).config(function ($httpProvider) {
			$httpProvider.defaults.withCredentials = true;
		}).controller('headCtrl', headCtrl).controller('navCtrl', navCtrl).controller('swiperCtrl', swiperCtrl);
		ng.bootstrap(document, ['index']);
	});
});