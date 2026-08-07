document.addEventListener("DOMContentLoaded", function () {
  const swiperElement = document.querySelector(".main-banner-swiper");

  if (swiperElement) {
    const mainBannerSwiper = new Swiper(".main-banner-swiper", {
      // 첫 번째 슬라이드 표시
      initialSlide: 0,

      // 마지막 배너 뒤에 첫 번째 배너 연결
      loop: true,

      // 슬라이드 전환 속도
      speed: 750,

      // 한 화면에 슬라이드 한 장
      slidesPerView: 1,

      // 자동 슬라이드
      autoplay: {
        delay: 4000,

        // 사용자가 조작한 뒤에도 자동 재생 유지
        disableOnInteraction: false,

        // 마우스를 올려도 자동 재생 유지
        pauseOnMouseEnter: false
      },

      // 배너 표시점
      pagination: {
        el: ".swiper-pagination",
        clickable: true
      },

      // 터치 슬라이드
      allowTouchMove: true,
      simulateTouch: true,

      // 키보드 조작
      keyboard: {
        enabled: true,
        onlyInViewport: true
      },

      // 접근성
      a11y: {
        enabled: true,
        prevSlideMessage: "이전 배너",
        nextSlideMessage: "다음 배너",
        firstSlideMessage: "첫 번째 배너입니다.",
        lastSlideMessage: "마지막 배너입니다.",
        paginationBulletMessage: "{{index}}번째 배너로 이동"
      },

      // HTML 변화 감지
      observer: true,
      observeParents: true
    });

    // 브라우저 화면을 다시 열었을 때 자동 재생 시작
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) {
        mainBannerSwiper.autoplay.stop();
      } else {
        mainBannerSwiper.autoplay.start();
      }
    });
  }

  // 통계 기간 선택 버튼
  const periodButtons = document.querySelectorAll(".period-tab");

  periodButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      periodButtons.forEach(function (item) {
        item.classList.remove("active");
      });

      button.classList.add("active");

      const selectedPeriod = button.dataset.period;

      console.log("선택한 통계 기간:", selectedPeriod);
    });
  });

  // 메뉴 버튼
  const menuButton = document.querySelector(".menu-button");

  if (menuButton) {
    menuButton.addEventListener("click", function () {
      console.log("메뉴 버튼을 클릭했습니다.");
    });
  }

  // 알림 버튼
  const notificationButton = document.querySelector(
    ".notification-button"
  );

  if (notificationButton) {
    notificationButton.addEventListener("click", function () {
      window.location.href = "./notification.html";
    });
  }
});