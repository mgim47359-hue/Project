/* =========================================================
   집반찬연구소 메인 배너 슬라이드
   - 3초마다 자동으로 다음 화면 이동
   - 좌/우 버튼 클릭 가능
   - 마지막 배너 다음에는 첫 번째 배너로 반복
========================================================= */

document.addEventListener("DOMContentLoaded", function () {
    const slider = document.querySelector(".jp-main-slider");

    // 해당 섹션이 없는 페이지에서는 실행하지 않음
    if (!slider) return;

    const track = slider.querySelector(".jp-main-slider__track");
    const slides = slider.querySelectorAll(".jp-main-slider__slide");
    const prevButton = slider.querySelector(".jp-main-slider__button--prev");
    const nextButton = slider.querySelector(".jp-main-slider__button--next");
    const currentText = slider.querySelector(".jp-main-slider__current");
    const totalText = slider.querySelector(".jp-main-slider__total");

    let currentIndex = 0;
    let timer = null;

    totalText.textContent = slides.length;

    // 현재 슬라이드 위치와 번호를 화면에 반영
    function showSlide(index) {
        currentIndex = (index + slides.length) % slides.length;
        const movePercent = currentIndex * (100 / slides.length);

        track.style.transform = `translate3d(-${movePercent}%, 0, 0)`;
        currentText.textContent = currentIndex + 1;
    }

    // 다음 화면
    function nextSlide() {
        showSlide(currentIndex + 1);
    }

    // 이전 화면
    function prevSlide() {
        showSlide(currentIndex - 1);
    }

    // 3초 자동재생 시작
    function startAutoPlay() {
        stopAutoPlay();
        timer = window.setInterval(nextSlide, 3000);
    }

    // 중복 타이머 방지
    function stopAutoPlay() {
        if (timer !== null) {
            window.clearInterval(timer);
            timer = null;
        }
    }

    // 오른쪽 버튼 클릭
    nextButton.addEventListener("click", function () {
        nextSlide();
        startAutoPlay();
    });

    // 왼쪽 버튼 클릭
    prevButton.addEventListener("click", function () {
        prevSlide();
        startAutoPlay();
    });

    // 브라우저 탭을 벗어나면 자동재생 정지 / 돌아오면 재시작
    document.addEventListener("visibilitychange", function () {
        if (document.hidden) {
            stopAutoPlay();
        } else {
            startAutoPlay();
        }
    });

    showSlide(0);
    startAutoPlay();
});
