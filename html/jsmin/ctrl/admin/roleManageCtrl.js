"use strict";define(["angular","bootstrapTableNg","bootstrapTableCN","config","pnotify","jquery"],function(e){var t="roleManageCtrl",a=require("config").config,o=require("jquery"),r=require("pnotify");return r.prototype.options.styling="bootstrap3",{route:{path:"roleManage",route:{url:"/roleManage",templateUrl:"tpls/roleManage.html",controller:t}},ctrl:{name:t,fn:["$scope","$http",function(e,t){function l(e,t,a){if(null==e)return"未知时间";var o=new Date(e),r=o.toLocaleString();return r}function n(t,a,o){var r="",l="";return e.editRole&&(r="<a data-op='edit' data-DESC='"+a.DESC+"' data-roleName='"+a.roleName+"' data-roleId='"+a.roleId+"' class='opBtn' title='编辑导航'><span class='glyphicon glyphicon-edit'></span></a>"),e.deleteRole&&(l="<a data-op='delete' data-DESC='"+a.DESC+"' data-roleName='"+a.roleName+"' data-roleId='"+a.roleId+"' class='opBtn' title='删除导航'><span class='glyphicon glyphicon-trash'></span></a>"),r+l}e.premission=null,e.canAddRole=!0,e.editRole=e.deleteRoleBtn=!1,e.ajaxRequest=function(o){var r=t({url:a.api+"/role",method:"GET",withCredentials:!0,params:o.data});null===e.premission?t({url:a.api+"/getPermission",method:"GET",withCredentials:!0,params:{functionModel:301}}).then(function(t){e.premission=t.data;var a=!0,o=!1,l=void 0;try{for(var n,d=e.premission[Symbol.iterator]();!(a=(n=d.next()).done);a=!0){var i=n.value;"addRole"===i.permissionName&&(e.canAddRole=!1),"editRole"===i.permissionName&&(e.editRole=!0),"deleteRole"===i.permissionName&&(e.deleteRole=!0)}}catch(s){o=!0,l=s}finally{try{!a&&d["return"]&&d["return"]()}finally{if(o)throw l}}return r}).then(function(e){o.success(e.data)}):r.then(function(e){o.success(e.data)})},e.tableCtrl={options:{toolbar:"#toolbar",ajax:e.ajaxRequest,rowStyle:function(e,t){return{classes:"none"}},sidePagination:"server",cache:!1,height:500,striped:!0,pagination:!0,pageSize:10,pageList:[5,10,25,50,100,200],search:!0,showColumns:!0,showRefresh:!0,minimumCountColumns:2,clickToSelect:!1,maintainSelected:!0,columns:[{field:"roleId",title:"角色ID",align:"center",valign:"bottom",sortable:!0},{field:"roleName",title:"角色名称",align:"center",valign:"middle"},{field:"DESC",title:"描述",align:"center",valign:"middle"},{field:"createdAt",title:"创建时间",align:"center",valign:"middle",formatter:l,sortable:!0},{field:"updatedAt",title:"更新时间",align:"center",valign:"middle",formatter:l,sortable:!0},{field:"op",title:"操作",align:"center",valign:"middle",clickToSelect:!1,formatter:n}]}},e.addOrEdit="add",o("#roleTable").on("click",".opBtn",function(t){var a=o(t.target).parent().attr("data-op"),r={roleId:o(t.target).parent().attr("data-roleId"),roleName:o(t.target).parent().attr("data-roleName"),DESC:o(t.target).parent().attr("data-DESC")};"edit"===a?e.$apply(function(){e.showEdit(r)}):"delete"===a&&e.$apply(function(){e.showRemove(r)})}),e.showAdd=function(){e.addOrEdit="add",o("#addAndEditModal").modal("show")},e.showEdit=function(t){e.roleId=t.roleId,e.addOrEdit="edit",e.roleName=t.roleName,e.DESC=t.DESC,o("#addAndEditModal").modal("show")},e.showRemove=function(t){e.roleId=t.roleId,o("#deleteModal").modal("show")},e.deleteRoleBtn=function(){t({url:a.api+"/role/delete",method:"POST",withCredentials:!0,headers:{"Content-Type":"application/x-www-form-urlencoded",Accept:"*/*"},transformRequest:o.param,data:{roleId:e.roleId}}).then(function(t){"ok"===t.data.status&&(new r({type:"danger",text:"删除成功"}),e.roleId=e.roleName=e.DESC="",o("#deleteModal").modal("hide"),o("#roleTable").bootstrapTable("refresh"))})},e.addAndEditRoleBtn=function(){"edit"==e.addOrEdit?t({url:a.api+"/role/edit",method:"POST",withCredentials:!0,headers:{"Content-Type":"application/x-www-form-urlencoded",Accept:"*/*"},transformRequest:o.param,data:{roleId:e.roleId,roleName:e.roleName,DESC:e.DESC}}).then(function(t){new r({type:"info",text:"修改成功"}),e.roleId=e.roleName=e.DESC="",o("#addAndEditModal").modal("hide"),o("#roleTable").bootstrapTable("refresh")},function(e){new r({type:"error",text:"修改失败"})}):"add"==e.addOrEdit&&t({url:a.api+"/role/add",method:"POST",withCredentials:!0,headers:{"Content-Type":"application/x-www-form-urlencoded",Accept:"*/*"},transformRequest:o.param,data:{roleName:e.roleName,DESC:e.DESC}}).then(function(t){new r({type:"info",text:"添加成功"}),e.roleId=e.roleName=e.DESC="",o("#addAndEditModal").modal("hide"),o("#roleTable").bootstrapTable("refresh")},function(e){new r({type:"error",text:"添加失败"})})}}]}}});