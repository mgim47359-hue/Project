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
<script>
document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       핫메뉴 영역 찾기
    ===================================================== */
    const hotSection = document.querySelector(".hot-menu-section");

    if (!hotSection) {
        console.log("hot-menu-section이 없습니다.");
        return;
    }


    /* =====================================================
       브랜드별 데이터
    ===================================================== */
    const hotMenuData = {

<ul class="hot-menu-tabs">

    <li class="active">
        <button type="button" data-tab="angelinus">
            엔제리너스
        </button>
    </li>

    <li>
        <button type="button" data-tab="lotteria">
            롯데리아
        </button>
    </li>

    <li>
        <button type="button" data-tab="pleating">
            플레:이팅
        </button>
    </li>

    <li>
        <button type="button" data-tab="krispy">
            크리스피크림 도넛
        </button>
    </li>

</ul>
<!-- =========================================
     브랜드 바로가기 SECTION
========================================= -->
<section class="brand-section">

    <div class="brand-inner">

        <!-- 제목 -->
        <h2 class="brand-title">
            브랜드 바로가기
        </h2>


        <!-- =====================================
             브랜드 슬라이더
        ====================================== -->
        <div class="brand-slider">

            <!-- 왼쪽 버튼 -->
            <button
                type="button"
                class="brand-arrow brand-prev"
                aria-label="이전 브랜드"
            >
                ‹
            </button>


            <!-- 카드가 보이는 영역 -->
            <div class="brand-viewport">

                <!-- 실제로 움직이는 영역 -->
                <div class="brand-track">


                    <!-- 01 롯데리아 -->
                    <a href="#" class="brand-card">

                        <img
                            src="./images/brand-lotteria.png"
                            alt="롯데리아"
                        >

                        <span>
                            롯데리아
                        </span>

                    </a>


                    <!-- 02 마루가메우동 -->
                    <a href="#" class="brand-card">

                        <img
                            src="./images/brand-marugame.png"
                            alt="마루가메우동"
                        >

                        <span>
                            마루가메우동
                        </span>

                    </a>


                    <!-- 03 크리스피크림 도넛 -->
                    <a href="#" class="brand-card">

                        <img
                            src="./images/brand-krispy.png"
                            alt="크리스피크림 도넛"
                        >

                        <span>
                            크리스피크림 도넛
                        </span>

                    </a>


                    <!-- 04 스탠브루 -->
                    <a href="#" class="brand-card">

                        <img
                            src="./images/brand-stanbrew.png"
                            alt="스탠브루"
                        >

                        <span>
                            스탠브루
                        </span>

                    </a>


                    <!-- 05 플레:이팅 -->
                    <a href="#" class="brand-card">

                        <img
                            src="./images/brand-pleating.png"
                            alt="플레:이팅"
                        >

                        <span>
                            플레:이팅
                        </span>

                    </a>


                    <!-- 06 엔제리너스 -->
                    <a href="#" class="brand-card">

                        <img
                            src="./images/brand-angelinus.png"
                            alt="엔제리너스"
                        >

                        <span>
                            엔제리너스
                        </span>

                    </a>


                    <!-- 07 롯데GRS -->
                    <a href="#" class="brand-card">

                        <img
                            src="./images/brand-lottegrs.png"
                            alt="롯데GRS"
                        >

                        <span>
                            롯데GRS
                        </span>

                    </a>


                </div>

            </div>


            <!-- 오른쪽 버튼 -->
            <button
                type="button"
                class="brand-arrow brand-next"
                aria-label="다음 브랜드"
            >
                ›
            </button>

        </div>


        <!-- =====================================
             하단 컨트롤
        ====================================== -->
        <div class="brand-control">

            <!-- 진행 점 -->
            <div
                class="brand-pagination"
                id="brandPagination"
            >
            </div>


            <!-- 일시정지 / 재생 -->
            <button
                type="button"
                class="brand-play-button"
                id="brandPlayButton"
                aria-label="자동재생 정지"
            >
                Ⅱ
            </button>

        </div>

    </div>

</section>
<!-- =========================================================
     FAMILY SITE 시작
========================================================= -->

<div class="lotta-family-site">

    <!-- 패밀리사이트 버튼 -->
    <button
        type="button"
        class="lotta-family-btn"
        aria-expanded="false"
    >
        <span>Family Site</span>

        <span class="lotta-family-arrow">
            ▼
        </span>
    </button>


    <!-- 클릭하면 나타나는 메뉴 -->
    <ul class="lotta-family-list">

        <li>
            <a href="#" target="_blank">
                롯데리아
            </a>
        </li>

        <li>
            <a href="#" target="_blank">
                엔제리너스
            </a>
        </li>

        <li>
            <a href="#" target="_blank">
                크리스피크림 도넛
            </a>
        </li>

        <li>
            <a href="#" target="_blank">
                플레이팅
            </a>
        </li>

        <li>
            <a href="#" target="_blank">
                롯데GRS
            </a>
        </li>

    </ul>

</div>

<!-- =========================================================
     FAMILY SITE 끝
========================================================= -->


<style>

/* =========================================================
   FAMILY SITE 기본 설정
========================================================= */

.lotta-family-site,
.lotta-family-site * {
    box-sizing: border-box;
}


.lotta-family-site {
    position: relative;

    width: 180px;

    font-family: Arial, "Noto Sans KR", sans-serif;

    z-index: 1000;
}


/* =========================================================
   FAMILY SITE 버튼
========================================================= */

.lotta-family-btn {
    display: flex;
    align-items: center;
    justify-content: space-between;

    width: 180px;
    height: 44px;

    padding: 0 16px;

    border: 1px solid #d9dde1;

    border-radius: 4px;

    background: #f3f4f5;

    color: #111;

    font-family: inherit;

    font-size: 14px;
    font-weight: 600;

    cursor: pointer;
}


/* 클릭했을 때 */

.lotta-family-btn:hover {
    background: #eef0f2;
}


/* =========================================================
   오른쪽 삼각형
========================================================= */

.lotta-family-arrow {
    display: inline-block;

    color: #111;

    font-size: 10px;

    line-height: 1;

    transition: transform 0.3s ease;
}


/* 메뉴가 열리면 삼각형 위쪽으로 */

.lotta-family-site.active .lotta-family-arrow {
    transform: rotate(180deg);
}


/* =========================================================
   펼쳐지는 목록
========================================================= */

.lotta-family-list {
    position: absolute;

    top: 48px;
    left: 0;

    display: none;

    width: 180px;

    margin: 0;
    padding: 5px 0;

    list-style: none;

    border: 1px solid #d9dde1;

    border-radius: 4px;

    background: #fff;

    box-shadow: 0 7px 18px rgba(0, 0, 0, 0.08);
}


/* 메뉴 열기 */

.lotta-family-site.active .lotta-family-list {
    display: block;
}


/* =========================================================
   메뉴 항목
========================================================= */

.lotta-family-list li {
    width: 100%;
}


.lotta-family-list a {
    display: flex;
    align-items: center;

    width: 100%;
    height: 38px;

    padding: 0 16px;

    color: #555;

    font-size: 13px;
    font-weight: 400;

    text-decoration: none;

    transition: 0.2s;
}


/* 메뉴 hover */

.lotta-family-list a:hover {
    background: #f3f4f5;

    color: #111;

    font-weight: 700;
}

</style>


<script>

/* =========================================================
   FAMILY SITE 클릭 기능
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const familySite =
        document.querySelector(".lotta-family-site");

    const familyButton =
        document.querySelector(".lotta-family-btn");


    /* ==============================
       Family Site 버튼 클릭
    ============================== */

    familyButton.addEventListener("click", function (event) {

        event.stopPropagation();

        familySite.classList.toggle("active");


        /* 접근성을 위한 상태값 */

        const isOpen =
            familySite.classList.contains("active");

        familyButton.setAttribute(
            "aria-expanded",
            isOpen
        );

    });


    /* ==============================
       바깥 영역 클릭하면 닫기
    ============================== */

    document.addEventListener("click", function (event) {

        if (!familySite.contains(event.target)) {

            familySite.classList.remove("active");

            familyButton.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    });

});

</script>