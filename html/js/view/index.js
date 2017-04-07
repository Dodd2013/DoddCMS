'use strict';

define(function (require, module, exports) {
	var ng = require('angular');
	var headCtrl = require('ctrl/index/headCtrl');
	var navCtrl = require('ctrl/common/navCtrl');
	var swiperCtrl = require('ctrl/index/swiperCtrl');
	var indexColumnCtrl = require('ctrl/index/indexColumnCtrl');
	ng.module('index', []).config(function ($httpProvider) {
		$httpProvider.defaults.withCredentials = true;
	}).controller('headCtrl', headCtrl).controller('navCtrl', navCtrl).controller('swiperCtrl', swiperCtrl).controller('indexColumnCtrl', indexColumnCtrl);
	ng.bootstrap(document, ['index']);
});