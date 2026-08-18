import React from 'react';
import {Swiper,SwiperSlide} from 'swiper/react';
import {Autoplay,EffectFade,Navigation,Pagination} from 'swiper/modules';
export default function HeroSlider(){
 const slides=[1,2,3,4,5];
 const go=id=>document.getElementById(id)?.scrollIntoView({behavior:'smooth'});
 return <section className="hero" id="home"><Swiper modules={[Autoplay,EffectFade,Navigation,Pagination]} effect="fade" loop autoplay={{delay:5200,disableOnInteraction:false}} navigation pagination={{clickable:true}} className="hero-swiper">{slides.map((n,i)=><SwiperSlide key={n}><div className="hero-slide" style={{backgroundImage:`linear-gradient(90deg,rgba(14,14,16,.48),rgba(14,14,16,.04)),url(${process.env.PUBLIC_URL}/images/hero0${n}.png)`}}><div className="hero-copy"><span className="kicker">2026 BRIDAL COLLECTION</span><h1>{i%2===0?<>FIND YOUR<br/>PERFECT DRESS</>:<>TIMELESS<br/>BEAUTY</>}</h1><p>가장 아름다운 순간을 위한 단 하나의 웨딩드레스</p><div className="hero-actions"><button className="light-btn" onClick={()=>go('collection')}>VIEW COLLECTION</button><button className="outline-btn" onClick={()=>go('reservation')}>RESERVATION</button></div></div></div></SwiperSlide>)}</Swiper></section>
}
