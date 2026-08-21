/* =========================================================
   설화수 추천 Banner Slider
   - Swiper 11 사용
   - 총 6개 슬라이드
   - 한 화면에 3개 표시
   - 이전/다음 버튼 클릭 시 정확히 1개씩 이동
   - 3초마다 다음 슬라이드로 1개씩 자동 이동
   - 무한 반복
   - 진행 막대
   - 일시정지 / 재생 버튼
========================================================= */

(function () {
    "use strict";

    /* 이 섹션이 없는 페이지에서는 스크립트를 실행하지 않습니다. */
    const section = document.querySelector(".sul-recommend-section");
    if (!section) return;

    const swiperElement = section.querySelector(".sulwhasoo-product-swiper");
    const prevButton = section.querySelector(".sul-slider-prev");
    const nextButton = section.querySelector(".sul-slider-next");
    const pauseButton = section.querySelector(".sul-pause-btn");
    const playButton = section.querySelector(".sul-play-btn");
    const progressFill = section.querySelector(".sul-progress-fill");
    const slides = Array.from(section.querySelectorAll(".sul-product-card"));
    const totalSlides = slides.length;

    /* 진행 막대 갱신 */
    function updateProgress(realIndex) {
        const safeIndex = ((realIndex % totalSlides) + totalSlides) % totalSlides;
        progressFill.style.width = (((safeIndex + 1) / totalSlides) * 100) + "%";
    }

    /* 재생 / 일시정지 버튼 상태 표시 */
    function setPlayState(isPlaying) {
        pauseButton.classList.toggle("is-active", isPlaying);
        playButton.classList.toggle("is-active", !isPlaying);
    }

    /* =====================================================
       Swiper가 정상적으로 로드된 경우
       navigation 옵션에 버튼을 맡기지 않고 직접 click 이벤트를 연결합니다.
       이렇게 하면 GitHub Pages에서 오른쪽 버튼만 먹지 않는 충돌을 방지할 수 있습니다.
    ====================================================== */
    if (typeof window.Swiper !== "undefined") {
        const productSwiper = new window.Swiper(swiperElement, {
            slidesPerView: 3,          // 한 화면에 3개
            slidesPerGroup: 1,         // 한 번에 1개씩 이동
            spaceBetween: 24,          // 카드 사이 간격
            loop: true,                // 마지막 다음에는 처음으로 반복
            speed: 600,                // 이동 애니메이션 속도
            allowTouchMove: true,
            observer: true,
            observeParents: true,
            watchSlidesProgress: true,

            /* 3초마다 다음 슬라이드로 이동 */
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: false,
                reverseDirection: false
            },

            /* 진행 막대 처리 */
            on: {
                init: function () {
                    updateProgress(this.realIndex);
                },
                slideChange: function () {
                    updateProgress(this.realIndex);
                },
                autoplayStart: function () {
                    setPlayState(true);
                },
                autoplayStop: function () {
                    setPlayState(false);
                }
            }
        });

        /* 초기 진행 상태 */
        updateProgress(productSwiper.realIndex || 0);
        setPlayState(true);

        /* 왼쪽 버튼 : 이전 상품 1개 */
        prevButton.addEventListener("click", function (event) {
            event.preventDefault();
            event.stopPropagation();
            productSwiper.slidePrev();
        });

        /* 오른쪽 버튼 : 다음 상품 1개
           navigation 설정에 의존하지 않고 직접 slideNext()를 실행합니다. */
        nextButton.addEventListener("click", function (event) {
            event.preventDefault();
            event.stopPropagation();
            productSwiper.slideNext();
        });

        /* 일시정지 버튼 */
        pauseButton.addEventListener("click", function (event) {
            event.preventDefault();
            productSwiper.autoplay.stop();
            setPlayState(false);
        });

        /* 재생 버튼 */
        playButton.addEventListener("click", function (event) {
            event.preventDefault();
            productSwiper.autoplay.start();
            setPlayState(true);
        });

        return;
    }

    /* =====================================================
       Swiper CDN이 로드되지 못했을 때의 폴백
       GitHub Pages에서도 기본 슬라이드 기능을 유지합니다.
    ====================================================== */
    const wrapper = section.querySelector(".swiper-wrapper");
    let currentIndex = 0;
    let timer = null;

    wrapper.style.display = "flex";
    wrapper.style.gap = "24px";
    wrapper.style.transition = "transform 0.6s ease";
    wrapper.style.willChange = "transform";

    slides.forEach(function (slide) {
        slide.style.flex = "0 0 calc((100% - 48px) / 3)";
    });

    function renderFallback() {
        if (!slides[0]) return;
        const slideWidth = slides[0].getBoundingClientRect().width + 24;
        wrapper.style.transform = "translate3d(-" + (currentIndex * slideWidth) + "px, 0, 0)";
        updateProgress(currentIndex);
    }

    function nextFallback() {
        currentIndex += 1;
        if (currentIndex > totalSlides - 3) currentIndex = 0;
        renderFallback();
    }

    function prevFallback() {
        currentIndex -= 1;
        if (currentIndex < 0) currentIndex = totalSlides - 3;
        renderFallback();
    }

    function stopFallbackAutoplay() {
        if (timer !== null) {
            window.clearInterval(timer);
            timer = null;
        }
        setPlayState(false);
    }

    function startFallbackAutoplay() {
        stopFallbackAutoplay();
        timer = window.setInterval(nextFallback, 3000);
        setPlayState(true);
    }

    prevButton.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation();
        prevFallback();
    });

    nextButton.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation();
        nextFallback();
    });

    pauseButton.addEventListener("click", function (event) {
        event.preventDefault();
        stopFallbackAutoplay();
    });

    playButton.addEventListener("click", function (event) {
        event.preventDefault();
        startFallbackAutoplay();
    });

    window.addEventListener("resize", renderFallback);

    renderFallback();
    startFallbackAutoplay();
})();
