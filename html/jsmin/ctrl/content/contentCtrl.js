"use strict";define(function(n,t,e){function c(n){var t=new RegExp("(^|&)"+n+"=([^&]*)(&|$)"),e=window.location.search.substr(1).match(t);return null!=e?unescape(e[2]):null}var o=n("config");return["$scope","$http",function(n,t){t({url:o.config.api+"/content/getById",method:"GET",xhrFields:{withCredentials:!0},params:{contentId:c("contentId")}}).then(function(t){n.content=t.data},function(n){}),n.config=o.config}]});