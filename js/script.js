/* =========================================
   2DEPTH MEGA MENU
   - 주메뉴에 마우스를 올리면 전체 2단 메뉴 노출
   - JavaScript로 위 → 아래 드롭 애니메이션
========================================= */
const siteHeader = document.querySelector("#siteHeader");
const megaMenu = document.querySelector("#megaMenu");
const gnbItems = document.querySelectorAll(".gnb-item");

let megaAnimation = null;
let closeTimer = null;

function openMegaMenu() {
    clearTimeout(closeTimer);

    megaMenu.classList.add("is-open");
    megaMenu.setAttribute("aria-hidden", "false");

    if (megaAnimation) {
        megaAnimation.cancel();
    }

    megaAnimation = megaMenu.animate(
        [
            { opacity: 0, transform: "translateY(-32px)" },
            { opacity: 1, transform: "translateY(0)" }
        ],
        {
            duration: 330,
            easing: "cubic-bezier(.22,.75,.2,1)",
            fill: "forwards"
        }
    );
}

function closeMegaMenu() {
    clearTimeout(closeTimer);

    closeTimer = setTimeout(() => {
        if (megaAnimation) {
            megaAnimation.cancel();
        }

        megaAnimation = megaMenu.animate(
            [
                { opacity: 1, transform: "translateY(0)" },
                { opacity: 0, transform: "translateY(-22px)" }
            ],
            {
                duration: 190,
                easing: "ease-in",
                fill: "forwards"
            }
        );

        megaAnimation.onfinish = () => {
            megaMenu.classList.remove("is-open");
            megaMenu.setAttribute("aria-hidden", "true");
        };
    }, 70);
}

/* =========================================
   MAIN MENU MOUSE / KEYBOARD EVENT
========================================= */
gnbItems.forEach((item) => {
    item.addEventListener("mouseenter", () => {
        gnbItems.forEach((menu) => menu.classList.remove("is-active"));
        item.classList.add("is-active");
        openMegaMenu();
    });

    item.addEventListener("focusin", () => {
        gnbItems.forEach((menu) => menu.classList.remove("is-active"));
        item.classList.add("is-active");
        openMegaMenu();
    });
});

siteHeader.addEventListener("mouseleave", () => {
    gnbItems.forEach((menu) => menu.classList.remove("is-active"));
    closeMegaMenu();
});

siteHeader.addEventListener("focusout", (event) => {
    if (!siteHeader.contains(event.relatedTarget)) {
        gnbItems.forEach((menu) => menu.classList.remove("is-active"));
        closeMegaMenu();
    }
});

megaMenu.addEventListener("mouseenter", () => {
    clearTimeout(closeTimer);
});


/* =========================================
   SWIPER SLIDE INITIALIZE
   - 가로 방향
   - 로딩 후 3초마다 자동 이동
   - 무한 반복
   - 좌우 버튼
   - 1 / 3 페이지 표시
========================================= */
const mainSwiper = new Swiper(".mainSwiper", {
    direction: "horizontal",
    loop: true,
    speed: 900,
    slidesPerView: 1,
    spaceBetween: 0,

    /* =========================================
       AUTO PLAY
       3초마다 자동 실행
    ========================================== */
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
        pauseOnMouseEnter: false
    },

    /* =========================================
       LEFT / RIGHT BUTTON
    ========================================== */
    navigation: {
        prevEl: ".slide-control-prev",
        nextEl: ".slide-control-next"
    },

    /* =========================================
       PAGINATION
       1 / 3 형식
    ========================================== */
    pagination: {
        el: ".swiper-pagination",
        type: "fraction",
        renderFraction: function (currentClass, totalClass) {
            return `<span class="${currentClass}"></span> / <span class="${totalClass}"></span>`;
        }
    },

    /* =========================================
       USER INTERACTION
    ========================================== */
    grabCursor: true
});
