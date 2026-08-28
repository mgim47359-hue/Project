"use client";
import { useEffect, useMemo, useState } from "react";
import { Phone, Copy, MapPin, Sparkles, Scissors, Heart, Check, Save, ChevronRight } from "lucide-react";

const PHONE = "010-5888-4742", ACCOUNT = "091-999-555-444";
const scalpOptions = {
  dry:{label:"건조해요",icon:"💧",style:"촉촉한 레이어드 C컬",care:"저자극 수분 샴푸와 두피 보습 앰플로 당김을 줄여주세요.",tone:"수분 충전"},
  oily:{label:"유분이 많아요",icon:"🌿",style:"산뜻한 단발 허쉬컷",care:"딥클렌징은 주 1회만, 두피를 충분히 말려 유분 밸런스를 맞춰요.",tone:"산뜻 케어"},
  sensitive:{label:"민감해요",icon:"🌸",style:"두피 부담 적은 소프트 보브",care:"시술 전 민감도를 꼭 알리고, 저자극 제품으로 패치 테스트를 요청하세요.",tone:"진정 케어"},
  dandruff:{label:"각질이 보여요",icon:"❄️",style:"가벼운 볼륨 레이어",care:"손톱 대신 손끝으로 씻고 잔여물이 없도록 충분히 헹궈주세요.",tone:"밸런스 케어"},
  loss:{label:"탈모가 고민돼요",icon:"🍃",style:"뿌리 볼륨 리프컷",care:"강한 당김과 높은 열을 피하고, 가르마 방향을 부드럽게 바꿔주세요.",tone:"볼륨 케어"},
  normal:{label:"잘 모르겠어요",icon:"✨",style:"얼굴선을 살리는 내추럴 레이어",care:"상담으로 유·수분과 민감도를 먼저 확인한 뒤 시술을 결정해요.",tone:"기본 진단"},
} as const;
type ScalpKey=keyof typeof scalpOptions;
type RatingKey="service"|"greeting"|"clean"|"accuracy"|"scalp"|"overall";
type RecordItem={id:number;date:string;style:string;memo:string;scalp:string;ratings:Record<RatingKey,number>;average:string};
const ratingLabels:Record<RatingKey,string>={service:"서비스",greeting:"친절한 인사",clean:"매장 청결",accuracy:"시술 정확도",scalp:"두피 맞춤 관리",overall:"전체 만족도"};
function Stars({value,onChange}:{value:number;onChange:(n:number)=>void}){return <div className="stars" role="radiogroup" aria-label="별점 선택">{[1,2,3,4,5].map(n=><button key={n} type="button" className={n<=value?"on":""} onClick={()=>onChange(n)} aria-label={`${n}점`}>★</button>)}</div>}

