"use strict";define(["angular","bootstrapTable","bootstrapTableNg","bootstrapTableCN","config","pnotify","jquery"],function(t){var e=require("config").config,n=(require("jquery"),require("pnotify"));return n.prototype.options.styling="bootstrap3",["$scope","$http",function(t,n){function o(t){var e=new RegExp("(^|&)"+t+"=([^&]*)(&|$)"),n=window.location.search.substr(1).match(e);return null!=n?unescape(n[2]):null}function a(t,e,n){return'<a href="/content/?contentId='+e.contentId+'">'+t+"</a>"}function i(t,e,n){if(null==t)return"未知时间";var o=new Date(t),a=o.toLocaleString();return a}n({url:e.api+"/column/getColumnNameByColumnID",method:"GET",withCredentials:!0,params:{columnId:o("columnId")}}).then(function(e){t.columnName=e.data.columnName}),t.ajaxRequest=function(t){n({url:e.api+"/column/getContentListByColumnID",method:"GET",withCredentials:!0,params:{columnId:o("columnId"),params:t.data}}).then(function(e){t.success(e.data)})},t.tableCtrl={options:{toolbar:"#toolbar",ajax:t.ajaxRequest,rowStyle:function(t,e){return{classes:"none"}},sidePagination:"server",cache:!1,height:500,striped:!0,pagination:!0,pageSize:10,pageList:[5,10,25,50,100,200],search:!0,showColumns:!0,showRefresh:!0,minimumCountColumns:2,clickToSelect:!1,maintainSelected:!0,columns:[{field:"contentId",title:"内容ID",align:"center",valign:"bottom",visible:!1},{field:"simpleTitle",title:"内容标题",align:"center",valign:"middle",formatter:a,width:"70%"},{field:"viewCount",title:"浏览量",align:"left",valign:"top",sortable:!0},{field:"updatedAt",title:"更新时间",align:"left",valign:"top",formatter:i,sortable:!0}]}}}]});