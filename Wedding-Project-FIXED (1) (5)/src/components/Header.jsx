import React,{useEffect,useState} from 'react';
export default function Header(){
 const [scrolled,setScrolled]=useState(false);
 useEffect(()=>{const f=()=>setScrolled(window.scrollY>40);window.addEventListener('scroll',f);return()=>window.removeEventListener('scroll',f)},[]);
 const go=id=>document.getElementById(id)?.scrollIntoView({behavior:'smooth'});
 return <header className={`header ${scrolled?'scrolled':''}`}><div className="nav-wrap"><button className="brand" onClick={()=>go('home')}><span className="brand-mark">E</span><span>MAISON ÉCLAT<small>BRIDAL</small></span></button><nav>{[['home','HOME'],['about','ABOUT'],['collection','BRIDAL SHOW'],['lookbook','LOOK BOOK'],['contact','CONTACT']].map(([id,label])=><button key={id} onClick={()=>go(id)}>{label}</button>)}</nav><button className="nav-cta" onClick={()=>go('reservation')}>RESERVATION</button></div></header>
}
