/*global require*/
'use strict';

define(['jquery', 'bootstrap'], function($) {
	if (typeof($) != "undefined") {
		$.ajaxSetup({
			xhrFields: {
				withCredentials: true //全局跨域session
			}
		});
	}
	if (typeof(PNotify) != "undefined") {
		PNotify.prototype.options.styling = "bootstrap3"; //"fontawesome";}
	}
});