const models = [1,2,3].map((n) => ({ src: `${process.env.PUBLIC_URL}/images/model-${n}.jpg`, label: `Real Model 0${n}` }));

export default function ModelShowcase() {
  return (
    <section className="section" id="models">
      <div className="container">
        <div className="section-head">
          <div><span className="eyebrow">REAL MODEL</span><h2>실제 모델 무드로 보는 브랜드 이미지</h2></div>
          <p>첨부 시안의 모델 컷을 활용해, 넷플릭스의 콘텐츠 로우처럼 시선을 끄는 카드 구조로 재해석했습니다.</p>
        </div>
        <div className="model-row">
          {models.map((m) => (
            <article className="model-card" key={m.label}>
              <img src={m.src} alt={m.label} />
              <div className="model-card-info"><span>{m.label}</span><strong>View Story</strong></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
