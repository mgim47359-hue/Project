/* =====================================================
   1. API 키 입력 위치
   ===================================================== */

// 공공데이터포털에서 발급받은 일반 인증키(Decoding)를 입력하세요.
const BUSAN_FOOD_SERVICE_KEY = "여기에_공공데이터_SERVICE_KEY_입력";

// 카카오 개발자 사이트의 JavaScript 키를 입력하세요.
const KAKAO_MAP_JAVASCRIPT_KEY = "c1150e850c41fd7881e31f1d2ab6391e";

const API_BASE_URL = "https://apis.data.go.kr/6260000/FoodService";
const FALLBACK_IMAGE = "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 520"><defs><linearGradient id="g" x2="1" y2="1"><stop stop-color="#d9ebe6"/><stop offset="1" stop-color="#6fa8a0"/></linearGradient></defs><rect width="800" height="520" fill="url(#g)"/><circle cx="400" cy="260" r="150" fill="#fff" opacity=".85"/><text x="400" y="275" text-anchor="middle" font-family="sans-serif" font-size="45" font-weight="700" fill="#174b55">BUSAN FOOD</text></svg>`);

const DEMO_FOODS = [
  {UC_SEQ:"1",MAIN_TITLE:"영동밀면&돼지국밥",GUGUN_NM:"동구",LAT:"35.1154",LNG:"129.0401",ADDR1:"부산광역시 동구 중앙대로209번길 12",CNTCT_TEL:"051-000-0001",USAGE_DAY_WEEK_AND_TIME:"매일 10:00 - 21:00",RPRSNTV_MENU:"물밀면 · 돼지국밥 · 손만두",MAIN_IMG_NORMAL:"https://tong.visitkorea.or.kr/cms/resource/88/2869388_image2_1.jpg",MAIN_IMG_THUMB:"https://tong.visitkorea.or.kr/cms/resource/88/2869388_image2_1.jpg",ITEMCNTNTS:"부산역 인근에서 부산의 대표 음식인 밀면과 돼지국밥을 함께 맛볼 수 있는 곳입니다."},
  {UC_SEQ:"2",MAIN_TITLE:"해운대 바다식당",GUGUN_NM:"해운대구",LAT:"35.1595",LNG:"129.1604",ADDR1:"부산광역시 해운대구 해운대해변로",CNTCT_TEL:"051-000-0002",USAGE_DAY_WEEK_AND_TIME:"매일 11:00 - 22:00",RPRSNTV_MENU:"모둠회 · 해산물 한상",MAIN_IMG_NORMAL:"https://static.cdn.kmong.com/members/portfolios/yyWh81756087151.jpg",MAIN_IMG_THUMB:"https://static.cdn.kmong.com/members/portfolios/yyWh81756087151.jpg",ITEMCNTNTS:"해운대 바다의 분위기와 함께 신선한 부산 해산물을 즐기는 맛집입니다."},
  {UC_SEQ:"3",MAIN_TITLE:"남포 씨앗호떡",GUGUN_NM:"중구",LAT:"35.0987",LNG:"129.0304",ADDR1:"부산광역시 중구 비프광장로",CNTCT_TEL:"051-000-0003",USAGE_DAY_WEEK_AND_TIME:"매일 12:00 - 22:00",RPRSNTV_MENU:"씨앗호떡",MAIN_IMG_NORMAL:"https://koreannerdmkhome.files.wordpress.com/2019/05/image-18.png",MAIN_IMG_THUMB:"https://koreannerdmkhome.files.wordpress.com/2019/05/image-18.png",ITEMCNTNTS:"고소한 견과와 달콤한 꿀이 어우러진 부산 대표 길거리 간식을 만날 수 있습니다."},
  {UC_SEQ:"4",MAIN_TITLE:"광안리 언양불고기",GUGUN_NM:"수영구",LAT:"35.1532",LNG:"129.1187",ADDR1:"부산광역시 수영구 광안해변로",CNTCT_TEL:"051-000-0004",USAGE_DAY_WEEK_AND_TIME:"화-일 11:30 - 21:30",RPRSNTV_MENU:"언양식 불고기",MAIN_IMG_NORMAL:"https://grandmabites.com/assets/images/1754780821878-9mame3fu.jpg",MAIN_IMG_THUMB:"https://grandmabites.com/assets/images/1754780821878-9mame3fu.jpg",ITEMCNTNTS:"숯불 향을 입힌 담백한 불고기와 정갈한 반찬을 맛볼 수 있는 곳입니다."},
  {UC_SEQ:"5",MAIN_TITLE:"초량 이바구어묵",GUGUN_NM:"동구",LAT:"35.1168",LNG:"129.0392",ADDR1:"부산광역시 동구 초량상로",CNTCT_TEL:"",USAGE_DAY_WEEK_AND_TIME:"월-토 09:00 - 20:00",RPRSNTV_MENU:"부산어묵 · 어묵탕",MAIN_IMG_NORMAL:"https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full/93/MTA-10547183/choripdong_odeng_atau_korean_fish_cake_daebong_900g_-_pempek_atau_otak_otak_korea_full02_mgu62ycr.jpg",MAIN_IMG_THUMB:"https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full/93/MTA-10547183/choripdong_odeng_atau_korean_fish_cake_daebong_900g_-_pempek_atau_otak_otak_korea_full02_mgu62ycr.jpg",ITEMCNTNTS:"쫄깃한 부산어묵과 따뜻한 국물을 가볍게 즐길 수 있습니다."},
  {UC_SEQ:"6",MAIN_TITLE:"기장 멸치쌈밥",GUGUN_NM:"기장군",LAT:"35.2446",LNG:"129.2224",ADDR1:"부산광역시 기장군 기장읍",CNTCT_TEL:"051-000-0006",USAGE_DAY_WEEK_AND_TIME:"매일 10:30 - 20:30",RPRSNTV_MENU:"멸치쌈밥 · 멸치회",MAIN_IMG_NORMAL:"https://static.cdn.kmong.com/members/portfolios/yyWh81756087151.jpg",MAIN_IMG_THUMB:"https://static.cdn.kmong.com/members/portfolios/yyWh81756087151.jpg",ITEMCNTNTS:"기장의 제철 멸치를 쌈 채소와 함께 푸짐하게 즐기는 향토 음식점입니다."}
];

const state = { foods:[], query:"", region:"전체", onlyFavorites:false, favorites:JSON.parse(localStorage.getItem("busan-food-favorites") || "[]"), selected:null, demo:true };
const $ = selector => document.querySelector(selector);

document.addEventListener("DOMContentLoaded", () => {
  bindEvents();
  loadFoods();
});

function hasRealServiceKey() {
  return BUSAN_FOOD_SERVICE_KEY && !BUSAN_FOOD_SERVICE_KEY.includes("여기에_");
}

async function loadFoods() {
  showStatus("부산맛집 데이터를 불러오고 있어요…");
  if (!hasRealServiceKey()) {
    console.log("FoodService API 원본 응답:", {demo:true, items:DEMO_FOODS});
    useFoods(DEMO_FOODS, true, "공공데이터 API 키가 없어 미리보기 데이터를 표시합니다.");
    return;
  }

  const operation = $("#languageSelect").value;
  const params = new URLSearchParams({serviceKey:BUSAN_FOOD_SERVICE_KEY, numOfRows:"100", pageNo:"1", resultType:"json"});
  const requestUrl = `${API_BASE_URL}/${operation}?${params.toString()}`;

  try {
    const response = await fetch(requestUrl);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    console.log("FoodService API 원본 응답:", data);

    const header = data?.response?.header || data?.[operation]?.header || data?.getFoodKr?.header;
    if (header?.resultCode && header.resultCode !== "00") throw new Error(`${header.resultCode}: ${header.resultMsg}`);

    const root = data?.[operation] || data?.getFoodKr || data?.response?.body || data;
    let items = root?.item || root?.items?.item || [];
    if (!Array.isArray(items)) items = items ? [items] : [];
    if (!items.length) throw new Error("API 응답에 맛집 데이터가 없습니다.");
    useFoods(items, false);
  } catch (error) {
    // 전체 요청 URL을 출력하지 않아 ServiceKey가 콘솔에 노출되지 않게 합니다.
    console.error("FoodService API 요청 실패:", error.message);
    useFoods(DEMO_FOODS, true, "API 요청이 실패해 미리보기 데이터를 표시합니다. Live Server와 API 키를 확인해 주세요.");
  }
}

function useFoods(items, demo, message="") {
  state.foods = items;
  state.demo = demo;
  $("#demoBadge").classList.toggle("hidden", !demo);
  buildRegions();
  renderFoods();
  if (message) console.info(message);
}

function bindEvents() {
  $("#searchInput").addEventListener("input", e => { state.query=e.target.value.trim().toLowerCase(); renderFoods(); });
  $("#clearSearch").addEventListener("click", () => { $("#searchInput").value=""; state.query=""; renderFoods(); });
  $("#languageSelect").addEventListener("change", loadFoods);
  $("#favoriteFilter").addEventListener("click", () => { state.onlyFavorites=!state.onlyFavorites; $("#favoriteFilter").classList.toggle("active",state.onlyFavorites); renderFoods(); });
  $("#closeModal").addEventListener("click", closeDetail);
  $("#detailModal").addEventListener("click", e => { if(e.target.id==="detailModal") closeDetail(); });
  $("#detailFavorite").addEventListener("click", () => { if(state.selected) toggleFavorite(String(state.selected.UC_SEQ)); });
  document.addEventListener("keydown", e => { if(e.key==="Escape") closeDetail(); });
}

function buildRegions() {
  const regions = ["전체", ...new Set(state.foods.map(f => f.GUGUN_NM).filter(Boolean))];
  $("#regionChips").innerHTML = regions.map(r => `<button class="${r===state.region?'active':''}" data-region="${escapeHtml(r)}">${escapeHtml(r)}</button>`).join("");
  $("#regionChips").querySelectorAll("button").forEach(button => button.addEventListener("click", () => {state.region=button.dataset.region; buildRegions(); renderFoods();}));
}

function filteredFoods() {
  return state.foods.filter(f => {
    const text = `${f.MAIN_TITLE||""} ${f.RPRSNTV_MENU||""} ${f.ITEMCNTNTS||""}`.toLowerCase();
    return (!state.query || text.includes(state.query)) && (state.region==="전체" || f.GUGUN_NM===state.region) && (!state.onlyFavorites || state.favorites.includes(String(f.UC_SEQ)));
  });
}

function renderFoods() {
  const foods = filteredFoods();
  $("#resultCount").textContent = foods.length;
  $("#favoriteCount").textContent = state.favorites.length;
  $("#statusBox").classList.add("hidden");
  if (!foods.length) { $("#foodGrid").innerHTML=""; showStatus("조건에 맞는 맛집이 없어요.<br><button id='resetButton'>조건 초기화</button>"); $("#resetButton").onclick=resetFilters; return; }
  $("#foodGrid").innerHTML = foods.map((f,index) => `<article class="food-card" data-index="${state.foods.indexOf(f)}"><div class="food-photo"><img src="${escapeAttr(f.MAIN_IMG_THUMB||f.MAIN_IMG_NORMAL||FALLBACK_IMAGE)}" alt="${escapeAttr(f.MAIN_TITLE)} 대표 음식"><span class="region-label">⌖ ${escapeHtml(f.GUGUN_NM||"부산")}</span><button class="heart ${state.favorites.includes(String(f.UC_SEQ))?'saved':''}" data-id="${escapeAttr(String(f.UC_SEQ))}" aria-label="즐겨찾기">${state.favorites.includes(String(f.UC_SEQ))?'♥':'♡'}</button></div><div class="card-text"><h3>${escapeHtml(f.MAIN_TITLE||"이름 정보 없음")}</h3><p>${escapeHtml(f.RPRSNTV_MENU||"대표메뉴 정보 준비 중")}</p><button class="open-detail">자세히 보기 ›</button></div></article>`).join("");
  $("#foodGrid").querySelectorAll("img").forEach(img => img.addEventListener("error",()=>{img.src=FALLBACK_IMAGE},{once:true}));
  $("#foodGrid").querySelectorAll(".food-card").forEach(card => card.addEventListener("click",()=>openDetail(state.foods[Number(card.dataset.index)])));
  $("#foodGrid").querySelectorAll(".heart").forEach(button => button.addEventListener("click",e=>{e.stopPropagation();toggleFavorite(button.dataset.id);}));
}

function openDetail(food) {
  state.selected=food;
  $("#detailImage").src=food.MAIN_IMG_NORMAL||food.MAIN_IMG_THUMB||FALLBACK_IMAGE;
  $("#detailImage").onerror=()=>{$("#detailImage").src=FALLBACK_IMAGE};
  $("#detailRegion").textContent=food.GUGUN_NM||"부산";
  $("#detailTitle").textContent=food.MAIN_TITLE||"이름 정보 없음";
  $("#detailMenu").textContent=food.RPRSNTV_MENU||"대표메뉴 정보 준비 중";
  $("#detailAddress").textContent=food.ADDR1||"주소 정보 없음";
  $("#detailTime").textContent=food.USAGE_DAY_WEEK_AND_TIME||"운영시간을 매장에 확인해 주세요";
  $("#detailPhone").textContent=food.CNTCT_TEL||"전화번호 정보 없음";
  $("#detailDescription").textContent=food.ITEMCNTNTS||"상세 설명을 준비 중이에요.";
  $("#callButton").href=food.CNTCT_TEL?`tel:${food.CNTCT_TEL}`:"#";
  $("#callButton").classList.toggle("disabled",!food.CNTCT_TEL);
  $("#bigMapButton").href=`https://map.kakao.com/link/map/${encodeURIComponent(food.MAIN_TITLE)},${food.LAT},${food.LNG}`;
  updateDetailFavorite();
  $("#detailModal").classList.remove("hidden");
  document.body.style.overflow="hidden";
  createKakaoMap(food);
}

