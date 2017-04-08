define(function(require, module, exports) {
	var ng = require('angular');
	var bootstrapTB=require('bootstrapTable');
	var bootstrapTBNG=require('bootstrapTableNg');
	var bootstrapTBCN=require('bootstrapTableCN');
	var navCtrl = require('ctrl/common/navCtrl');
	var columnCtrl=require('ctrl/column/columnCtrl');
	ng.module('column', ['bsTable'])
		.config(function($httpProvider) {
			$httpProvider.defaults.withCredentials = true;
		})
		.controller('navCtrl', navCtrl)
		.controller('columnCtrl', columnCtrl);
	ng.bootstrap(document, ['column']);
});