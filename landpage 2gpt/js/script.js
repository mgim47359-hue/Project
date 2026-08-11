document.addEventListener("DOMContentLoaded", function () {

  /* =========================
     DOM
  ========================== */

  const modal = document.getElementById("leadModal");

  const modalClose = document.getElementById("modalClose");

  const openButtons =
    document.querySelectorAll(".open-modal");

  const form =
    document.getElementById("leadForm");

  const formView =
    document.getElementById("formView");

  const successView =
    document.getElementById("successView");

  const successClose =
    document.getElementById("successClose");

  const modalTitle =
    document.getElementById("modalTitle");

  const modalDescription =
    document.getElementById("modalDescription");

  const submitButton =
    document.getElementById("submitButton");


  const nameInput =
    document.getElementById("name");

  const emailInput =
    document.getElementById("email");

  const phoneInput =
    document.getElementById("phone");

  const privacyInput =
    document.getElementById("privacy");


  const nameError =
    document.getElementById("nameError");

  const emailError =
    document.getElementById("emailError");

  const phoneError =
    document.getElementById("phoneError");

  const privacyError =
    document.getElementById("privacyError");


  let currentLeadType = "consult";


  /* =========================
     OPEN MODAL
  ========================== */

  openButtons.forEach(function (button) {

    button.addEventListener("click", function () {

      currentLeadType =
        button.dataset.type || "consult";

      resetForm();

      if (currentLeadType === "guide") {

        modalTitle.innerHTML =
          "실무에서 바로 사용하는<br>AI 협업 가이드를 받아보세요.";

        modalDescription.textContent =
          "간단한 정보를 남겨주시면 AI 협업 콘텐츠를 안내해드립니다.";

        submitButton.textContent =
          "AI 협업 가이드 받기";

      } else {

        modalTitle.innerHTML =
          "AI와 함께 더 똑똑하게<br>일할 준비가 되셨나요?";

        modalDescription.textContent =
          "간단한 정보를 남겨주시면 상담을 안내해드립니다.";

        submitButton.textContent =
          "무료 상담 신청하기";

      }


      modal.classList.add("active");

      document.body.style.overflow = "hidden";


      setTimeout(function () {
        nameInput.focus();
      }, 200);

    });

  });


  /* =========================
     CLOSE MODAL
  ========================== */

  function closeModal() {

    modal.classList.remove("active");

    document.body.style.overflow = "";

  }


  modalClose.addEventListener(
    "click",
    closeModal
  );


  successClose.addEventListener(
    "click",
    closeModal
  );


  modal.addEventListener(
    "click",
    function (event) {

      if (event.target === modal) {

        closeModal();

      }

    }
  );


  document.addEventListener(
    "keydown",
    function (event) {

      if (
        event.key === "Escape" &&
        modal.classList.contains("active")
      ) {

        closeModal();

      }

    }
  );


  /* =========================
     PHONE AUTO FORMAT
  ========================== */

  phoneInput.addEventListener(
    "input",
    function () {

      let value =
        this.value.replace(/[^0-9]/g, "");


      if (value.length > 11) {

        value =
          value.substring(0, 11);

      }


      if (value.length <= 3) {

        this.value = value;

      }

      else if (value.length <= 7) {

        this.value =
          value.slice(0, 3) +
          "-" +
          value.slice(3);

      }

      else {

        this.value =
          value.slice(0, 3) +
          "-" +
          value.slice(3, 7) +
          "-" +
          value.slice(7);

      }

    }
  );


  /* =========================
     VALIDATION
  ========================== */

  function validateName() {

    const value =
      nameInput.value.trim();


    if (value === "") {

      nameError.textContent =
        "이름을 입력해주세요.";

      nameInput.classList.add("error");

      return false;

    }


    if (value.length < 2) {

      nameError.textContent =
        "이름을 2자 이상 입력해주세요.";

      nameInput.classList.add("error");

      return false;

    }


    nameError.textContent = "";

    nameInput.classList.remove("error");

    return true;

  }


  function validateEmail() {

    const value =
      emailInput.value.trim();

    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (value === "") {

      emailError.textContent =
        "이메일 주소를 입력해주세요.";

      emailInput.classList.add("error");

      return false;

    }


    if (!emailPattern.test(value)) {

      emailError.textContent =
        "올바른 이메일 주소를 입력해주세요.";

      emailInput.classList.add("error");

      return false;

    }


    emailError.textContent = "";

    emailInput.classList.remove("error");

    return true;

  }


  function validatePhone() {

    const numbers =
      phoneInput.value.replace(
        /[^0-9]/g,
        ""
      );


    if (numbers === "") {

      phoneError.textContent =
        "전화번호를 입력해주세요.";

      phoneInput.classList.add("error");

      return false;

    }


    if (
      numbers.length < 10 ||
      numbers.length > 11
    ) {

      phoneError.textContent =
        "올바른 전화번호를 입력해주세요.";

      phoneInput.classList.add("error");

      return false;

    }


    phoneError.textContent = "";

    phoneInput.classList.remove("error");

    return true;

  }


  function validatePrivacy() {

    if (!privacyInput.checked) {

      privacyError.textContent =
        "개인정보 수집 및 이용에 동의해주세요.";

      return false;

    }


    privacyError.textContent = "";

    return true;

  }


  /* =========================
     REAL TIME VALIDATION
  ========================== */

  nameInput.addEventListener(
    "input",
    function () {

      if (nameError.textContent) {

        validateName();

      }

    }
  );


  emailInput.addEventListener(
    "input",
    function () {

      if (emailError.textContent) {

        validateEmail();

      }

    }
  );


  phoneInput.addEventListener(
    "input",
    function () {

      if (phoneError.textContent) {

        validatePhone();

      }

    }
  );


  privacyInput.addEventListener(
    "change",
    function () {

      if (privacyInput.checked) {

        privacyError.textContent = "";

      }

    }
  );


  /* =========================
     SUBMIT
  ========================== */

  form.addEventListener(
    "submit",
    function (event) {

      event.preventDefault();


      const nameValid =
        validateName();

      const emailValid =
        validateEmail();

      const phoneValid =
        validatePhone();

      const privacyValid =
        validatePrivacy();


      if (
        !nameValid ||
        !emailValid ||
        !phoneValid ||
        !privacyValid
      ) {

        return;

      }


      /* =====================
         실제 서버 전송 데이터
      ====================== */

      const customerData = {

        type: currentLeadType,

        name:
          nameInput.value.trim(),

        email:
          emailInput.value.trim(),

        phone:
          phoneInput.value.trim(),

        createdAt:
          new Date().toISOString()

      };


      console.log(
        "고객 신청 정보:",
        customerData
      );


      /*
        실제 백엔드가 연결되면
        아래와 같은 방식으로 전송할 수 있습니다.

        fetch("/api/lead", {

          method: "POST",

          headers: {
            "Content-Type":
              "application/json"
          },

          body:
            JSON.stringify(customerData)

        })
        .then(response => response.json())
        .then(data => {

          showSuccess();

        })
        .catch(error => {

          alert(
            "신청 중 오류가 발생했습니다."
          );

        });
      */


      /* 데모용 로딩 */

      submitButton.disabled = true;

      submitButton.textContent =
        "신청 정보를 전송하고 있습니다...";


      setTimeout(function () {

        showSuccess();

      }, 700);

    }
  );


  /* =========================
     SUCCESS
  ========================== */

  function showSuccess() {

    formView.style.display = "none";

    successView.classList.add(
      "active"
    );

  }


  /* =========================
     RESET
  ========================== */

  function resetForm() {

    form.reset();


    formView.style.display =
      "block";

    successView.classList.remove(
      "active"
    );


    nameError.textContent = "";

    emailError.textContent = "";

    phoneError.textContent = "";

    privacyError.textContent = "";


    nameInput.classList.remove(
      "error"
    );

    emailInput.classList.remove(
      "error"
    );

    phoneInput.classList.remove(
      "error"
    );


    submitButton.disabled = false;

  }

});