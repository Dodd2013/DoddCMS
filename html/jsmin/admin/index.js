"use strict";!function(){var e=function(){$(".load-cover").css({opacity:0}),setTimeout(function(){$(".load-cover").remove()},2e3)},l=angular.module("admin",["ui.router"]);l.controller("adminCtrl",function(e,l){e.config=config,e.title="管理主页-"+config.projectName,e.userName="",e.password="",e.adminPages=adminPages,e.navList=[{title:"1",nav:["101","102"]},{title:"2",nav:["201","202","203"]},{title:"3",nav:["301","302"]},{title:"4",nav:["401","402","403"]}]}),l.controller("userManageCtrl",function(e,l){}),l.controller("userRoleManageCtrl",function(e,l){}),l.controller("navManageCtrl",function(e,l){}),l.controller("adManageCtrl",function(e,l){}),l.controller("dbManageCtrl",function(e,l){}),l.controller("rolePermissionManageCtrl",function(e,l){}),l.controller("roleManageCtrl",function(e,l){}),l.controller("columnManageCtrl",function(e,l){}),l.controller("publishCtrl",function(e,l){}),l.controller("contentManageCtrl",function(e,l){}),l.config(["$stateProvider","$urlRouterProvider",function(e,l){e.state("index",{url:"/",resolve:{},templateUrl:"tpls/hello.html"}).state("userManage",{url:"/userManage",resolve:{},templateUrl:"tpls/userManage.html",controller:"userManageCtrl"}).state("userRoleManage",{url:"/userRoleManage",resolve:{},templateUrl:"tpls/userRoleManage.html",controller:"userRoleManageCtrl"}).state("navManage",{url:"/navManage",resolve:{},templateUrl:"tpls/navManage.html",controller:"navManageCtrl"}).state("adManage",{url:"/adManage",resolve:{},templateUrl:"tpls/adManage.html",controller:"adManageCtrl"}).state("dbManage",{url:"/dbManage",resolve:{},templateUrl:"tpls/dbManage.html",controller:"dbManageCtrl"}).state("roleManage",{url:"/roleManage",resolve:{},templateUrl:"tpls/roleManage.html",controller:"roleManageCtrl"}).state("rolePermissionManage",{url:"/rolePermissionManage",resolve:{},templateUrl:"tpls/rolePermissionManage.html",controller:"rolePermissionManageCtrl"}).state("columnManage",{url:"/columnManage",resolve:{},templateUrl:"tpls/columnManage.html",controller:"columnManageCtrl"}).state("publish",{url:"/publish",resolve:{},templateUrl:"tpls/publish.html",controller:"publishCtrl"}).state("contentManage",{url:"/contentManage",resolve:{},templateUrl:"tpls/contentManage.html",controller:"contentManageCtrl"}),l.otherwise("/")}]),$("#loginSubmit").on("click","",function(e){var l=$("html").scope();$.ajax({url:config.api+"/login",type:"POST",dataType:"json",data:{userName:l.userName,passWord:l.password}}).success(function(e){if("ok"===e.status)window.location.reload();else{var l;l="PassWord is not right!"==e.msg?"密码不正确！":"用户不存在！",new PNotify({type:"error",text:l})}})}),$(".sidebar").on("click",".nav-model .nav-model-header",function(e){$(e.target).parent(".nav-model").toggleClass("active")}),$.ajax({url:config.api+"/login/status",type:"GET",dataType:"json",data:{}}).success(function(l){var t=$("html").scope();l.isLogin?(t.$apply(function(){t.userName=l.userName}),e()):$("#loginModal").modal({backdrop:"static",keyboard:!1})})}();