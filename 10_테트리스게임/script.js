* {
  box-sizing: border-box;
}

:root {
  --bg: #0a0b14;
  --panel: #151728;
  --panel-light: #20233a;
  --text: #ffffff;
  --muted: #aeb3cc;
  --accent: #8b5cf6;
  --accent-light: #c4b5fd;
  --line: rgba(255, 255, 255, 0.1);
}

body {
  margin: 0;
  min-height: 100svh;
  color: var(--text);
  background:
    radial-gradient(circle at top, rgba(139, 92, 246, 0.2), transparent 36%),
    linear-gradient(160deg, #070811, #111326);
  font-family: Arial, "Noto Sans KR", sans-serif;
}

button {
  font: inherit;
}

.game-wrap {
  width: 100%;
  min-height: 100svh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px;
}

.game-card {
  width: min(100%, 760px);
  padding: 24px;
  border: 1px solid var(--line);
  border-radius: 28px;
  background: rgba(20, 22, 38, 0.92);
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.42);
  backdrop-filter: blur(16px);
}

.game-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.eyebrow {
  margin: 0 0 4px;
  color: var(--accent-light);
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.18em;
}

h1 {
  margin: 0;
  font-size: 32px;
}

.small-button,
.start-button,
.mobile-controls button {
  border: 0;
  color: white;
  cursor: pointer;
  transition: transform 0.15s ease, opacity 0.15s ease;
}

.small-button:hover,
.start-button:hover,
.mobile-controls button:hover {
  transform: translateY(-2px);
}

.small-button {
  padding: 10px 14px;
  border-radius: 12px;
  background: var(--panel-light);
}

.game-layout {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 24px;
  align-items: start;
}

.board-area {
  position: relative;
  width: 300px;
  height: 600px;
  overflow: hidden;
  border: 3px solid rgba(255, 255, 255, 0.14);
  border-radius: 18px;
  background: #090a12;
  box-shadow: inset 0 0 40px rgba(0, 0, 0, 0.5);
}

#gameCanvas {
  display: block;
  width: 300px;
  height: 600px;
}

.game-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px;
  text-align: center;
  background: rgba(7, 8, 17, 0.82);
  backdrop-filter: blur(5px);
}

.game-overlay.hidden {
  display: none;
}

.game-overlay h2 {
  margin: 0 0 10px;
  font-size: 32px;
}

.game-overlay p {
  margin: 0;
  color: var(--muted);
  line-height: 1.6;
}

.side-panel {
  display: grid;
  gap: 14px;
}

.info-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.info-box,
.next-box,
.guide {
  padding: 16px;
  border: 1px solid var(--line);
  border-radius: 16px;
  background: var(--panel-light);
}

.info-box span,
.next-box > span {
  display: block;
  margin-bottom: 8px;
  color: var(--muted);
  font-size: 13px;
}

.info-box strong {
  font-size: 28px;
}

.next-box {
  text-align: center;
}

#nextCanvas {
  display: block;
  margin: 0 auto;
  border-radius: 12px;
  background: #0c0e19;
}

.start-button {
  width: 100%;
  padding: 15px;
  border-radius: 14px;
  background: linear-gradient(135deg, #8b5cf6, #ec4899);
  font-weight: 800;
}

.guide h2 {
  margin: 0 0 12px;
  font-size: 16px;
}

.guide p {
  margin: 6px 0;
  color: var(--muted);
  font-size: 13px;
}

.mobile-controls {
  display: none;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  margin-top: 18px;
}

.mobile-controls button {
  min-height: 52px;
  border-radius: 14px;
  background: var(--panel-light);
  font-size: 20px;
  font-weight: 800;
}

.mobile-controls .wide {
  grid-column: span 4;
  background: linear-gradient(135deg, #8b5cf6, #ec4899);
  font-size: 14px;
}

@media (max-width: 720px) {
  .game-wrap {
    align-items: flex-start;
    padding: 12px;
  }

  .game-card {
    padding: 16px;
    border-radius: 20px;
  }

  .game-layout {
    grid-template-columns: 1fr;
    justify-items: center;
  }

  .side-panel {
    width: 100%;
  }

  .board-area,
  #gameCanvas {
    width: min(300px, calc(100vw - 56px));
  }

  .mobile-controls {
    display: grid;
  }

  .guide {
    display: none;
  }
}
