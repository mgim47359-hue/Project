const items = [
  ['01','눈성형','눈매와 인상을 고려한 상담'],
  ['02','코성형','얼굴의 균형을 고려한 상담'],
  ['03','안면윤곽','얼굴 라인 중심 상담'],
  ['04','가슴성형','개인 체형에 맞춘 상담'],
  ['05','지방이식','볼륨 개선 중심 상담']
];
export default function Categories(){
  return <section className="section" id="categories"><div className="container">
    <div className="section-head"><div><span className="eyebrow">CATEGORY</span><h2>모집 분야</h2></div><p>카드 위주의 밝은 Netflix 스타일로 한눈에 비교할 수 있게 구성했습니다.</p></div>
    <div className="category-grid">{items.map(([n,t,d])=><article className="category-card" key={t}><span>{n}</span><h3>{t}</h3><p>{d}</p><b>지원 가능 →</b></article>)}</div>
  </div></section>
}
