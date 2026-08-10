"use strict";

document.addEventListener("DOMContentLoaded", function () {
  const mainSwiper = new Swiper(".main-swiper", {
    // 슬라이드 반복
    loop: true,

    // 슬라이드 방향
    direction: "horizontal",

    // 한 번에 보이는 슬라이드 개수
    slidesPerView: 1,

    // 슬라이드 사이 간격
    spaceBetween: 0,

    // 전환 속도
    speed: 700,

    // 손가락 터치 슬라이드
    allowTouchMove: true,

    // 자동 재생
    autoplay: {
      delay: 3500,
      disableOnInteraction: false,
      pauseOnMouseEnter: false
    },

    // 페이지 표시
    pagination: {
      el: ".main-swiper .swiper-pagination",
      clickable: true
    },

    // 좌우 버튼
    navigation: {
      nextEl: ".main-swiper .swiper-button-next",
      prevEl: ".main-swiper .swiper-button-prev"
    },

    // 키보드 조작
    keyboard: {
      enabled: true
    },

    // 접근성
    a11y: {
      enabled: true,
      prevSlideMessage: "이전 배너",
      nextSlideMessage: "다음 배너",
      firstSlideMessage: "첫 번째 배너입니다.",
      lastSlideMessage: "마지막 배너입니다.",
      paginationBulletMessage: "{{index}}번 배너로 이동"
    }
  });

  // 페이지가 보이지 않을 때 자동 재생 정지
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
      mainSwiper.autoplay.stop();
    } else {
      mainSwiper.autoplay.start();
    }
  });
});