function closeDetail(){ $("#detailModal").classList.add("hidden"); document.body.style.overflow=""; }
function toggleFavorite(id){ state.favorites=state.favorites.includes(id)?state.favorites.filter(x=>x!==id):[...state.favorites,id];localStorage.setItem("busan-food-favorites",JSON.stringify(state.favorites));updateDetailFavorite();renderFoods(); }
function updateDetailFavorite(){ if(!state.selected)return;$("#detailFavorite").textContent=state.favorites.includes(String(state.selected.UC_SEQ))?"♥ 저장됨":"♡ 저장"; }
function resetFilters(){state.query="";state.region="전체";state.onlyFavorites=false;$("#searchInput").value="";$("#favoriteFilter").classList.remove("active");buildRegions();renderFoods();}
function showStatus(html){$("#statusBox").innerHTML=`<p>${html}</p>`;$("#statusBox").classList.remove("hidden");$("#foodGrid").innerHTML="";}

function createKakaoMap(food) {
  const mapBox=$("#kakaoMap"),message=$("#mapMessage"),lat=Number(food.LAT),lng=Number(food.LNG);
  mapBox.innerHTML='<div id="mapMessage">카카오맵을 준비하고 있어요…</div>';
  if(!KAKAO_MAP_JAVASCRIPT_KEY||KAKAO_MAP_JAVASCRIPT_KEY.includes("여기에_")){mapBox.innerHTML='<div>카카오맵 JavaScript 키를 입력해 주세요.</div>';return;}
  if(!Number.isFinite(lat)||!Number.isFinite(lng)){mapBox.innerHTML='<div>위치 정보가 없어요.</div>';return;}
  const draw=()=>kakao.maps.load(()=>{mapBox.innerHTML="";const pos=new kakao.maps.LatLng(lat,lng),map=new kakao.maps.Map(mapBox,{center:pos,level:3}),marker=new kakao.maps.Marker({map,position:pos}),info=new kakao.maps.InfoWindow({content:`<div style="padding:7px 10px;font-size:12px;white-space:nowrap">${escapeHtml(food.MAIN_TITLE)}</div>`});info.open(map,marker);});
  if(window.kakao?.maps){draw();return;}
  let script=document.querySelector("script[data-kakao-map]");
  if(script){script.addEventListener("load",draw,{once:true});return;}
  script=document.createElement("script");script.dataset.kakaoMap="true";script.src=`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_MAP_JAVASCRIPT_KEY}&autoload=false`;script.onload=draw;script.onerror=()=>{mapBox.innerHTML='<div>카카오맵을 불러오지 못했어요.<br>JavaScript 키와 Web 도메인을 확인해 주세요.</div>'};document.head.appendChild(script);
}

function escapeHtml(value=""){return String(value).replace(/[&<>'"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[c]));}
function escapeAttr(value=""){return escapeHtml(value);}
