const scrollToForm = () => {
  document.getElementById('application')?.scrollIntoView({ behavior: 'smooth' });
};

export default function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <a className="brand" href="#top" aria-label="홈으로 이동">
          <span className="brand-mark">R</span>
          <span>REAL MODEL</span>
        </a>
        <nav className="nav" aria-label="주요 메뉴">
          <a href="#models">모델모집</a>
          <a href="#categories">모집분야</a>
          <a href="#process">지원절차</a>
          <a href="#photo-guide">사진가이드</a>
        </nav>
        <button className="btn btn-small" onClick={scrollToForm}>모델 지원하기</button>
      </div>
    </header>
  );
}
