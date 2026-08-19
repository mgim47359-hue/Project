document.addEventListener("DOMContentLoaded", function () {
    const familySite = document.querySelector(".family-site");
    const familyButton = document.querySelector(".family-button");

    familyButton.addEventListener("click", function () {
        const isOpen = familySite.classList.toggle("is-open");
        familyButton.setAttribute("aria-expanded", String(isOpen));
    });

    document.addEventListener("click", function (event) {
        if (!familySite.contains(event.target)) {
            familySite.classList.remove("is-open");
            familyButton.setAttribute("aria-expanded", "false");
        }
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            familySite.classList.remove("is-open");
            familyButton.setAttribute("aria-expanded", "false");
            familyButton.focus();
        }
    });
});
