import { useCallback, useEffect, useMemo, useState } from "react";
import "./App.css";
import { fetchRestaurants } from "./services/foodApi";
import KakaoMap from "./components/KakaoMap";
const languages = [
  ["ko", "한국어"],
  ["en", "English"],
  ["ja", "日本語"],
  ["zhs", "简体中文"],
  ["zht", "繁體中文"],
];
const i18n = {
  ko: {
    hero: "부산의 맛있는 순간을|한곳에서 만나보세요",
    desc: "맛집명과 대표 메뉴를 검색하고, 구·군별로 골라 카카오맵에서 위치를 확인하세요.",
    ask: "어떤 맛집을 찾으세요?",
    placeholder: "예: 돼지국밥, 밀면",
    search: "검색",
    title: "부산 맛집 둘러보기",
    all: "전체",
    unit: "곳",
    loading: "맛집 정보를 불러오는 중이에요…",
    failed: "맛집 정보를 불러오지 못했어요.",
    retry: "다시 시도",
    empty: "조건에 맞는 맛집이 없어요.",
    reset: "필터 초기화",
    noMenu: "대표 메뉴 정보 없음",
    detail: "상세정보 보기 →",
    prev: "이전",
    next: "다음",
    menu: "대표 메뉴",
    hours: "운영시간",
    address: "주소",
    phone: "전화",
    none: "정보 없음",
    call: "전화하기",
    map: "카카오맵 열기",
    favorite: "즐겨찾기",
  },
  en: {
    hero: "Discover delicious moments|in Busan",
    desc: "Search restaurants and signature dishes, filter by district, and check locations on Kakao Map.",
    ask: "What would you like to eat?",
    placeholder: "e.g. pork soup, milmyeon",
    search: "Search",
    title: "Explore Busan restaurants",
    all: "All",
    unit: "places",
    loading: "Loading restaurant information…",
    failed: "Could not load restaurant information.",
    retry: "Try again",
    empty: "No restaurants match your filters.",
    reset: "Reset filters",
    noMenu: "No signature menu information",
    detail: "View details →",
    prev: "Previous",
    next: "Next",
    menu: "Signature menu",
    hours: "Hours",
    address: "Address",
    phone: "Phone",
    none: "Not available",
    call: "Call",
    map: "Open Kakao Map",
    favorite: "Favorite",
  },
  ja: {
    hero: "釜山のおいしい瞬間を|一か所で見つけよう",
    desc: "店名や代表メニューを検索し、区・郡で絞り込み、カカオマップで位置を確認できます。",
    ask: "どんなお店をお探しですか？",
    placeholder: "例：テジクッパ、ミルミョン",
    search: "検索",
    title: "釜山グルメを探す",
    all: "すべて",
    unit: "軒",
    loading: "レストラン情報を読み込み中…",
    failed: "情報を読み込めませんでした。",
    retry: "再試行",
    empty: "条件に合うお店がありません。",
    reset: "条件をリセット",
    noMenu: "代表メニュー情報なし",
    detail: "詳細を見る →",
    prev: "前へ",
    next: "次へ",
    menu: "代表メニュー",
    hours: "営業時間",
    address: "住所",
    phone: "電話",
    none: "情報なし",
    call: "電話する",
    map: "カカオマップを開く",
    favorite: "お気に入り",
  },
  zhs: {
    hero: "在一个地方发现|釜山美味时刻",
    desc: "搜索餐厅和招牌菜，按区郡筛选，并在 Kakao 地图上查看位置。",
    ask: "您想找什么美食？",
    placeholder: "例如：猪肉汤饭、麦面",
    search: "搜索",
    title: "探索釜山美食",
    all: "全部",
    unit: "家",
    loading: "正在加载餐厅信息…",
    failed: "无法加载餐厅信息。",
    retry: "重试",
    empty: "没有符合条件的餐厅。",
    reset: "重置筛选",
    noMenu: "暂无招牌菜信息",
    detail: "查看详情 →",
    prev: "上一页",
    next: "下一页",
    menu: "招牌菜",
    hours: "营业时间",
    address: "地址",
    phone: "电话",
    none: "暂无信息",
    call: "拨打电话",
    map: "打开 Kakao 地图",
    favorite: "收藏",
  },
  zht: {
    hero: "在一個地方發現|釜山美味時刻",
    desc: "搜尋餐廳和招牌菜，按區郡篩選，並在 Kakao 地圖上查看位置。",
    ask: "您想找什麼美食？",
    placeholder: "例如：豬肉湯飯、麥麵",
    search: "搜尋",
    title: "探索釜山美食",
    all: "全部",
    unit: "家",
    loading: "正在載入餐廳資訊…",
    failed: "無法載入餐廳資訊。",
    retry: "重試",
    empty: "沒有符合條件的餐廳。",
    reset: "重設篩選",
    noMenu: "暫無招牌菜資訊",
    detail: "查看詳情 →",
    prev: "上一頁",
    next: "下一頁",
    menu: "招牌菜",
    hours: "營業時間",
    address: "地址",
    phone: "電話",
    none: "暫無資訊",
    call: "撥打電話",
    map: "開啟 Kakao 地圖",
    favorite: "收藏",
  },
};
export default function App() {
  const [items, setItems] = useState([]),
    [loading, setLoading] = useState(true),
    [error, setError] = useState(""),
    [query, setQuery] = useState(""),
    [region, setRegion] = useState("전체"),
    [language, setLanguage] = useState("ko"),
    [selected, setSelected] = useState(null),
    [page, setPage] = useState(1),
    [favorites, setFavorites] = useState(() =>
      JSON.parse(localStorage.getItem("busan-favorites") || "[]"),
    );
  const perPage = 6,
    t = i18n[language];
  const load = useCallback(() => {
    setLoading(true);
    setError("");
    fetchRestaurants({ language })
      .then((r) => setItems(r.items))
      .catch(() => setError(t.failed))
      .finally(() => setLoading(false));
  }, [language, t.failed]);
  useEffect(() => { load(); }, [load]);
  useEffect(
    () => localStorage.setItem("busan-favorites", JSON.stringify(favorites)),
    [favorites],
  );
  const regions = [
    "전체",
    ...new Set(items.map((x) => x.GUGUN_NM).filter(Boolean)),
  ];
  const filtered = useMemo(
    () =>
      items.filter(
        (x) =>
          (region === "전체" || x.GUGUN_NM === region) &&
          `${x.MAIN_TITLE} ${x.RPRSNTV_MENU}`
            .toLowerCase()
            .includes(query.toLowerCase()),
      ),
    [items, query, region],
  );
  useEffect(() => setPage(1), [query, region]);
  const pages = Math.max(1, Math.ceil(filtered.length / perPage)),
    shown = filtered.slice((page - 1) * perPage, page * perPage);
  const toggle = (id) =>
    setFavorites((f) =>
      f.includes(id) ? f.filter((x) => x !== id) : [...f, id],
    );
  return (
    <>
      <header>
        <div className="nav">
          <a className="brand" href="#top">
            <span>BUSAN</span> FOOD FINDER
          </a>
          <select
            value={language}
            onChange={(e) => {
              setLanguage(e.target.value);
              setRegion("전체");
            }}
            aria-label="Language"
          >
            {languages.map(([v, label]) => (
              <option value={v} key={v}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </header>
      <main id="top">
        <section className="hero">
          <div>
            <p className="eyebrow">BUSAN FOOD FINDER</p>
            <h1>
              {t.hero.split("|").map((line, i) => (
                <span key={line}>
                  {line}
                  {i === 0 && <br />}
                </span>
              ))}
            </h1>
            <p>{t.desc}</p>
          </div>
          <div className="searchbox">
            <label>{t.ask}</label>
            <div className="search-row">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t.placeholder}
              />
              <button onClick={() => setPage(1)}>{t.search}</button>
            </div>
          </div>
        </section>
        <section className="content">
          <div className="section-head">
            <div>
              <p className="eyebrow orange">RESTAURANTS</p>
              <h2>{t.title}</h2>
            </div>
            <strong>
              {filtered.length} {t.unit}
            </strong>
          </div>
          <div className="filters">
            {regions.map((r) => (
              <button
                className={region === r ? "active" : ""}
                onClick={() => setRegion(r)}
                key={r}
              >
                {r === "전체" ? t.all : r}
              </button>
            ))}
          </div>
          {loading ? (
            <div className="state">{t.loading}</div>
          ) : error ? (
            <div className="state error">
              <p>{error}</p>
              <button onClick={load}>{t.retry}</button>
            </div>
          ) : shown.length === 0 ? (
            <div className="state">
              <p>{t.empty}</p>
              <button
                onClick={() => {
                  setQuery("");
                  setRegion("전체");
                }}
              >
                {t.reset}
              </button>
            </div>
          ) : (
            <div className="grid">
              {shown.map((x) => (
                <article className="card" key={x.UC_SEQ}>
                  <div className="thumb">
                    <img
                      src={x.MAIN_IMG_NORMAL}
                      alt={x.MAIN_TITLE}
                      loading="lazy"
                    />
                    <button
                      className="heart"
                      onClick={() => toggle(x.UC_SEQ)}
                      aria-label={t.favorite}
                    >
                      {favorites.includes(x.UC_SEQ) ? "♥" : "♡"}
                    </button>
                  </div>
                  <div className="card-body">
                    <span className="tag">{x.GUGUN_NM}</span>
                    <h3>{x.MAIN_TITLE}</h3>
                    <p className="menu">{x.RPRSNTV_MENU || t.noMenu}</p>
                    <p className="address">{x.ADDR1}</p>
                    <button className="detail" onClick={() => setSelected(x)}>
                      {t.detail}
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
          <div className="pagination">
            <button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
              {t.prev}
            </button>
            <span>
              {page} / {pages}
            </span>
            <button
              disabled={page === pages}
              onClick={() => setPage((p) => p + 1)}
            >
              {t.next}
            </button>
          </div>
        </section>
      </main>
      <footer>Busan FoodService Open Data · © 2026 BUSAN FOOD FINDER</footer>
      {selected && (
        <div
          className="overlay"
          onMouseDown={(e) => e.target === e.currentTarget && setSelected(null)}
        >
          <section className="modal" role="dialog" aria-modal="true">
            <button className="close" onClick={() => setSelected(null)}>
              ×
            </button>
            <img className="modal-img" src={selected.MAIN_IMG_NORMAL} alt="" />
            <div className="modal-body">
              <span className="tag">{selected.GUGUN_NM}</span>
              <h2>{selected.MAIN_TITLE}</h2>
              <p>{selected.ITEMCNTNTS}</p>
              <dl>
                <dt>{t.menu}</dt>
                <dd>{selected.RPRSNTV_MENU || t.none}</dd>
                <dt>{t.hours}</dt>
                <dd>{selected.USAGE_DAY_WEEK_AND_TIME || t.none}</dd>
                <dt>{t.address}</dt>
                <dd>{selected.ADDR1 || t.none}</dd>
                <dt>{t.phone}</dt>
                <dd>{selected.CNTCT_TEL || t.none}</dd>
              </dl>
              <KakaoMap restaurant={selected} />
              <div className="actions">
                {selected.CNTCT_TEL && (
                  <a href={`tel:${selected.CNTCT_TEL}`}>{t.call}</a>
                )}
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={`https://map.kakao.com/link/map/${encodeURIComponent(selected.MAIN_TITLE)},${selected.LAT},${selected.LNG}`}
                >
                  {t.map}
                </a>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
