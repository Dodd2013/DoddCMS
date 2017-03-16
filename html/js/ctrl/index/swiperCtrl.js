/*global define*/
'use strict';

/**
 * The main controller for the app. The controller:
 * - retrieves and persist the model via the todoStorage service
 * - exposes the model to the template and provides event handlers
 */

define(['jquery', 'angular', 'swiper'], function ($, angular, Swiper) {
	return ['$scope', function ($scope) {
		$(document).ready(function () {
			var mySwiper = new Swiper('.swiper-container', {
				loop: true,

				// 如果需要分页器
				pagination: '.swiper-pagination',

				// 如果需要前进后退按钮
				nextButton: '.swiper-button-next',
				prevButton: '.swiper-button-prev',
				observer: true, //修改swiper自己或子元素时，自动初始化swiper

				observeParents: true });
		});
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
	}];
});