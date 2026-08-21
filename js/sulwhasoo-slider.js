/* =========================================================
   설화수 추천 Slider
   - Swiper 사용
   - 총 6개
   - 한 화면에 3개
   - 좌/우 1개씩 이동
   - 3초마다 자동으로 다음 상품 1개 이동
   - 무한 반복
   - 진행 막대
   - 일시정지 / 재생
   - GitHub Pages에서 Swiper CDN이 늦거나 차단되어도
     기본 동작을 유지하는 폴백 슬라이더 포함
========================================================= */

(function () {
    "use strict";

    /* 페이지에 해당 섹션이 없으면 실행하지 않음 */
    const section = document.querySelector(".sul-recommend-section");
    if (!section) return;

    const swiperElement = section.querySelector(".sulwhasoo-product-swiper");
    const progressFill = section.querySelector(".sul-progress-fill");
    const pauseButton = section.querySelector(".sul-pause-btn");
    const playButton = section.querySelector(".sul-play-btn");
    const prevButton = section.querySelector(".sul-slider-prev");
    const nextButton = section.querySelector(".sul-slider-next");
    const slides = Array.from(section.querySelectorAll(".sul-product-card"));

    const totalSlides = slides.length;

    /* 현재 실제 슬라이드 순서에 맞춰 진행 막대 표시 */
    function updateProgress(realIndex) {
        const safeIndex = ((realIndex % totalSlides) + totalSlides) % totalSlides;
        const percentage = ((safeIndex + 1) / totalSlides) * 100;
        progressFill.style.width = percentage + "%";
    }

    /* 재생/일시정지 버튼의 활성 상태 표시 */
    function showPlayingState(isPlaying) {
        pauseButton.classList.toggle("is-active", isPlaying);
        playButton.classList.toggle("is-active", !isPlaying);
    }

    /* =====================================================
       1) Swiper CDN이 정상 로드된 경우
    ====================================================== */
    if (typeof window.Swiper !== "undefined") {
        const productSwiper = new window.Swiper(swiperElement, {
            /* 한 화면에 3개 */
            slidesPerView: 3,

            /* 카드 사이 24px */
            spaceBetween: 24,

            /* 버튼/자동재생 시 1개씩 이동 */
            slidesPerGroup: 1,

            /* 마지막 다음에는 처음으로 자연스럽게 반복 */
            loop: true,
            loopAdditionalSlides: 3,

            /* 이동 애니메이션 속도 */
            speed: 600,

            /* 3초마다 다음 상품으로 자동 이동 */
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: false,
                reverseDirection: false
            },

            /* GitHub에서 레이아웃 계산 시점을 안정적으로 처리 */
            observer: true,
            observeParents: true,
            watchSlidesProgress: true,

            /* 이 섹션의 좌우 버튼만 연결 */
            navigation: {
                prevEl: prevButton,
                nextEl: nextButton
            },

            /* 진행 막대 갱신 */
            on: {
                init: function () {
                    updateProgress(this.realIndex);
                },
                slideChange: function () {
                    updateProgress(this.realIndex);
                },
                autoplayStart: function () {
                    showPlayingState(true);
                },
                autoplayStop: function () {
                    showPlayingState(false);
                }
            }
        });

        /* 초기 상태 : 자동재생 중 */
        showPlayingState(true);

        /* 일시정지 */
        pauseButton.addEventListener("click", function () {
            productSwiper.autoplay.stop();
            showPlayingState(false);
        });

        /* 재생 */
        playButton.addEventListener("click", function () {
            productSwiper.autoplay.start();
            showPlayingState(true);
        });

        return;
    }

    /* =====================================================
       2) Swiper CDN이 로드되지 않았을 때의 폴백
       GitHub Pages에서 외부 CDN이 막혀도 3초 자동 슬라이드 유지
    ====================================================== */
    const wrapper = section.querySelector(".swiper-wrapper");
    let currentIndex = 0;
    let timer = null;

    /* Swiper CSS가 없어도 가로 정렬이 되도록 직접 설정 */
    wrapper.style.display = "flex";
    wrapper.style.gap = "24px";
    wrapper.style.transition = "transform 0.6s ease";
    wrapper.style.willChange = "transform";

    slides.forEach(function (slide) {
        slide.style.flex = "0 0 calc((100% - 48px) / 3)";
    });

    /* 현재 위치 렌더링 */
    function renderFallback() {
        const firstSlide = slides[0];
        if (!firstSlide) return;

        const slideWidth = firstSlide.getBoundingClientRect().width + 24;
        wrapper.style.transform = "translate3d(-" + (currentIndex * slideWidth) + "px, 0, 0)";
        updateProgress(currentIndex);
    }

    /* 다음 1개 */
    function nextFallback() {
        currentIndex += 1;

        /* 폴백에서는 항상 3장이 보여야 하므로 가능한 마지막 시작점 뒤에는 처음으로 */
        if (currentIndex > totalSlides - 3) {
            currentIndex = 0;
        }

        renderFallback();
    }

    /* 이전 1개 */
    function prevFallback() {
        currentIndex -= 1;

        if (currentIndex < 0) {
            currentIndex = totalSlides - 3;
        }

        renderFallback();
    }

    /* 3초 자동재생 시작 */
    function startFallbackAutoplay() {
        stopFallbackAutoplay();
        timer = window.setInterval(nextFallback, 3000);
        showPlayingState(true);
    }

    /* 자동재생 정지 */
    function stopFallbackAutoplay() {
        if (timer !== null) {
            window.clearInterval(timer);
            timer = null;
        }
        showPlayingState(false);
    }

    prevButton.addEventListener("click", prevFallback);
    nextButton.addEventListener("click", nextFallback);

    pauseButton.addEventListener("click", stopFallbackAutoplay);
    playButton.addEventListener("click", startFallbackAutoplay);

    window.addEventListener("resize", renderFallback);

    /* 페이지 로딩 즉시 실행 */
    renderFallback();
    startFallbackAutoplay();
})();
