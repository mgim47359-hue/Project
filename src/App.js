import React, { useEffect, useMemo, useState } from 'react';
import { APP_CONFIG } from './config';

const topics = [
  {
    no: '01',
    eyebrow: 'WORK SMARTER',
    title: 'AI로 일하는 방식이 어떻게 달라지는가',
    message: '막막함은 줄이고, 일은 더 빠르고 똑똑하게',
    description: '자료 조사부터 초안 작성, 요약, 아이디어 확장까지. AI를 단순 검색 도구가 아니라 함께 일하는 업무 파트너로 바꿉니다.',
    examples: ['자료 조사', '회의록 요약', '이메일 초안', '보고서 구조화'],
  },
  {
    no: '02',
    eyebrow: 'USE IT TODAY',
    title: '직장인을 위한 실무형 AI 협업법',
    message: '이론이 아니라, 오늘 바로 써먹는 AI 활용',
    description: '복잡한 기능 설명 대신 실제 업무 상황을 기준으로 목적 설정 → 역할 부여 → 초안 생성 → 검토의 흐름을 익힙니다.',
    examples: ['목적 정의', '역할 부여', '초안 생성', '검토·수정'],
  },
  {
    no: '03',
    eyebrow: 'BUILD YOUR BRAND',
    title: 'AI와 함께 더 창의적으로 일하는 사람의 브랜드',
    message: '생산성을 넘어, 더 가치 있는 일에 집중하는 사람',
    description: 'AI로 반복 업무 시간을 줄이고 기획, 판단, 전략, 문제 해결에 더 많은 시간을 투자해 나만의 업무 경쟁력과 브랜드를 만듭니다.',
    examples: ['생산성', '창의성', '전문성', '개인 브랜드'],
  },
];

const benefits = [
  ['01', '업무 시간 절약', '반복적인 정리와 초안 작업을 줄여 핵심 업무 시간을 확보합니다.'],
  ['02', '결과물 품질 향상', 'AI 초안을 사람의 판단과 전문성으로 검토해 완성도를 높입니다.'],
  ['03', '아이디어 확장', '한 가지 관점에서 벗어나 더 다양한 방향을 빠르게 탐색합니다.'],
  ['04', '업무 자신감', '나에게 맞는 AI 협업 루틴을 만들고 실무 활용 감각을 키웁니다.'],
];

