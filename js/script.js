/* =========================================================
   SECTION 01 : 메인 배너
   - 3초 자동재생
   - 좌우 버튼 이동
========================================================= */
document.addEventListener("DOMContentLoaded", function () {
    const mainSlider = document.querySelector(".jp-main-slider");

    if (mainSlider) {
        const track = mainSlider.querySelector(".jp-main-slider__track");
        const slides = mainSlider.querySelectorAll(".jp-main-slider__slide");
        const prevButton = mainSlider.querySelector(".jp-main-slider__button--prev");
        const nextButton = mainSlider.querySelector(".jp-main-slider__button--next");
        const currentText = mainSlider.querySelector(".jp-main-slider__current");
        const totalText = mainSlider.querySelector(".jp-main-slider__total");

        let currentIndex = 0;
        let timer = null;

        totalText.textContent = slides.length;

        // 선택한 번째 배너를 화면에 표시
        function showMainSlide(index) {
            currentIndex = (index + slides.length) % slides.length;
            const movePercent = currentIndex * (100 / slides.length);

            track.style.transform = `translate3d(-${movePercent}%, 0, 0)`;
            currentText.textContent = currentIndex + 1;
        }

        // 다음 배너
        function nextMainSlide() {
            showMainSlide(currentIndex + 1);
        }

        // 이전 배너
        function prevMainSlide() {
            showMainSlide(currentIndex - 1);
        }

        // 3초 자동재생 시작
        function startMainAutoPlay() {
            stopMainAutoPlay();
            timer = window.setInterval(nextMainSlide, 3000);
        }

        // 자동재생 중복 방지
        function stopMainAutoPlay() {
            if (timer !== null) {
                window.clearInterval(timer);
                timer = null;
            }
        }

        nextButton.addEventListener("click", function () {
            nextMainSlide();
            startMainAutoPlay();
        });

        prevButton.addEventListener("click", function () {
            prevMainSlide();
            startMainAutoPlay();
        });

        document.addEventListener("visibilitychange", function () {
            if (document.hidden) {
                stopMainAutoPlay();
            } else {
                startMainAutoPlay();
            }
        });

        showMainSlide(0);
        startMainAutoPlay();
    }


    /* =========================================================
       SECTION 02 : 상품 화면 슬라이드
       - 오른쪽 화살표 : 1 → 2 → 3 → 4 → 5 → 6 → 1
       - 왼쪽 화살표   : 1 ← 2 ← 3 ← 4 ← 5 ← 6
       - 자동재생 없음, 화살표 클릭으로만 변경
    ========================================================== */
    const productSlider = document.querySelector(".jp-product-slider");

    if (productSlider) {
        const productSlides = productSlider.querySelectorAll(".jp-product-slider__slide");
        const productPrev = productSlider.querySelector(".jp-product-slider__hit--prev");
        const productNext = productSlider.querySelector(".jp-product-slider__hit--next");

        let productIndex = 0;

        // 현재 상품 화면만 표시
        function showProductSlide(index) {
            productIndex = (index + productSlides.length) % productSlides.length;

            productSlides.forEach(function (slide, slideIndex) {
                slide.classList.toggle("is-active", slideIndex === productIndex);
            });
        }

        // 오른쪽 화살표 클릭 : 다음 화면
        productNext.addEventListener("click", function (event) {
            event.preventDefault();
            event.stopPropagation();
            showProductSlide(productIndex + 1);
        });

        // 왼쪽 화살표 클릭 : 이전 화면
        productPrev.addEventListener("click", function (event) {
            event.preventDefault();
            event.stopPropagation();
            showProductSlide(productIndex - 1);
        });

        // 키보드 방향키로도 테스트 가능
        productSlider.addEventListener("keydown", function (event) {
            if (event.key === "ArrowRight") {
                showProductSlide(productIndex + 1);
            }

            if (event.key === "ArrowLeft") {
                showProductSlide(productIndex - 1);
            }
        });

        showProductSlide(0);
    }
});
