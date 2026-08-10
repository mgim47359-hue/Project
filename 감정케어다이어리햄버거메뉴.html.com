<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">

  <!-- 모바일 App 전용 설정 -->
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
  >

  <title>감정케어 다이어리</title>

  <style>
    /* ================================
       기본 설정
    ================================= */
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    html,
    body {
      width: 100%;
      min-height: 100%;
      font-family:
        Pretendard,
        "Noto Sans KR",
        Arial,
        sans-serif;
      color: #111;
      background: #ffffff;
    }

    body {
      overflow-x: hidden;
    }

    ul,
    li {
      list-style: none;
    }

    img {
      display: block;
    }

    a {
      color: inherit;
      text-decoration: none;
    }

    button {
      border: 0;
      background: none;
      font: inherit;
      cursor: pointer;
    }

    /* ================================
       전체 App
    ================================= */
    .app {
      position: relative;
      width: 100%;
      min-height: 100svh;
      background: #ffffff;
      overflow: hidden;
    }

    /* ================================
       상단 상태바
    ================================= */
    .status-bar {
      position: relative;
      z-index: 20;
      width: 100%;
      height: 44px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 22px 0 50px;
      background: #ffffff;
    }

    .status-time {
      font-size: 15px;
      font-weight: 800;
      letter-spacing: -0.3px;
    }

    .status-icons {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .status-icons img {
      object-fit: contain;
    }

    .icon-signal {
      width: 18px;
      height: 13px;
    }

    .icon-wifi {
      width: 17px;
      height: 13px;
    }

    .icon-battery {
      width: 24px;
      height: 12px;
    }

    /* ================================
       왼쪽 사이드 메뉴
    ================================= */
    .side-menu {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 10;
      width: 153px;
      min-height: 100%;
      background: #ffffff;
      border-right: 1px solid #f3f3f3;
      padding-top: 44px;
    }

    .side-menu-list {
      width: 100%;
    }

    .side-menu-item {
      width: 100%;
      height: 72px;
    }

    .side-menu-item a {
      width: 100%;
      height: 100%;
      display: grid;
      grid-template-columns: 56px 1fr;
      align-items: center;
      padding: 0 10px 0 12px;
    }

    .side-menu-item img {
      width: 25px;
      height: 25px;
      object-fit: contain;
      justify-self: center;
    }

    .side-menu-item span {
      font-size: 10px;
      font-weight: 700;
      line-height: 1.35;
      word-break: keep-all;
    }

    .side-menu-item.home {
      height: 48px;
    }

    .side-menu-item.home img {
      width: 22px;
      height: 22px;
    }

    .side-menu-item.home span {
      align-self: start;
      padding-top: 1px;
    }

    .side-menu-item.storage {
      margin-top: 4px;
      border-top: 1px solid #eeeeee;
      padding-top: 10px;
      height: 82px;
    }

    .side-menu-item.notice {
      margin-top: 2px;
    }

    .side-menu-item.inquiry {
      height: 76px;
      border-bottom: 1px solid #ffdfe3;
    }

    /* ================================
       오른쪽 메인 콘텐츠
    ================================= */
    .main-content {
      position: relative;
      width: calc(100% - 153px);
      min-height: 100svh;
      margin-left: 153px;
      padding-bottom: 70px;
      background: #ffffff;
    }

    /* ================================
       상단 헤더
    ================================= */
    .main-header {
      height: 76px;
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      padding: 16px 17px 0 8px;
    }

    .brand-area {
      display: flex;
      align-items: center;
      gap: 5px;
    }

    .brand-logo {
      width: 67px;
      height: 52px;
      object-fit: contain;
    }

    .brand-title {
      margin-top: 13px;
      font-size: 16px;
      font-weight: 800;
      line-height: 1;
      white-space: nowrap;
      letter-spacing: -0.8px;
    }

    .close-icon {
      width: 16px;
      height: 16px;
      object-fit: contain;
      margin-top: 10px;
    }

    .notification-icon {
      width: 22px;
      height: 22px;
      object-fit: contain;
      margin-top: 0;
    }

    /* ================================
       메인 배너
    ================================= */
    .hero-banner {
      width: calc(100% - 18px);
      margin: 0 9px;
    }

    .hero-banner img {
      width: 100%;
      height: 238px;
      object-fit: cover;
      border-radius: 8px 8px 0 0;
    }

    /* ================================
       기능 카드
    ================================= */
    .feature-section {
      display: grid;
      grid-template-columns: 1fr 1fr;
      column-gap: 22px;
      row-gap: 40px;
      padding: 23px 16px 0 7px;
    }

    .feature-card {
      min-width: 0;
    }

    .feature-icon-box {
      width: 76px;
      height: 67px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 5px;
      margin-bottom: 18px;
    }

    .feature-icon-box.purple {
      background: #eee8ff;
    }

    .feature-icon-box.green {
      background: #e8f5ec;
    }

    .feature-icon-box.pink {
      background: #fff0f2;
    }

    .feature-icon-box img {
      width: 29px;
      height: 29px;
      object-fit: contain;
    }

    .feature-title {
      margin-bottom: 11px;
      font-size: 16px;
      font-weight: 800;
      line-height: 1.35;
      letter-spacing: -0.6px;
      word-break: keep-all;
    }

    .feature-description {
      font-size: 10px;
      font-weight: 600;
      line-height: 1.8;
      letter-spacing: -0.35px;
      word-break: keep-all;
    }

    .security-card {
      grid-column: 2;
    }

    /* ================================
       하단 보안 배너
    ================================= */
    .security-banner-wrap {
      margin: 80px 70px 0 28px;
    }

    .security-banner-wrap img {
      width: 100%;
      height: auto;
      min-height: 150px;
      object-fit: cover;
      border-radius: 10px;
    }

    /* ================================
       아이폰 하단 홈 인디케이터
    ================================= */
    .home-indicator {
      position: fixed;
      left: 50%;
      bottom: 4px;
      z-index: 30;
      width: 134px;
      height: 5px;
      background: #000000;
      border-radius: 20px;
      transform: translateX(-50%);
    }
  </style>
</head>

<body>
  <div class="app">

    <!-- 상단 상태바 -->
    <div class="status-bar">
      <span class="status-time">9:41</span>

      <div class="status-icons">
        <img
          class="icon-signal"
          src="./imges/icon-signal.png"
          alt="통신 신호"
        >

        <img
          class="icon-wifi"
          src="./imges/icon-wifi.png"
          alt="와이파이"
        >

        <img
          class="icon-battery"
          src="./imges/icon-battery.png"
          alt="배터리"
        >
      </div>
    </div>

    <!-- 왼쪽 사이드 메뉴 -->
    <aside class="side-menu">
      <ul class="side-menu-list">

        <li class="side-menu-item home">
          <a href="./home.html">
            <img src="./imges/icon-home.png" alt="홈">
            <span>홈</span>
          </a>
        </li>

        <li class="side-menu-item">
          <a href="./emotion-record.html">
            <img src="./imges/icon-pencil.png" alt="감정 기록">
            <span>감정 기록</span>
          </a>
        </li>

        <li class="side-menu-item">
          <a href="./emotion-statistics.html">
            <img src="./imges/icon-chart.png" alt="감정 통계">
            <span>감정 통계</span>
          </a>
        </li>

        <li class="side-menu-item">
          <a href="./care.html">
            <img src="./imges/icon-heart.png" alt="추천 케어">
            <span>추천 케어</span>
          </a>
        </li>

        <li class="side-menu-item">
          <a href="./community.html">
            <img src="./imges/icon-community.png" alt="커뮤니티">
            <span>커뮤니티</span>
          </a>
        </li>

        <li class="side-menu-item storage">
          <a href="./record-storage.html">
            <img src="./imges/icon-document.png" alt="기록 보관함">
            <span>기록 보관함</span>
          </a>
        </li>

        <li class="side-menu-item">
          <a href="./mypage.html">
            <img src="./imges/icon-user.png" alt="마이페이지">
            <span>마이페이지</span>
          </a>
        </li>

        <li class="side-menu-item">
          <a href="./notification.html">
            <img src="./imges/icon-bell.png" alt="알림">
            <span>알림</span>
          </a>
        </li>

        <li class="side-menu-item">
          <a href="./setting.html">
            <img src="./imges/icon-setting.png" alt="설정">
            <span>설정</span>
          </a>
        </li>

        <li class="side-menu-item notice">
          <a href="./notice.html">
            <img src="./imges/icon-megaphone.png" alt="공지사항">
            <span>공지사항</span>
          </a>
        </li>

        <li class="side-menu-item inquiry">
          <a href="./inquiry.html">
            <img src="./imges/icon-info.png" alt="문의하기">
            <span>문의하기</span>
          </a>
        </li>

      </ul>
    </aside>

    <!-- 오른쪽 메인 화면 -->
    <main class="main-content">

      <!-- 헤더 -->
      <header class="main-header">
        <div class="brand-area">
          <img
            class="brand-logo"
            src="./imges/logo-flower-heart.png"
            alt="감정케어 다이어리 로고"
          >

          <h1 class="brand-title">감정케어 다이어리</h1>

          <img
            class="close-icon"
            src="./imges/icon-close.png"
            alt="메뉴 닫기"
          >
        </div>

        <img
          class="notification-icon"
          src="./imges/icon-bell.png"
          alt="알림"
        >
      </header>

      <!-- 메인 배너 -->
      <section class="hero-banner">
        <img
          src="./imges/emotion-care-main-banner.png"
          alt="감정을 이해하고 나를 더 사랑하는 시간"
        >
      </section>

      <!-- 주요 기능 -->
      <section class="feature-section">

        <article class="feature-card">
          <div class="feature-icon-box purple">
            <img
              src="./imges/icon-purple-chart.png"
              alt="감정 기록 통계"
            >
          </div>

          <h2 class="feature-title">감정 기록하기</h2>

          <p class="feature-description">
            나의 감정 패턴과 변화를<br>
            한눈에 확인해보세요.
          </p>
        </article>

        <article class="feature-card">
          <div class="feature-icon-box green">
            <img
              src="./imges/icon-green-leaf.png"
              alt="감정 케어"
            >
          </div>

          <h2 class="feature-title">감정 기록하기</h2>

          <p class="feature-description">
            당신의 감정에 맞는<br>
            케어 팁을 추천해드려요.
          </p>
        </article>

        <article class="feature-card security-card">
          <div class="feature-icon-box pink">
            <img
              src="./imges/icon-pink-lock.png"
              alt="안전한 보안"
            >
          </div>

          <h2 class="feature-title">안전한 보안</h2>

          <p class="feature-description">
            내 소중한 기록은<br>
            안전하게 보호돼요.
          </p>
        </article>

      </section>

      <!-- 하단 보안 배너 -->
      <section class="security-banner-wrap">
        <img
          src="./imges/security-setting-banner.png"
          alt="소중한 감정을 안전하게 보호하세요"
        >
      </section>

    </main>

    <!-- 아이폰 홈 인디케이터 -->
    <div class="home-indicator"></div>

  </div>
</body>
</html>