function App() {
  const [modal, setModal] = useState(null);

  useEffect(() => {
    document.body.style.overflow = modal ? 'hidden' : '';
    const onKey = (e) => e.key === 'Escape' && setModal(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [modal]);

  const openModal = (type) => setModal(type);

  return (
    <div className="app">
      <Header onOpen={() => openModal('consult')} />
      <main>
        <Hero onOpen={openModal} />
        <ProblemSection />
        <TopicSections />
        <Benefits />
        <FinalCta onOpen={openModal} />
      </main>
      <Footer />
      {modal && <LeadModal type={modal} onClose={() => setModal(null)} />}
    </div>
  );
}

function Header({ onOpen }) {
  return (
    <header className="header">
      <div className="container headerInner">
        <a href="#top" className="brand">WORK <span>WITH AI</span></a>
        <nav className="nav" aria-label="주요 메뉴">
          <a href="#change">AI 업무 방식</a>
          <a href="#method">실무 협업법</a>
          <a href="#brand">개인 브랜드</a>
        </nav>
        <button className="button small primary" onClick={onOpen}>무료 상담 신청</button>
      </div>
    </header>
  );
}

function Hero({ onOpen }) {
  return (
    <section className="hero" id="top">
      <div className="heroGlow glowOne" />
      <div className="heroGlow glowTwo" />
      <div className="container heroGrid">
        <div className="heroCopy">
          <span className="pill">AI WORK COLLABORATION</span>
          <h1>AI 때문에 막막했던 업무,<br /><em>이제 AI와 함께</em><br />해결하세요.</h1>
          <p>실무에서 바로 적용하는 AI 협업법으로 반복 업무는 줄이고,<br />더 가치 있고 창의적인 일에 집중하세요.</p>
          <div className="heroActions">
            <button className="button primary" onClick={() => onOpen('consult')}>무료 상담 신청하기 <span>→</span></button>
            <button className="button secondary" onClick={() => onOpen('guide')}>AI 협업 가이드 받기</button>
          </div>
          <div className="heroMeta">
            <span><b>01</b> 실무 중심</span><span><b>02</b> 바로 적용</span><span><b>03</b> 생산성 향상</span>
          </div>
        </div>
        <HeroDashboard />
      </div>
    </section>
  );
}

function HeroDashboard() {
  const tasks = [
    ['✓', '회의 내용 정리', 'AI 자동 요약 완료', '완료'],
    ['✦', '기획 아이디어 확장', '새로운 관점 탐색 중', '진행'],
    ['✓', '이메일 초안 작성', '업무 이메일 초안 완료', '완료'],
  ];
  return (
    <div className="visualWrap" aria-hidden="true">
      <div className="floatingBadge topBadge"><span>AI</span><div><b>Smart Work</b><small>더 똑똑하게 일하기</small></div></div>
      <div className="dashboard">
        <div className="dashHead"><div><small>TODAY WORK</small><h3>AI와 함께하는 업무</h3></div><span>ACTIVE</span></div>
        <div className="taskList">
          {tasks.map((task) => <div className="task" key={task[1]}><i>{task[0]}</i><div><b>{task[1]}</b><small>{task[2]}</small></div><span className={task[3] === '완료' ? 'done' : 'doing'}>{task[3]}</span></div>)}
        </div>
        <div className="focus"><div><span>오늘 확보한 집중 시간</span><b>2.5 HOURS</b></div><div className="bar"><i /></div></div>
      </div>
      <div className="floatingBadge bottomBadge"><b>+ Creative Time</b><small>창의적인 업무에 집중</small></div>
    </div>
  );
}

function ProblemSection() {
  const problems = [
    ['01', '어디서부터 시작해야 할지 막막해요', 'AI 기능은 많지만 내 업무에서 무엇부터 활용해야 하는지 모르겠습니다.'],
    ['02', '써봐도 생각보다 시간이 오래 걸려요', '원하는 결과가 나오지 않아 질문을 반복하다 오히려 시간이 더 걸립니다.'],
    ['03', '내 업무에 맞는 활용법을 모르겠어요', '인터넷의 예시는 많지만 실제 나의 업무 흐름에 적용하기는 어렵습니다.'],
  ];
  return (
    <section className="section white">
      <div className="container">
        <SectionTitle label="WHY AI?" title={<>AI는 써봤는데,<br /><em>왜 내 업무는 그대로일까요?</em></>} desc="AI 도구를 아는 것과 AI를 업무에 제대로 활용하는 것은 다릅니다." />
        <div className="cardGrid three">
          {problems.map(([no, title, desc]) => <article className="softCard problemCard" key={no}><span className="cornerNo">{no}</span><div className="iconBox">{no}</div><h3>{title}</h3><p>{desc}</p></article>)}
        </div>
      </div>
    </section>
  );
}

function TopicSections() {
  return (
    <>
      {topics.map((topic, index) => (
        <section className={`topicSection ${index === 1 ? 'white' : 'soft'}`} id={index === 0 ? 'change' : index === 1 ? 'method' : 'brand'} key={topic.no}>
          <div className={`container topicGrid ${index % 2 ? 'reverse' : ''}`}>
            <div className="topicCopy">
              <span className="pill">TOPIC {topic.no}</span>
              <small className="micro">{topic.eyebrow}</small>
              <h2>{topic.title}</h2>
              <h3>{topic.message}</h3>
              <p>{topic.description}</p>
            </div>
            <div className="topicVisual">
              <div className="topicVisualHead"><span>AI WORK FLOW</span><b>0{index + 1}</b></div>
              <div className="topicSteps">
                {topic.examples.map((item, i) => <div className="topicStep" key={item}><span>{String(i + 1).padStart(2, '0')}</span><b>{item}</b><i>→</i></div>)}
              </div>
              <div className="topicResult"><span>RESULT</span><strong>{index === 0 ? '더 빠르고 똑똑한 업무' : index === 1 ? '오늘 바로 적용하는 협업 루틴' : '더 가치 있는 일에 집중'}</strong></div>
            </div>
          </div>
        </section>
      ))}
    </>
  );
}

function Benefits() {
  return (
    <section className="section white">
      <div className="container">
        <SectionTitle label="YOUR BENEFIT" title={<>AI와 함께 일하면<br /><em>이런 변화가 시작됩니다.</em></>} />
        <div className="cardGrid four">
          {benefits.map(([no, title, desc]) => <article className="softCard benefitCard" key={no}><div className="iconBox">{no}</div><h3>{title}</h3><p>{desc}</p></article>)}
        </div>
      </div>
    </section>
  );
}

function SectionTitle({ label, title, desc }) {
  return <div className="sectionTitle"><span className="pill">{label}</span><h2>{title}</h2>{desc && <p>{desc}</p>}</div>;
}

function FinalCta({ onOpen }) {
  return (
    <section className="finalCta">
      <div className="container finalInner">
        <span>START YOUR AI WORK</span>
        <h2>AI 때문에 막막했던 업무,<br /><strong>이제 함께 해결해보세요.</strong></h2>
        <p>오늘부터 바로 사용할 수 있는 AI 협업 방법으로 당신의 일하는 방식을 바꿔보세요.</p>
        <div className="heroActions centerActions"><button className="button whiteButton" onClick={() => onOpen('consult')}>무료 상담 신청하기 →</button><button className="button ghostButton" onClick={() => onOpen('guide')}>AI 협업 가이드 받기</button></div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer"><div className="container footerGrid"><div><a className="brand light" href="#top">WORK <span>WITH AI</span></a><p>실무에서 바로 적용하는 AI 협업 방법으로<br />더 가치 있는 일에 집중하세요.</p></div><div className="footerLinks"><a href="#change">서비스 소개</a><a href="#privacy">개인정보처리 안내</a><a href="mailto:hello@example.com">문의하기</a></div></div><div className="container copyright">© 2026 WORK WITH AI. All Rights Reserved.</div></footer>
  );
}

function LeadModal({ type, onClose }) {
  const initialForm = useMemo(() => ({ name: '', email: '', phone: '', privacy: false }), []);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const isGuide = type === 'guide';

  const change = (e) => {
    const { name, value, checked, type: inputType } = e.target;
    let next = inputType === 'checkbox' ? checked : value;
    if (name === 'phone') next = formatPhone(value);
    setForm((prev) => ({ ...prev, [name]: next }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const next = {};
    if (form.name.trim().length < 2) next.name = '이름을 2자 이상 입력해주세요.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) next.email = '올바른 이메일 주소를 입력해주세요.';
    const phone = form.phone.replace(/\D/g, '');
    if (phone.length < 10 || phone.length > 11) next.phone = '올바른 전화번호를 입력해주세요.';
    if (!form.privacy) next.privacy = '개인정보 수집 및 이용에 동의해주세요.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    if (!APP_CONFIG.googleScriptUrl) {
      setErrors({ submit: 'Google Apps Script URL이 아직 설정되지 않았습니다. src/config.js 또는 환경변수에 URL을 등록해주세요.' });
      return;
    }
    setStatus('loading');
    try {
      const body = new URLSearchParams({
        type,
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        consent: 'Y',
        source: window.location.href,
      });
      await fetch(APP_CONFIG.googleScriptUrl, { method: 'POST', mode: 'no-cors', body });
      setStatus('success');
    } catch (error) {
      setStatus('idle');
      setErrors({ submit: '전송 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' });
    }
  };

  return (
    <div className="modalOverlay" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="leadTitle">
        <button className="closeBtn" onClick={onClose} aria-label="닫기">×</button>
        {status === 'success' ? (
          <div className="success"><div className="successIcon">✓</div><span className="pill">COMPLETE</span><h2>신청이 완료되었습니다.</h2><p>{isGuide ? '입력해주신 정보를 확인한 후 AI 협업 콘텐츠를 안내드리겠습니다.' : '입력해주신 정보를 확인한 후 상담 안내를 드리겠습니다.'}</p><button className="button primary full" onClick={onClose}>확인</button></div>
        ) : (
          <>
            <span className="pill">START WITH AI</span>
            <h2 id="leadTitle">{isGuide ? <>실무 AI 협업 가이드를<br />받아보세요.</> : <>AI와 함께 더 똑똑하게<br />일할 준비가 되셨나요?</>}</h2>
            <p className="modalDesc">{isGuide ? '간단한 정보를 남겨주시면 실무 콘텐츠를 안내해드립니다.' : '간단한 정보를 남겨주시면 상담을 안내해드립니다.'}</p>
            <form onSubmit={submit} noValidate>
              <Field label="이름" name="name" value={form.name} onChange={change} placeholder="이름을 입력해주세요" error={errors.name} />
              <Field label="이메일 주소" name="email" type="email" value={form.email} onChange={change} placeholder="example@email.com" error={errors.email} />
              <Field label="전화번호" name="phone" type="tel" value={form.phone} onChange={change} placeholder="010-1234-5678" error={errors.phone} />
              <label className="checkRow"><input type="checkbox" name="privacy" checked={form.privacy} onChange={change} /><span>개인정보 수집 및 이용에 동의합니다. <b>(필수)</b></span></label>
              {errors.privacy && <p className="errorText">{errors.privacy}</p>}
              {errors.submit && <p className="errorBox">{errors.submit}</p>}
              <button className="button primary full" disabled={status === 'loading'}>{status === 'loading' ? '전송 중...' : isGuide ? 'AI 협업 가이드 받기' : '무료 상담 신청하기'}</button>
            </form>
            <p className="privacyNote" id="privacy">입력 정보는 상담 및 콘텐츠 제공 목적으로만 사용하도록 설계했습니다.</p>
          </>
        )}
      </div>
    </div>
  );
}

function Field({ label, name, type = 'text', value, onChange, placeholder, error }) {
  return <div className="field"><label htmlFor={name}>{label} <b>*</b></label><input id={name} name={name} type={type} value={value} onChange={onChange} placeholder={placeholder} className={error ? 'inputError' : ''} />{error && <p className="errorText">{error}</p>}</div>;
}

function formatPhone(value) {
  const numbers = value.replace(/\D/g, '').slice(0, 11);
  if (numbers.length <= 3) return numbers;
  if (numbers.length <= 7) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
  return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7)}`;
}

export default App;
