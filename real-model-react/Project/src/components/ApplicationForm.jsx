import { useState } from 'react';

const initial = { name:'', phone:'', birth:'', category:'', message:'', privacy:false, marketing:false };

export default function ApplicationForm(){
  const [form,setForm]=useState(initial);
  const [status,setStatus]=useState('');
  const [loading,setLoading]=useState(false);
  const endpoint=process.env.REACT_APP_GOOGLE_SCRIPT_URL || '';
  const change=(e)=>{const {name,value,type,checked}=e.target;setForm(v=>({...v,[name]:type==='checkbox'?checked:value}));};
  const submit=async(e)=>{
    e.preventDefault(); setStatus('');
    if(!form.name || !form.phone || !form.birth || !form.category || !form.privacy){setStatus('필수 항목과 개인정보 동의를 확인해주세요.');return;}
    if(!endpoint){setStatus('데모 모드입니다. .env에 Google Apps Script URL을 연결하면 실제 저장됩니다.');return;}
    try{
      setLoading(true);
      await fetch(endpoint,{method:'POST',mode:'no-cors',headers:{'Content-Type':'application/json'},body:JSON.stringify({...form,submittedAt:new Date().toISOString()})});
      setStatus('지원 신청이 완료되었습니다. 담당자가 확인 후 연락드리겠습니다.');
      setForm(initial);
    }catch(err){setStatus('신청 처리 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.');}
    finally{setLoading(false);}
  };
  return <section className="section application-section" id="application"><div className="container application-grid">
    <div className="form-intro"><span className="eyebrow">APPLICATION</span><h2>리얼모델 지원하기</h2><p>필수 정보를 입력해주세요. 개인정보는 지원 검토 목적에 필요한 범위에서만 수집하도록 운영 정책을 구성하세요.</p><div className="form-note"><strong>지원 전 확인</strong><span>· 만 19세 이상 성인</span><span>· 필수 동의 확인</span><span>· 정확한 연락처 입력</span></div></div>
    <form className="application-form" onSubmit={submit}>
      <label>이름 *<input name="name" value={form.name} onChange={change} placeholder="이름을 입력해주세요" /></label>
      <label>연락처 *<input name="phone" value={form.phone} onChange={change} placeholder="010-0000-0000" /></label>
      <label>생년월일 *<input type="date" name="birth" value={form.birth} onChange={change} /></label>
      <label>지원분야 *<select name="category" value={form.category} onChange={change}><option value="">선택해주세요</option><option>눈성형</option><option>코성형</option><option>안면윤곽</option><option>가슴성형</option><option>지방이식</option></select></label>
      <label className="full">상담내용<textarea name="message" value={form.message} onChange={change} rows="5" placeholder="궁금한 점이나 상담 희망 내용을 적어주세요." /></label>
      <label className="check full"><input type="checkbox" name="privacy" checked={form.privacy} onChange={change}/><span>개인정보 수집 및 이용에 동의합니다. [필수]</span></label>
      <label className="check full"><input type="checkbox" name="marketing" checked={form.marketing} onChange={change}/><span>마케팅 정보 수신에 동의합니다. [선택]</span></label>
      <button className="btn full" type="submit" disabled={loading}>{loading?'신청 중...':'지원 신청하기'}</button>
      {status && <p className="form-status full" role="status">{status}</p>}
    </form>
  </div></section>
}
