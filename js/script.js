/* =========================================================
   설화수 추천 Swiper Slider
   - 총 6개 슬라이드
   - 한 화면에 3개
   - 한 번 클릭할 때 1개씩 이동
   - 3초마다 자동으로 1개씩 이동
   - 진행 막대 / 일시정지 / 재생 기능
========================================================= */

window.addEventListener("DOMContentLoaded", function () {
    const progressFill = document.querySelector(".progress-fill");
    const pauseButton = document.querySelector(".pause-btn");
    const playButton = document.querySelector(".play-btn");
    const totalSlides = 6;

    /* 현재 슬라이드 번호에 맞춰 진행 막대 길이 변경 */
    function updateProgress(index) {
        const progress = ((index + 1) / totalSlides) * 100;
        progressFill.style.width = progress + "%";
    }

    /* =====================================================
       Swiper가 정상 로드되었을 때 실행
    ====================================================== */
    if (typeof Swiper !== "undefined") {
        const productSwiper = new Swiper(".product-swiper", {
            /* 한 화면에 3개 표시 */
            slidesPerView: 3,

            /* 카드 사이 간격 */
            spaceBetween: 24,

            /* 버튼 클릭 시 1개씩 이동 */
            slidesPerGroup: 1,

            /* 마지막에서 처음으로 자연스럽게 반복 */
            loop: true,

            /* 3초마다 자동으로 한 개씩 이동 */
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: false
            },

            /* 좌우 네비게이션 버튼 연결 */
            navigation: {
                prevEl: ".slider-prev",
                nextEl: ".slider-next"
            },

            /* 슬라이드 변경 시 현재 위치를 막대로 표시 */
            on: {
                init: function () {
                    updateProgress(this.realIndex);
                },
                slideChange: function () {
                    updateProgress(this.realIndex);
                }
            }
        });

        /* 초기 상태는 자동재생 중이므로 pause 버튼을 활성 표시 */
        pauseButton.classList.add("is-active");

        /* 일시정지 버튼 클릭 */
        pauseButton.addEventListener("click", function () {
            productSwiper.autoplay.stop();
            pauseButton.classList.add("is-active");
            playButton.classList.remove("is-active");
        });

        /* 재생 버튼 클릭 */
        playButton.addEventListener("click", function () {
            productSwiper.autoplay.start();
            playButton.classList.add("is-active");
            pauseButton.classList.remove("is-active");
        });

        return;
    }

    /* =====================================================
       CDN 연결이 안 되는 환경을 위한 간단한 로컬 폴백
       (인터넷 없이 열어도 기본 슬라이드 기능은 동작)
    ====================================================== */
    const wrapper = document.querySelector(".swiper-wrapper");
    const slides = Array.from(document.querySelectorAll(".swiper-slide"));
    const prevButton = document.querySelector(".slider-prev");
    const nextButton = document.querySelector(".slider-next");
    let currentIndex = 0;
    let timer = null;

    /* 폴백용 레이아웃 구성 */
    wrapper.style.display = "flex";
    wrapper.style.gap = "24px";
    wrapper.style.transition = "transform 0.45s ease";

    slides.forEach(function (slide) {
        slide.style.flex = "0 0 calc((100% - 48px) / 3)";
    });

    function renderFallback() {
        const slideWidth = slides[0].getBoundingClientRect().width + 24;
        wrapper.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
        updateProgress(currentIndex);
    }

    function nextFallback() {
        currentIndex = (currentIndex + 1) % totalSlides;

        /* 마지막 부분에서도 3개가 유지되도록 시작 위치를 보정 */
        if (currentIndex > totalSlides - 3) {
            currentIndex = 0;
        }
        renderFallback();
    }

    function prevFallback() {
        currentIndex -= 1;
        if (currentIndex < 0) {
            currentIndex = totalSlides - 3;
        }
        renderFallback();
    }

    function startFallbackAutoplay() {
        stopFallbackAutoplay();
        timer = setInterval(nextFallback, 3000);
    }

    function stopFallbackAutoplay() {
        if (timer) {
            clearInterval(timer);
            timer = null;
        }
    }

    prevButton.addEventListener("click", prevFallback);
    nextButton.addEventListener("click", nextFallback);

    pauseButton.addEventListener("click", function () {
        stopFallbackAutoplay();
        pauseButton.classList.add("is-active");
        playButton.classList.remove("is-active");
    });

    playButton.addEventListener("click", function () {
        startFallbackAutoplay();
        playButton.classList.add("is-active");
        pauseButton.classList.remove("is-active");
    });

    window.addEventListener("resize", renderFallback);

    pauseButton.classList.add("is-active");
    renderFallback();
    startFallbackAutoplay();
});
