const data=[
 ['01','시술·수술 지원','선정된 모델을 대상으로 운영 정책에 따른 지원이 제공됩니다.'],
 ['02','전문 상담','의료진 상담을 통해 개인별 적합 여부를 확인합니다.'],
 ['03','개인 맞춤 진행','지원부터 상담까지 단계별로 안내합니다.'],
 ['04','체계적인 프로세스','서류 심사부터 최종 선정까지 과정을 명확하게 제공합니다.']
];
export default function Benefits(){return <section className="section soft-section"><div className="container"><div className="section-head"><div><span className="eyebrow">BENEFITS</span><h2>리얼모델 지원 혜택</h2></div></div><div className="benefit-grid">{data.map(([n,t,d])=><div className="benefit-card" key={t}><span>{n}</span><h3>{t}</h3><p>{d}</p></div>)}</div></div></section>}
