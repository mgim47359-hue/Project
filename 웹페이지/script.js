const form = document.querySelector(".contact-form");

const nameInput = document.querySelector('input[type="text"]');
const emailInput = document.querySelector('input[type="email"]');
const messageInput = document.querySelector(".form-textarea");

form.addEventListener("submit", function (e) {
  // 기본 submit 동작 방지
  e.preventDefault();

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const message = messageInput.value.trim();

  // 이름 검사
  if (name === "") {
    alert("이름을 입력해주세요.");
    nameInput.focus();
    return;
  }

  // 이메일 검사
  if (email === "") {
    alert("이메일을 입력해주세요.");
    emailInput.focus();
    return;
  }

  // 이메일 형식 검사
  const emailPattern =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email)) {
    alert("올바른 이메일 주소를 입력해주세요.");
    emailInput.focus();
    return;
  }

  // 메시지 검사
  if (message === "") {
    alert("메시지를 입력해주세요.");
    messageInput.focus();
    return;
  }

  // 전송 성공
  alert("정상적으로 제출되었습니다.");

  console.log("Your Name :", name);
  console.log("Your Email :", email);
  console.log("Your Message :", message);

  // 입력 내용 초기화
  form.reset();
});