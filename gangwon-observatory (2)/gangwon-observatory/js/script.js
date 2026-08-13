'use strict';

(function () {
  const gnb = document.querySelector('.gnb');
  const slides = Array.from(document.querySelectorAll('.slide'));
  const slideCurrent = document.querySelector('.slide-count .current');
  const tabButtons = Array.from(document.querySelectorAll('.tab-btn'));
  const tabPanels = Array.from(document.querySelectorAll('.tab-panel'));
  const popupOpenButton = document.querySelector('.popup-open');
  const popupOverlay = document.querySelector('.popup-overlay');
  const popup = document.querySelector('.layer-popup');
  const popupCloseButtons = Array.from(document.querySelectorAll('.popup-close'));
  let currentSlide = 0;
  let lastFocusedElement = null;

  function openMenu() {
    gnb.classList.add('open');
  }

  function closeMenu() {
    gnb.classList.remove('open');
  }

  gnb.addEventListener('mouseenter', openMenu);
  gnb.addEventListener('mouseleave', closeMenu);
  gnb.addEventListener('focusin', openMenu);
  gnb.addEventListener('focusout', function () {
    window.setTimeout(function () {
      if (!gnb.contains(document.activeElement)) {
        closeMenu();
      }
    }, 0);
  });

  function showSlide(index) {
    slides.forEach(function (slide, slideIndex) {
      slide.classList.toggle('active', slideIndex === index);
    });
    slideCurrent.textContent = String(index + 1).padStart(2, '0');
  }

  window.setInterval(function () {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }, 2800);

  tabButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      const targetId = button.getAttribute('aria-controls');

      tabButtons.forEach(function (item) {
        const isActive = item === button;
        item.classList.toggle('active', isActive);
        item.setAttribute('aria-selected', String(isActive));
      });

      tabPanels.forEach(function (panel) {
        const isTarget = panel.id === targetId;
        panel.classList.toggle('active', isTarget);
        panel.hidden = !isTarget;
      });
    });
  });

  function openPopup(event) {
    event.preventDefault();
    lastFocusedElement = document.activeElement;
    popupOverlay.classList.add('open');
    popupOverlay.setAttribute('aria-hidden', 'false');
    popup.focus();
  }

  function closePopup() {
    popupOverlay.classList.remove('open');
    popupOverlay.setAttribute('aria-hidden', 'true');
    if (lastFocusedElement) {
      lastFocusedElement.focus();
    }
  }

  popupOpenButton.addEventListener('click', openPopup);

  popupCloseButtons.forEach(function (button) {
    button.addEventListener('click', closePopup);
  });

  popupOverlay.addEventListener('click', function (event) {
    if (event.target === popupOverlay) {
      closePopup();
    }
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && popupOverlay.classList.contains('open')) {
      closePopup();
    }
  });

  document.querySelectorAll('a[href="#"]').forEach(function (link) {
    if (!link.classList.contains('popup-open')) {
      link.addEventListener('click', function (event) {
        event.preventDefault();
      });
    }
  });
}());
