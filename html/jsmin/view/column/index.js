"use strict";define(function(o,t,l){var n=o("angular"),r=(o("bootstrapTable"),o("bootstrapTableNg"),o("bootstrapTableCN"),o("ctrl/common/navCtrl")),a=o("ctrl/column/columnCtrl");n.module("column",["bsTable"]).config(function(o){o.defaults.withCredentials=!0}).controller("navCtrl",r).controller("columnCtrl",a),n.bootstrap(document,["column"])});