// =========================
// LOTTE Eatz 자동 슬라이드
// 3초마다 이미지 변경
// =========================

const lotteSlides = document.querySelectorAll(".lotte-slide");

let lotteIndex = 0;

function changeSlide() {

    // 모든 이미지 숨기기
    lotteSlides.forEach(function (slide) {
        slide.style.display = "none";
    });

    // 다음 이미지
    lotteIndex++;

    // 마지막 다음에는 첫 번째로
    if (lotteIndex >= lotteSlides.length) {
        lotteIndex = 0;
    }

    // 현재 이미지만 표시
    lotteSlides[lotteIndex].style.display = "block";
}

// 3초마다 변경
setInterval(changeSlide, 3000);
/* =========================================
   쿠폰 Slider
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const track = document.querySelector(".lotte-coupon-track");

    const cards = document.querySelectorAll(".lotte-coupon-card");

    const prevButton = document.querySelector(".lotte-coupon-prev");

    const nextButton = document.querySelector(".lotte-coupon-next");


    /* 현재 위치 */
    let currentIndex = 0;


    /* 한 화면에 보여줄 카드 개수 */
    const visibleCount = 4;


    /* 카드 사이 간격 */
    const gap = 14;


    /* =====================================
       Slider 이동 함수
    ===================================== */

    function moveSlider() {

        const cardWidth = cards[0].offsetWidth;

        const moveX =
            currentIndex * (cardWidth + gap);

        track.style.transform =
            `translateX(-${moveX}px)`;

    }


    /* =====================================
       오른쪽 버튼
    ===================================== */

    nextButton.addEventListener("click", function () {

        /*
        마지막 카드까지 이동하면
        다시 첫 번째 카드로 이동
        */

        if (
            currentIndex <
            cards.length - visibleCount
        ) {

            currentIndex++;

        } else {

            currentIndex = 0;

        }

        moveSlider();

    });


    /* =====================================
       왼쪽 버튼
    ===================================== */

    prevButton.addEventListener("click", function () {

        if (currentIndex > 0) {

            currentIndex--;

        } else {

            currentIndex =
                cards.length - visibleCount;

        }

        moveSlider();

    });

});