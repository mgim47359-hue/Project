import React from 'react';
export default function ReservationCTA(){return <section className="cta-banner"><div><span>READY TO FIND YOUR PERFECT DRESS?</span><h2>당신을 위한 드레스를<br/>직접 만나보세요.</h2><button className="light-btn" onClick={()=>document.getElementById('reservation')?.scrollIntoView({behavior:'smooth'})}>피팅 예약하기</button></div></section>}
