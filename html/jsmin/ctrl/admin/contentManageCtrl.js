"use strict";define(["angular","pnotify","jquery","bootstrapTableNg","bootstrapTableCN"],function(t,e,n){e.prototype.options.styling="bootstrap3";var a="contentManageCtrl";return{route:{path:"contentManage",route:{url:"/contentManage",templateUrl:"tpls/contentManage.html",controller:a}},ctrl:{name:a,fn:["$scope","$http","$state",function(t,a,o){function i(t,e,n){return 1==t?"审核通过":0==t?"未审核":t==-1?"审核不通过":void 0}function l(t,e,n){return'<a href="/content/'+t+"\" target='_bank'>"+t+"</a>"}function s(t,e,n){if(null==t)return"未知时间";var a=new Date(t),o=a.toLocaleString();return o}function r(e,n,a){var o="",i="",l="",s=!0,r=!1,c=void 0;try{for(var d,p=t.premission[Symbol.iterator]();!(s=(d=p.next()).done);s=!0){var u=d.value;"passContent"===u.permissionName&&(l="<a data-op='pass' data-contentId='"+n.contentId+"' class='opBtn' title='审核通过'><span class='glyphicon glyphicon-ok-sign color-success'></span></a>"+("<a data-op='unpass' data-contentId='"+n.contentId+"' class='opBtn' title='未审核'><span class='glyphicon glyphicon-question-sign color-info'></span></a>")+("<a data-op='notpass' data-contentId='"+n.contentId+"' class='opBtn' title='审核不通过'><span class='glyphicon glyphicon-remove-sign color-danger'></span></a>")),"editContent"===u.permissionName&&(o="<a data-op='edit' data-contentId='"+n.contentId+"' class='opBtn' title='编辑内容'><span class='glyphicon glyphicon-edit'></span></a>"),"deleteContent"===u.permissionName&&(i="<a data-op='delete' data-contentId='"+n.contentId+"' class='opBtn' title='删除内容'><span class='glyphicon glyphicon-trash'></span></a>")}}catch(g){r=!0,c=g}finally{try{!s&&p["return"]&&p["return"]()}finally{if(r)throw c}}return l+o+i}t.premission=null,t.ajaxRequest=function(e){var n=a({url:config.api+"/content",method:"GET",withCredentials:!0,params:e.data});null===t.premission?a({url:config.api+"/getPermission",method:"GET",withCredentials:!0,params:{functionModel:402}}).then(function(e){return t.premission=e.data,n}).then(function(t){e.success(t.data)}):n.then(function(t){e.success(t.data)})},t.tableCtrl={options:{toolbar:"#toolbar",ajax:t.ajaxRequest,rowStyle:function(t,e){return{classes:"none"}},sidePagination:"server",cache:!1,height:500,striped:!0,pagination:!0,pageSize:10,pageList:[5,10,25,50,100,200],search:!0,showColumns:!0,showRefresh:!0,minimumCountColumns:2,clickToSelect:!1,maintainSelected:!0,columns:[{field:"contentId",title:"内容序号",align:"center",valign:"middle",formatter:l},{field:"contentTitle",title:"内容标题",align:"center",valign:"middle"},{field:"simpleTitle",title:"简单标题",align:"center",valign:"middle"},{field:"contentDESC",title:"内容描述",align:"center",valign:"middle"},{field:"contentType",title:"内容类型",align:"center",valign:"middle"},{field:"viewCount",title:"浏览量",align:"center",valign:"middle",sortable:!0},{field:"createdAt",title:"创建时间",align:"center",valign:"middle",formatter:s,sortable:!0},{field:"updatedAt",title:"更新时间",align:"center",valign:"middle",formatter:s,sortable:!0},{field:"state",title:"审核状态",align:"center",valign:"middle",formatter:i,sortable:!0},{field:"op",title:"操作",align:"center",valign:"middle",clickToSelect:!1,formatter:r}]}},n("#contentTable").on("click",".opBtn",function(e){var a=n(e.currentTarget).attr("data-op"),i=n(e.currentTarget).attr("data-contentId");"edit"===a?o.go("publish",{contentId:i}):"delete"===a?t.$apply(function(){t.showRemove(item)}):"pass"!==a&&"unpass"!==a&&"notpass"!==a||t.pass(a,i)}),t.pass=function(t,o){a({url:config.api+"/content/pass",method:"GET",withCredentials:!0,headers:{Accept:"*/*"},params:{contentId:o,op:t}}).then(function(t){new e({type:"success",text:"修改审核状态成功"}),n("#contentTable").bootstrapTable("refresh")})},t.showEdit=function(t){},t.showRemove=function(e){t.contentId=e.contentId,n("#deleteModal").modal("show")},t.deleteContentBtn=function(){a({url:config.api+"/content/delete",method:"POST",withCredentials:!0,headers:{"Content-Type":"application/x-www-form-urlencoded",Accept:"*/*"},transformRequest:n.param,data:{contentId:t.contentId}}).then(function(t){"ok"===t.data.status&&(new e({type:"danger",text:"删除成功"}),n("#deleteModal").modal("hide"),n("#contentIdTable").bootstrapTable("refresh"))})}}]}}});