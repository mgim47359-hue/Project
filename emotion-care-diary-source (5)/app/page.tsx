"use client";

import { useEffect, useMemo, useState } from "react";

type Mood = { emoji: string; label: string; score: number; color: string };
type Entry = { id: number; mood: Mood; note: string; date: string };

const moods: Mood[] = [
  { emoji: "😊", label: "행복해요", score: 5, color: "#ffd7df" },
  { emoji: "😌", label: "평온해요", score: 4, color: "#d7f3e8" },
  { emoji: "😐", label: "보통이에요", score: 3, color: "#fff0bd" },
  { emoji: "😥", label: "지쳤어요", score: 2, color: "#ddd8ff" },
  { emoji: "😢", label: "슬퍼요", score: 1, color: "#d8e9ff" },
];

const careItems = [
  { icon: "☕", title: "따뜻한 차 한 잔", text: "잠시 멈추고 천천히 호흡해 보세요.", tone: "pink" },
  { icon: "🌿", title: "5분 마음 산책", text: "가까운 곳을 걸으며 주변을 관찰해요.", tone: "mint" },
  { icon: "🎧", title: "감정 휴식 음악", text: "차분한 음악으로 마음의 속도를 낮춰요.", tone: "lavender" },
];

export default function Home() {
  const [tab, setTab] = useState("home");
  const [mood, setMood] = useState(moods[1]);
  const [note, setNote] = useState("");
  const [entries, setEntries] = useState<Entry[]>([]);
  const [saved, setSaved] = useState<string[]>([]);
  const [toast, setToast] = useState("");

  useEffect(() => {
    try {
      setEntries(JSON.parse(localStorage.getItem("emotion-diary-entries") || "[]"));
      setSaved(JSON.parse(localStorage.getItem("emotion-diary-saved") || "[]"));
    } catch {}
  }, []);

  const today = new Intl.DateTimeFormat("ko-KR", {
    month: "long", day: "numeric", weekday: "long",
  }).format(new Date());
  const average = entries.length
    ? (entries.reduce((sum, item) => sum + item.mood.score, 0) / entries.length).toFixed(1)
    : "-";
  const chart = useMemo(() => {
    const recent = entries.slice(0, 7).reverse().map((item) => item.mood.score);
    return [3, 4, 2, 4, 5, 4, 3].map((value, index) => recent[index] || value);
  }, [entries]);

  function notify(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(""), 2200);
  }

  function saveEmotion() {
    const next = [{ id: Date.now(), mood, note: note.trim(), date: new Date().toISOString() }, ...entries];
    setEntries(next);
    localStorage.setItem("emotion-diary-entries", JSON.stringify(next));
    setNote("");
    notify("오늘의 감정을 안전하게 기록했어요.");
  }

  function toggleSave(title: string) {
    const next = saved.includes(title) ? saved.filter((item) => item !== title) : [...saved, title];
    setSaved(next);
    localStorage.setItem("emotion-diary-saved", JSON.stringify(next));
    notify(saved.includes(title) ? "저장을 취소했어요." : "케어 콘텐츠를 저장했어요.");
  }

  return (
    <main className="app">
      <section className="phone">
        <header className="topbar">
          <button className="avatar">민</button>
          <div className="logo"><span>♥</span> 감정케어 다이어리</div>
          <button className="alarm">♧<i /></button>
        </header>

        <div className="content">
          {tab === "home" && (
            <>
              <section className="welcome">
                <p>{today}</p>
                <h1>민지님의 마음은<br />오늘 어떤가요?</h1>
                <span>있는 그대로의 감정을 들려주세요.</span>
              </section>

              <section className="mood-card">
                <div className="title-row">
                  <div><small>오늘의 감정</small><h2>지금 기분을 선택해 주세요</h2></div>
                  <span className="private">🔒 나만 보기</span>
                </div>
                <div className="mood-list">
                  {moods.map((item) => (
                    <button
                      key={item.label}
                      className={mood.label === item.label ? "mood active" : "mood"}
                      onClick={() => setMood(item)}
                      style={{ "--mood-color": item.color } as React.CSSProperties}
                    >
                      <b>{item.emoji}</b><span>{item.label}</span>
                    </button>
                  ))}
                </div>
                <label className="note">
                  <span>오늘 마음에 있었던 일을 적어보세요</span>
                  <textarea value={note} onChange={(event) => setNote(event.target.value)} maxLength={300} placeholder="짧게 적어도 괜찮아요. 모든 감정에는 이유가 있으니까요." />
                  <em>{note.length}/300</em>
                </label>
                <button className="primary" onClick={saveEmotion}>오늘의 감정 기록하기</button>
              </section>

              <section className="analysis">
                <div>
                  <small>AI 감정 분석</small>
                  <h2>{entries.length ? "최근 마음은 비교적 안정적이에요" : "마음의 흐름을 알려드려요"}</h2>
                  <p>{entries.length ? `평균 감정 점수는 ${average}점이에요. 지친 날에는 충분히 쉬어주세요.` : "감정을 기록할수록 나에게 맞는 분석을 받을 수 있어요."}</p>
                  <button onClick={() => setTab("my")}>감정 리포트 보기 →</button>
                </div>
                <div className="chart">{chart.map((value, index) => <i key={index} style={{ height: value * 14 }} />)}</div>
              </section>

              <section className="care-section">
                <div className="title-row"><div><small>FOR YOUR HEART</small><h2>오늘의 추천 케어</h2></div><button onClick={() => setTab("explore")}>전체 보기</button></div>
                <div className="care-scroll">
                  {careItems.map((item) => (
                    <article className={`care-card ${item.tone}`} key={item.title}>
                      <button className={saved.includes(item.title) ? "save active" : "save"} onClick={() => toggleSave(item.title)}>♥</button>
                      <span>{item.icon}</span><h3>{item.title}</h3><p>{item.text}</p>
                    </article>
                  ))}
                </div>
              </section>
            </>
          )}

          {tab === "explore" && (
            <section className="subpage">
              <p className="kicker">EXPLORE CARE</p><h1>마음에 필요한 케어를 찾아보세요</h1>
              <label className="search">⌕<input placeholder="스트레스, 불안, 수면 검색" /></label>
              <div className="topics">
                {["감정별 음식", "스트레스 케어", "감정별 활동", "마음챙김", "숙면 콘텐츠", "자기칭찬"].map((item, index) => (
                  <button key={item}><span>{["🥗", "🫧", "🚶", "🧘", "🌙", "💛"][index]}</span>{item}</button>
                ))}
              </div>
              <article className="feature"><span>🌿</span><div><small>오늘의 추천</small><h2>마음을 가볍게 하는<br />5분 호흡 가이드</h2><p>복잡한 생각을 잠시 내려놓아요.</p></div></article>
            </section>
          )}

          {tab === "saved" && (
            <section className="subpage">
              <p className="kicker">MY SAVED</p><h1>저장한 마음 케어</h1>
              {saved.length ? <div className="saved-list">{saved.map((title) => <article key={title}><span>♥</span><div><h3>{title}</h3><p>필요할 때 다시 꺼내보세요.</p></div><button onClick={() => toggleSave(title)}>삭제</button></article>)}</div> : <Empty icon="♡" title="아직 저장한 콘텐츠가 없어요" text="마음에 드는 케어의 하트를 눌러보세요." action={() => setTab("explore")} button="케어 둘러보기" />}
            </section>
          )}

          {tab === "my" && (
            <section className="subpage">
              <p className="kicker">MY EMOTION</p><h1>나의 감정 리포트</h1>
              <div className="stats"><div><span>감정 기록</span><strong>{entries.length}일</strong></div><div><span>평균 감정</span><strong>{average}</strong></div><div><span>저장 케어</span><strong>{saved.length}개</strong></div></div>
              <section className="history"><h2>최근 감정 기록</h2>{entries.length ? entries.map((entry) => <article key={entry.id}><b style={{ background: entry.mood.color }}>{entry.mood.emoji}</b><div><h3>{entry.mood.label}</h3><p>{entry.note || "짧게 감정만 기록했어요."}</p><time>{new Intl.DateTimeFormat("ko-KR", { month: "long", day: "numeric", hour: "numeric", minute: "2-digit" }).format(new Date(entry.date))}</time></div></article>) : <Empty icon="✎" title="첫 감정을 기록해 주세요" text="오늘 마음부터 천천히 시작해요." action={() => setTab("home")} button="기록하러 가기" />}</section>
            </section>
          )}
        </div>

        <nav className="bottom-nav">
          {[{ id: "home", icon: "⌂", label: "홈" }, { id: "explore", icon: "⌕", label: "탐색" }, { id: "saved", icon: "♡", label: "저장" }, { id: "my", icon: "♙", label: "MY" }].map((item) => (
            <button key={item.id} className={tab === item.id ? "active" : ""} onClick={() => setTab(item.id)}><span>{item.icon}</span>{item.label}</button>
          ))}
        </nav>
      </section>
      <div className={toast ? "toast show" : "toast"}>{toast}</div>
    </main>
  );
}

function Empty({ icon, title, text, action, button }: { icon: string; title: string; text: string; action: () => void; button: string }) {
  return <div className="empty"><span>{icon}</span><h2>{title}</h2><p>{text}</p><button className="primary small" onClick={action}>{button}</button></div>;
}
