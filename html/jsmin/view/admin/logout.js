"use strict";define(function(t,o,n){var e=t("config").config,i=(t("angular"),angular.module("logout",[]));i.controller("logoutCtrl",function(t,o){t.config=e,t.title="退出-"+e.projectName,o({url:e.api+"/logout",method:"GET",withCredentials:!0,headers:{Accept:"*/*"}}).then(function(t){alert("退出成功"),window.location.href="/"},function(t){alert("退出失败,请稍后再试！")})})});