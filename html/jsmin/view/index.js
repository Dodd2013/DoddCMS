"use strict";define(["angular"],function(r){require(["ctrl/index/headCtrl","ctrl/common/navCtrl","ctrl/index/swiperCtrl"],function(t,e,n){r.module("index",[]).config(function(r){r.defaults.withCredentials=!0}).controller("headCtrl",t).controller("navCtrl",e).controller("swiperCtrl",n),r.bootstrap(document,["index"])})});