export default function Home(){
 const [scalp,setScalp]=useState<ScalpKey>("normal");
 const [ratings,setRatings]=useState<Record<RatingKey,number>>({service:5,greeting:5,clean:5,accuracy:5,scalp:5,overall:5});
 const [styleName,setStyleName]=useState("내추럴 레이어드 C컬"),[memo,setMemo]=useState(""),[records,setRecords]=useState<RecordItem[]>([]),[notice,setNotice]=useState(""),[mapKey,setMapKey]=useState("");
 useEffect(()=>{const saved=localStorage.getItem("todayHairRecords");if(saved)setRecords(JSON.parse(saved));setMapKey(localStorage.getItem("kakaoMapKey")||"")},[]);
 const recommendation=scalpOptions[scalp],average=useMemo(()=>(Object.values(ratings).reduce((a,b)=>a+b,0)/6).toFixed(1),[ratings]);
 const flash=(text:string)=>{setNotice(text);window.setTimeout(()=>setNotice(""),2200)};
 const saveRecord=()=>{if(!styleName.trim())return flash("헤어스타일 이름을 입력해주세요.");const next=[{id:Date.now(),date:new Date().toLocaleDateString("ko-KR"),style:styleName.trim(),memo:memo.trim(),scalp:recommendation.label,ratings,average},...records];setRecords(next);localStorage.setItem("todayHairRecords",JSON.stringify(next));setMemo("");flash("헤어 기록을 저장했어요!")};
 const copyAccount=async()=>{await navigator.clipboard.writeText(ACCOUNT);flash("계좌번호를 복사했어요.")};
 const openMap=()=>{if(!mapKey.trim())return flash("먼저 카카오 JavaScript 키를 입력해주세요.");localStorage.setItem("kakaoMapKey",mapKey.trim());window.open("https://map.kakao.com/?q="+encodeURIComponent("가까운 미용실"),"_blank","noopener,noreferrer")};
 return <main>
  {notice&&<div className="toast"><Check size={17}/>{notice}</div>}
  <header><div className="brand"><span><Scissors size={18}/></span>오늘의 헤어</div><div className="date">TODAY · {new Date().toLocaleDateString("ko-KR",{month:"long",day:"numeric"})}</div></header>
  <section className="hero"><div className="hero-copy"><p className="eyebrow"><Sparkles size={14}/> SCALP-FIRST BEAUTY</p><h1>오늘, 나에게<br/><em>가장 편안한 헤어</em></h1><p>두피 컨디션부터 살펴보고 부담은 덜고, 나다운 아름다움은 더해보세요.</p></div><div className="portrait" aria-label="헤어스타일 일러스트"><div className="halo"/><div className="hair">✦</div><div className="portrait-label">TODAY&apos;S<br/>MOOD</div></div></section>
  <section className="section scalp-section"><div className="section-title"><div><span>01 · SCALP CHECK</span><h2>오늘 두피는 어떤가요?</h2></div><p>하나만 골라주세요</p></div>
   <div className="scalp-grid">{Object.entries(scalpOptions).map(([key,item])=><button key={key} className={scalp===key?"selected":""} onClick={()=>setScalp(key as ScalpKey)}><i>{item.icon}</i><b>{item.label}</b>{scalp===key&&<Check size={15}/>}</button>)}</div>
   <article className="recommendation"><div className="rec-number">{recommendation.icon}</div><div><span>{recommendation.tone}</span><h3>{recommendation.style}</h3><p>{recommendation.care}</p></div><ChevronRight className="chev"/></article>
   <p className="medical-note">두피 추천은 의료 진단이 아닌 생활 관리 참고 정보입니다. 통증·염증이 지속되면 의료진과 상담하세요.</p>
  </section>
  <section className="section rating-section"><div className="section-title"><div><span>02 · HAIR JOURNAL</span><h2>마음에 든 헤어 기록</h2></div><div className="score"><b>{average}</b><small>/ 5.0</small></div></div>
   <label className="field"><span>헤어스타일 이름</span><input value={styleName} onChange={e=>setStyleName(e.target.value)} placeholder="예: 레이어드 C컬"/></label>
   <div className="rating-list">{(Object.keys(ratingLabels) as RatingKey[]).map(key=><div className="rating-row" key={key}><div><b>{ratingLabels[key]}</b>{key==="clean"&&<small>바닥·도구·좌석</small>}{key==="accuracy"&&<small>실수 없이 요청 반영</small>}</div><Stars value={ratings[key]} onChange={n=>setRatings({...ratings,[key]:n})}/></div>)}</div>
   <label className="field"><span>기억하고 싶은 점</span><textarea value={memo} onChange={e=>setMemo(e.target.value)} placeholder="스타일, 디자이너, 좋았던 서비스를 기록해보세요."/></label>
   <button className="primary" onClick={saveRecord}><Save size={18}/> 이 헤어 기록 저장하기</button>
  </section>
  {records.length>0&&<section className="section history"><div className="section-title"><div><span>MY FAVORITES</span><h2>저장한 헤어</h2></div><p>{records.length}개의 기록</p></div><div className="history-list">{records.slice(0,4).map(r=><article key={r.id}><div className="mini-heart"><Heart size={17} fill="currentColor"/></div><div><span>{r.date} · {r.scalp}</span><h3>{r.style}</h3><p>{r.memo||"마음에 들었던 헤어 기록"}</p></div><b>{r.average}</b></article>)}</div></section>}
  <section className="section contact-section"><div className="section-title"><div><span>03 · DESIGNER</span><h2>디자이너에게 바로 연락</h2></div></div><div className="contact-card"><div className="designer-mark">H</div><div><span>MY HAIR DESIGNER</span><h3>오늘의 헤어 디자이너</h3><p>상담 전에 원하는 스타일과 두피 상태를 알려주세요.</p></div></div><div className="actions"><a href={`tel:${PHONE}`} className="call"><Phone size={18}/> 전화하기 <b>{PHONE}</b></a><button onClick={copyAccount}><Copy size={18}/> 계좌번호 복사 <b>{ACCOUNT}</b></button></div><div className="payment-note">입금 전 디자이너와 금액·예약 내용을 반드시 확인해주세요.</div></section>
  <section className="section map-section"><div className="section-title"><div><span>04 · KAKAO MAP</span><h2>카카오맵 연결</h2></div><MapPin/></div><div className="map-placeholder"><div className="map-lines"/><div className="pin"><MapPin size={24} fill="currentColor"/></div><div className="map-label"><b>가까운 미용실 찾기</b><span>카카오맵에서 확인하세요</span></div></div><label className="field key-field"><span>카카오 JavaScript 키</span><input type="password" value={mapKey} onChange={e=>setMapKey(e.target.value)} placeholder="여기에 JavaScript 키 입력"/><small>키는 이 기기에만 저장되며 화면에 공개되지 않아요.</small></label><button className="map-button" onClick={openMap}><MapPin size={18}/> 키 저장하고 카카오맵 열기</button><details><summary>개발 코드에서 키를 넣을 위치</summary><code>NEXT_PUBLIC_KAKAO_MAP_KEY=여기에_JavaScript_키_입력</code><p>카카오 개발자 콘솔에서 현재 사이트 주소를 Web 플랫폼 도메인으로 등록하세요.</p></details></section>
  <footer><Scissors size={18}/><b>오늘의 헤어</b><p>나를 더 잘 이해하는 헤어 기록</p></footer>
 </main>
}
