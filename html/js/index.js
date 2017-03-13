'use strict';

$(document).ready(function () {
	var mySwiper = new Swiper('.swiper-container', {
		loop: true,

		// 如果需要分页器
		pagination: '.swiper-pagination',

		// 如果需要前进后退按钮
		nextButton: '.swiper-button-next',
		prevButton: '.swiper-button-prev'

	});
});
var app = angular.module('index', []);
app.controller('headCtrl', function ($scope) {
	$scope.config = config;
}).controller('swiperCtrl', function ($scope) {
	$scope.config = config;
	//TODO
	$scope.imgs = [{
		src: "assets/img/1.jpg",
		alt: "首页图片说明"
	}, {
		src: "assets/img/2.jpg",
		alt: "首页图片说明"
	}, {
		src: "assets/img/3.jpg",
		alt: "首页图片说明"
	}, {
		src: "assets/img/4.jpg",
		alt: "首页图片说明"
	}, {
		src: "assets/img/5.jpg",
		alt: "首页图片说明"
	}, {
		src: "assets/img/6.jpg",
		alt: "首页图片说明"
	}, {
		src: "assets/img/7.jpg",
		alt: "首页图片说明"
	}];
});