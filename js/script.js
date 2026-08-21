/* ========================================
   집반찬연구소 메인 슬라이더
   - 3초마다 다음 화면으로 자동 이동
   - 좌/우 버튼 수동 이동
   - 마지막 화면 다음에는 첫 화면으로 반복
======================================== */

document.addEventListener("DOMContentLoaded", function () {
    const track = document.querySelector(".visual-slider__track");
    const slides = document.querySelectorAll(".visual-slide");
    const prevButton = document.querySelector(".slider-button--prev");
    const nextButton = document.querySelector(".slider-button--next");
    const currentText = document.querySelector(".current-slide");
    const totalText = document.querySelector(".total-slide");
    const closeTopBanner = document.querySelector(".top-banner__close");
    const topBanner = document.querySelector(".top-banner");

    let currentIndex = 0;
    let autoTimer = null;

    // 총 슬라이드 개수 표시
    totalText.textContent = slides.length;

    // 현재 순서에 맞춰 슬라이드 위치와 숫자를 갱신
    function renderSlide() {
        track.style.transform = `translate3d(-${currentIndex * 25}%, 0, 0)`;
        currentText.textContent = currentIndex + 1;
    }

    // 다음 슬라이드
    function goNext() {
        currentIndex = (currentIndex + 1) % slides.length;
        renderSlide();
    }

    // 이전 슬라이드
    function goPrev() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        renderSlide();
    }

    // 3초 자동재생 시작
    function startAutoPlay() {
        stopAutoPlay();
        autoTimer = window.setInterval(goNext, 3000);
    }

    // 기존 타이머 중복 방지
    function stopAutoPlay() {
        if (autoTimer !== null) {
            window.clearInterval(autoTimer);
            autoTimer = null;
        }
    }

    // 오른쪽 버튼: 다음 화면으로 이동 후 3초 타이머 다시 시작
    nextButton.addEventListener("click", function () {
        goNext();
        startAutoPlay();
    });

    // 왼쪽 버튼: 이전 화면으로 이동 후 3초 타이머 다시 시작
    prevButton.addEventListener("click", function () {
        goPrev();
        startAutoPlay();
    });

    // 키보드 방향키도 지원
    document.addEventListener("keydown", function (event) {
        if (event.key === "ArrowRight") {
            goNext();
            startAutoPlay();
        }
        if (event.key === "ArrowLeft") {
            goPrev();
            startAutoPlay();
        }
    });

    // 상단 초록 배너 닫기
    closeTopBanner.addEventListener("click", function () {
        topBanner.style.display = "none";
    });

    // 페이지가 보일 때만 자동재생해서 불필요한 타이머를 줄임
    document.addEventListener("visibilitychange", function () {
        if (document.hidden) {
            stopAutoPlay();
        } else {
            startAutoPlay();
        }
    });

    // 초기 실행
    renderSlide();
    startAutoPlay();
});
