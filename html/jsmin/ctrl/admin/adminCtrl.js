"use strict";define(["angular","config","jquery","pnotify"],function(t,e,a,o){o.prototype.options.styling="bootstrap3";var n=function(){a(".load-cover").css({opacity:0}),setTimeout(function(){a(".load-cover").remove()},2e3)},i=function(t,i){var r=e.adminPages;e=e.config,t.config=e,t.title="管理主页-"+e.projectName,t.userName="",t.password="",t.adminPages=r,t.login=function(){i({url:e.api+"/login",method:"POST",withCredentials:!0,headers:{"Content-Type":"application/x-www-form-urlencoded",Accept:"*/*"},transformRequest:a.param,data:{userName:t.userName,passWord:t.password}}).then(function(t){var e=t.data;if("ok"===e.status)window.location.reload();else{var a;a="PassWord is not right!"==e.msg?"密码不正确！":"用户不存在！",new o({type:"error",text:a})}})},t.navList=[{title:"4",nav:["401","402","403"]},{title:"1",nav:["101","102"]},{title:"3",nav:["301","302"]},{title:"2",nav:["201","202"]}],i({url:e.api+"/login/status",method:"GET",withCredentials:!0}).then(function(e){var o=e.data;o.isLogin?(t.userName=o.userName,n()):a("#loginModal").modal({backdrop:"static",keyboard:!1})})};return["$scope","$http",i]});