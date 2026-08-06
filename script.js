const body = document.body;
const sideMenu = document.getElementById("sideMenu");
const openButton = document.getElementById("menuOpenButton");
const closeButton = document.getElementById("menuCloseButton");
const overlay = document.getElementById("menuOverlay");

let lastFocusedElement = null;

function openMenu() {
  lastFocusedElement = document.activeElement;

  sideMenu.classList.add("is-open");
  overlay.classList.add("is-visible");
  body.classList.add("menu-open");

  sideMenu.setAttribute("aria-hidden", "false");
  openButton.setAttribute("aria-expanded", "true");
  overlay.setAttribute("tabindex", "0");

  closeButton.focus();
}

function closeMenu() {
  sideMenu.classList.remove("is-open");
  overlay.classList.remove("is-visible");
  body.classList.remove("menu-open");

  sideMenu.setAttribute("aria-hidden", "true");
  openButton.setAttribute("aria-expanded", "false");
  overlay.setAttribute("tabindex", "-1");

  if (lastFocusedElement) {
    lastFocusedElement.focus();
  } else {
    openButton.focus();
  }
}

function keepFocusInsideMenu(event) {
  if (!sideMenu.classList.contains("is-open") || event.key !== "Tab") {
    return;
  }

  const focusableElements = sideMenu.querySelectorAll(
    'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
  );

  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  if (event.shiftKey && document.activeElement === firstElement) {
    event.preventDefault();
    lastElement.focus();
  } else if (!event.shiftKey && document.activeElement === lastElement) {
    event.preventDefault();
    firstElement.focus();
  }
}

openButton.addEventListener("click", openMenu);
closeButton.addEventListener("click", closeMenu);
overlay.addEventListener("click", closeMenu);

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" && sideMenu.classList.contains("is-open")) {
    closeMenu();
  }

  keepFocusInsideMenu(event);
});

window.addEventListener("resize", function () {
  if (window.innerWidth > 900 && sideMenu.classList.contains("is-open")) {
    closeMenu();
  }
});
