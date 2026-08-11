export default function Hero() {
  const go = () => document.getElementById('application')?.scrollIntoView({ behavior: 'smooth' });
  return (
    <section className="hero" id="top">
      <div className="container hero-grid">
        <div className="hero-copy">
          <span className="eyebrow">YOU'RE TURN · REAL MODEL RECRUIT</span>
          <h1>당신의 변화가<br />새로운 이야기가 됩니다.</h1>
          <p>밝고 세련된 무드로 다시 구성한 리얼모델 모집 랜딩페이지입니다. 모집 조건과 절차를 확인하고 간편하게 지원해보세요.</p>
          <div className="hero-actions">
            <button className="btn" onClick={go}>리얼모델 지원하기</button>
            <a className="text-link" href="#models">모집 내용 보기 →</a>
          </div>
          <div className="hero-meta">
            <div><strong>상시모집</strong><span>모집기간</span></div>
            <div><strong>19+</strong><span>성인 지원</span></div>
            <div><strong>5 STEP</strong><span>지원 절차</span></div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-orb"></div>
          <img src={`${process.env.PUBLIC_URL}/images/hero-model.jpg`} alt="리얼모델 모집 이미지" />
          <div className="hero-badge">REAL<br/>MODEL</div>
        </div>
      </div>
    </section>
  );
}
