"use strict";define(["jquery","angular","swiper"],function(s,t,e){return["$scope",function(t){s(document).ready(function(){new e(".swiper-container",{loop:!0,pagination:".swiper-pagination",nextButton:".swiper-button-next",prevButton:".swiper-button-prev",observer:!0,observeParents:!0})}),t.imgs=[{src:"assets/img/1.jpg",alt:"首页图片说明"},{src:"assets/img/2.jpg",alt:"首页图片说明"},{src:"assets/img/3.jpg",alt:"首页图片说明"},{src:"assets/img/4.jpg",alt:"首页图片说明"},{src:"assets/img/5.jpg",alt:"首页图片说明"},{src:"assets/img/6.jpg",alt:"首页图片说明"},{src:"assets/img/7.jpg",alt:"首页图片说明"}]}]});