"use strict";define(function(r,t,a){var e=r("angular"),n=r("jquery"),o=(r("config").config,r("config").adminPages,r("bootstrap"),r("route"),"ctrl/admin/"),l=["settingCtrl","indexCtrl","userManageCtrl","navManageCtrl","adManageCtrl","dbManageCtrl","roleManageCtrl","rolePermissionManageCtrl","columnManageCtrl","publishCtrl","contentManageCtrl","userRoleManageCtrl"],i=[];r("bootstrapTableNg");n(".sidebar").on("click",".nav-model .nav-model-header",function(r){n(r.target).parent(".nav-model").toggleClass("active")});for(var u in l)l[u]=o+l[u];r(["require","ctrl/admin/adminCtrl"].concat(l),function(){var t=!0,a=!1,n=void 0;try{for(var o,u=l[Symbol.iterator]();!(t=(o=u.next()).done);t=!0){var c=o.value;i.push(r(c))}}catch(d){a=!0,n=d}finally{try{!t&&u["return"]&&u["return"]()}finally{if(a)throw n}}var v=e.module("admin",["ui.router","bsTable"]),f=!0,g=!1,m=void 0;try{for(var s,y=i[Symbol.iterator]();!(f=(s=y.next()).done);f=!0){var C=s.value;v.controller(C.ctrl.name,C.ctrl.fn)}}catch(d){g=!0,m=d}finally{try{!f&&y["return"]&&y["return"]()}finally{if(g)throw m}}v.config(["$stateProvider","$urlRouterProvider",function(r,t){var a=!0,e=!1,n=void 0;try{for(var o,l=i[Symbol.iterator]();!(a=(o=l.next()).done);a=!0){var u=o.value;r.state(u.route.path,u.route.route)}}catch(c){e=!0,n=c}finally{try{!a&&l["return"]&&l["return"]()}finally{if(e)throw n}}t.otherwise("/")}]),v.controller("adminCtrl",r("ctrl/admin/adminCtrl")),e.bootstrap(document,["admin"])})});