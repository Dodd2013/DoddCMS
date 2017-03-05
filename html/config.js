var config = {
	"projectName": "DoddCMS",
	"api": "http://localhost:3008"
}
$.ajaxSetup({
	xhrFields: {
		withCredentials: true//全局跨域session
	}
});
PNotify.prototype.options.styling = "bootstrap3";//"fontawesome";