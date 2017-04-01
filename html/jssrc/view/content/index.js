define(function(require, module, exports) {
	var ng = require('angular');
	var navCtrl = require('ctrl/common/navCtrl');
	var contentCtrl = require('ctrl/content/contentCtrl');
	ng.module('content', [])
		.config(function($httpProvider) {
			$httpProvider.defaults.withCredentials = true;
		})
		.controller('navCtrl', navCtrl)
		.controller('contentCtrl', contentCtrl)
		.filter('trustHtml', function($sce) {
			return function(input) {
				return $sce.trustAsHtml(input);
			}
		});
	ng.bootstrap(document, ['content']);
});