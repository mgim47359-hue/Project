$(function () {

    /* =========================================
       FADE ANIMATION SECTION
    ========================================= */

    // fadeOut 버튼 클릭 → red 박스를 부드럽게 숨기기
    $("#fadeOutBtn").click(function () {
        $(".fade-box").fadeOut(500);
    });

    // fadeIn 버튼 클릭 → red 박스를 부드럽게 보여주기
    $("#fadeInBtn").click(function () {
        $(".fade-box").fadeIn(500);
    });

    // fadeToggle 버튼 클릭 → green 박스를 숨김 / 보임 반복
    $("#fadeToggleBtn").click(function () {
        $(".fade-toggle-box").fadeToggle(500);
    });


    /* =========================================
       SLIDE ANIMATION SECTION
    ========================================= */

    // slideUp 버튼 클릭 → #ffcc00 박스 높이를 0으로 줄이며 숨기기
    $("#slideUpBtn").click(function () {
        $(".slide-box").slideUp(500);
    });

    // slideDown 버튼 클릭 → #ffcc00 박스를 높이 200px 상태로 다시 보여주기
    $("#slideDownBtn").click(function () {
        $(".slide-box").slideDown(500);
    });

    // slideToggle 버튼 클릭 → #c8ff00 박스 높이 0 ↔ 200px 반복
    $("#slideToggleBtn").click(function () {
        $(".slide-toggle-box").slideToggle(500);
    });


    /* =========================================
       ANIMATE SECTION
    ========================================= */

    // ani1 버튼 클릭 → #12bfe7 박스를 오른쪽으로 500px 이동
    $("#ani1Btn").click(function () {
        $(".animation-box").animate({
            left: "500px"
        }, 700);
    });

    // ani2 버튼 클릭 → #12bfe7 박스를 원래 위치로 이동
    $("#ani2Btn").click(function () {
        $(".animation-box").animate({
            left: "0px"
        }, 700);
    });

});
