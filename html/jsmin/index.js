"use strict";define(["angular","common"],function(r){require(["ctrl/index/headCtrl","ctrl/common/navCtrl","ctrl/index/swiperCtrl"],function(t,n,e){r.module("index",[]).config(function(r){r.defaults.withCredentials=!0}).controller("headCtrl",t).controller("navCtrl",n).controller("swiperCtrl",e),r.bootstrap(document,["index"])})});