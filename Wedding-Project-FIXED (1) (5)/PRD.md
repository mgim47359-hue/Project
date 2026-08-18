# PRD — 웨딩드레스 예약 랜딩페이지 React 개발 최종안

## 1. 프로젝트 기본 정보

| 항목 | 내용 |
|---|---|
| 프로젝트명 | 웨딩드레스 예약 랜딩페이지 |
| 목적 | 웨딩드레스 소개 및 피팅/상담 예약 전환 |
| 화면 | Desktop Landing Page |
| 프런트엔드 | React |
| 개발 방식 | Create React App(CRA) |
| UI 디자인 | Netflix 스타일을 밝은 톤으로 재해석 |
| 핵심 CTA | 웨딩드레스 피팅 예약하기 |
| 개인정보 수집 | 이름, 연락처, 결혼 예정일, 방문일 등 |
| 데이터 저장 | Google Spreadsheet |
| API | Google Apps Script Web App |
| 배포 | GitHub Pages |
| GitHub Pages URL | `https://mgim47359-hue.github.io/Project` |
| 최종 결과물 | React Source + build + README + Apps Script |
| 최종 압축파일 | `Wedding-Project.zip` |

## 2. 서비스 목표

웨딩드레스를 찾고 있는 예비 신부가 랜딩페이지에서 브랜드와 드레스 컬렉션을 충분히 탐색한 뒤 **피팅 예약 신청까지 완료하도록 유도하는 것**이 핵심 목표이다.

```text
광고 / SNS / 검색
→ Landing Page
→ 웨딩드레스 메인 비주얼
→ 컬렉션 탐색
→ 드레스 확인
→ 피팅 예약하기
→ 예약 정보 입력
→ 개인정보 동의
→ 예약 신청
→ Google Spreadsheet 저장
```

## 3. 주요 타깃

결혼을 준비하고 있으며 드레스 피팅이나 상담을 원하는 예비 신부.

- 다양한 드레스를 보고 싶다.
- 브랜드 분위기를 확인하고 싶다.
- 원하는 드레스 스타일을 비교하고 싶다.
- 원하는 날짜에 피팅을 신청하고 싶다.
- 복잡한 전화 예약보다 온라인 신청을 선호한다.

## 4. 디자인 콘셉트

### Bright Netflix Wedding

Netflix의 강력한 비주얼 중심 UX를 웨딩 브랜드에 맞게 밝게 재해석한다.

- Full Screen Hero
- 대형 메인 이미지
- 좌우 이미지 Slider
- Pagination
- 콘텐츠 Row
- 카드 Hover
- 대형 Section Heading
- CTA 반복 노출
- 이미지 중심 탐색

```text
Netflix UX
+
Wedding Editorial
+
Premium White
+
Soft Beige
+
Champagne Accent
```

## 5. Color System

| 용도 | Color |
|---|---|
| Main Background | `#FFFFFF` |
| Secondary Background | `#F7F6F4` |
| Soft Beige | `#F2ECE8` |
| Main Text | `#171717` |
| Secondary Text | `#777777` |
| Champagne | `#CDA98D` |
| Peach Accent | `#D99B82` |
| Border | `#EBE8E5` |

## 6. 전체 페이지 구조

```text
<App>
├── Header
├── HeroSlider
├── About
├── BridalCollection
├── FeaturedDress
├── LookBook
├── Benefits
├── ReservationProcess
├── ReservationCTA
├── ReservationForm
├── Location
└── Footer
```

## 7. Header

첨부 시안처럼 Hero 위에 Header를 배치한다.

```text
LOGO
HOME
ABOUT
BRIDAL SHOW
LOOK BOOK
COLLECTION
CONTACT
[RESERVATION]
```

스크롤 전에는 Transparent + White Text, 스크롤 후에는 White Background + Black Text + Bottom Border를 적용한다.

## 8. Hero Slider

- 슬라이드 5개
- 자동재생
- Loop
- Fade
- Previous / Next
- Pagination
- Drag
- Mouse Interaction
- Swiper 사용

이미지 파일:
`hero01.png`, `hero02.png`, `hero03.png`, `hero04.png`, `hero05.png`

## 9. Hero Copy

```text
FIND YOUR
PERFECT DRESS

가장 아름다운 순간을 위한
단 하나의 웨딩드레스

VIEW COLLECTION
RESERVATION
```

## 10. About

### TIMELESS BEAUTY

시간이 지나도 변하지 않는 아름다움.

섬세한 디테일과 우아한 실루엣을 통해
당신의 가장 특별한 순간을 완성합니다.

이미지와 텍스트를 좌우 2단으로 구성한다.

## 11. Bridal Collection

Netflix 콘텐츠 Row 스타일로 제작한다.

카테고리:

- SIGNATURE
- CLASSIC
- MODERN
- ROMANTIC

Desktop 기준 4 Column.

## 12. Dress Hover

```text
Scale 1.05
+
Dark Overlay
+
VIEW DETAIL
```

Transition: `0.35s ease`

## 13. Featured Dresses

### MOST LOVED DRESSES

대표 드레스를 인기 콘텐츠 Row처럼 보여준다.

## 14. Look Book

웨딩 화보 중심의 Editorial Layout을 사용한다.

```text
Large Image
Small Image
Small Image
Wide Image
```

## 15. Reservation Process

```text
01 드레스 둘러보기
→ 02 예약 신청
→ 03 담당자 확인
→ 04 예약 확정
→ 05 매장 방문 & 피팅
```

## 16. Reservation CTA

### READY TO FIND YOUR PERFECT DRESS?

당신을 위한 드레스를 직접 만나보세요.

CTA: **피팅 예약하기**

클릭 시 예약폼으로 Smooth Scroll 한다.

## 17. Reservation Form

| 항목 | Type | 필수 |
|---|---|---:|
| 이름 | text | O |
| 연락처 | tel | O |
| 이메일 | email | 선택 |
| 결혼 예정일 | date | O |
| 방문 희망일 | date | O |
| 방문 희망시간 | select | O |
| 관심 드레스 | select | 선택 |
| 방문 인원 | number | O |
| 요청사항 | textarea | 선택 |
| 개인정보 동의 | checkbox | O |
| 마케팅 동의 | checkbox | 선택 |

## 18. Form Validation

- 이름을 입력해주세요.
- 연락처를 정확하게 입력해주세요.
- 방문 희망일을 선택해주세요.
- 방문 시간을 선택해주세요.
- 개인정보 수집 및 이용에 동의해주세요.

## 19. CTA 데이터 처리

```text
예약하기
→ Validation
→ Loading
→ Apps Script
→ Google Spreadsheet
→ Success
```

중복 제출 방지를 위해 Loading 상태에서는 버튼을 비활성화한다.

## 20. Google Spreadsheet DB

```text
React Reservation Form
→ Fetch POST
→ Google Apps Script
→ Google Spreadsheet
```

React가 직접 Spreadsheet에 접근하지 않는다.

## 21. Spreadsheet 구조

Sheet 이름: `웨딩예약`

| 접수일 | 이름 | 연락처 | 이메일 | 결혼일 | 방문일 | 방문시간 | 관심드레스 | 방문인원 | 요청사항 | 개인정보동의 | 마케팅동의 | 상태 |
|---|---|---|---|---|---|---|---|---:|---|---|---|---|

상태 기본값: `신규신청`

## 22. Apps Script

별도 파일 `google-apps-script.gs` 제공.

React와 Spreadsheet 사이에서 API 역할을 담당한다.

## 23. 환경변수

```env
REACT_APP_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/본인의배포ID/exec
```

공유용 프로젝트에는 `.env.example`만 포함한다.

## 24. Reservation Complete

```text
RESERVATION COMPLETE

예약 신청이 완료되었습니다.

담당자가 확인 후
예약 확정 안내를 드리겠습니다.

[HOME]
```

## 25. React CRA Stack

```text
React 18
Create React App
JavaScript
CSS3
Swiper
Fetch API
Google Apps Script
Google Spreadsheet
GitHub Pages
```

## 26. React Project Structure

```text
Project/
├── public/
│   ├── index.html
│   └── images/
│       ├── logo.png
│       ├── hero01.png
│       ├── hero02.png
│       ├── hero03.png
│       ├── hero04.png
│       ├── hero05.png
│       ├── dress01.png
│       ├── dress02.png
│       ├── dress03.png
│       └── dress04.png
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── HeroSlider.jsx
│   │   ├── About.jsx
│   │   ├── Collection.jsx
│   │   ├── DressCard.jsx
│   │   ├── FeaturedDress.jsx
│   │   ├── LookBook.jsx
│   │   ├── ReservationProcess.jsx
│   │   ├── ReservationCTA.jsx
│   │   ├── ReservationForm.jsx
│   │   ├── Location.jsx
│   │   └── Footer.jsx
│   ├── styles/
│   │   ├── global.css
│   │   ├── header.css
│   │   ├── hero.css
│   │   ├── collection.css
│   │   └── reservation.css
│   ├── App.js
│   └── index.js
├── .env.example
├── google-apps-script.gs
├── package.json
├── README.md
└── PRD.md
```

## 27. Image Format

모든 이미지는 PNG로 구성한다.

```text
/images/hero01.png
/images/hero02.png
/images/dress01.png
/images/lookbook01.png
```

실제 사진 교체 시 동일한 파일명을 사용하면 React 코드를 수정하지 않아도 된다.

## 28. GitHub Repository

```text
https://github.com/mgim47359-hue/Project
```

## 29. GitHub Pages

`package.json`:

```json
"homepage": "https://mgim47359-hue.github.io/Project"
```

Scripts:

```json
"predeploy": "npm run build",
"deploy": "gh-pages -d build"
```

최종 사이트:

```text
https://mgim47359-hue.github.io/Project
```

## 30. Production Build

```bash
npm run build
```

결과물:

```text
Project/
├── build/
├── public/
├── src/
├── package.json
├── package-lock.json
├── google-apps-script.gs
├── .env.example
├── README.md
└── PRD.md
```

## 31. 최종 다운로드 산출물

`Wedding-Project.zip`

포함 항목:

- React 전체 Source
- Production `build/`
- PNG Images
- Google Apps Script
- Google Spreadsheet 연결 설명
- GitHub Pages 배포 설명
- README.md
- PRD.md

## 32. README 필수 내용

1. Node.js 설치
2. 프로젝트 압축 해제
3. VS Code에서 폴더 열기
4. `npm install`
5. `npm start`
6. 이미지 교체 방법
7. Google Spreadsheet 생성
8. Spreadsheet Header 입력
9. Apps Script 생성
10. Apps Script 코드 붙여넣기
11. Web App 배포
12. `/exec` URL 확인
13. `.env` 생성
14. React 연결
15. 데이터 저장 테스트
16. `npm run build`
17. GitHub Repository 연결
18. GitHub Push
19. `npm run deploy`
20. GitHub Pages URL 확인

## 33. MVP 완료 조건

- 첨부 시안과 유사한 Full Screen Hero 구현
- 밝은 Netflix 스타일
- Hero 5개 자동 슬라이드
- 좌우 버튼
- Pagination
- 웨딩드레스 카드 UI
- Hover Animation
- Look Book
- 예약 Process
- CTA
- 실제 예약 Form
- Form Validation
- 개인정보 동의
- Google Spreadsheet 저장
- 성공/실패 메시지
- React CRA 정상 실행
- GitHub Pages 정상 배포
- Production Build 생성
- 최종 ZIP 다운로드 가능

## 34. 최종 개발 목표

```text
웨딩드레스 랜딩페이지
→ Netflix-style Visual Experience
→ Dress Collection
→ Reservation CTA
→ Reservation Form
→ Google Spreadsheet
→ Reservation Complete
→ GitHub Pages
```

최종적으로 단순한 디자인 시안이 아니라 **실제로 고객이 웨딩드레스를 확인하고 피팅 예약을 신청할 수 있는 React 기반 랜딩페이지**를 완성한다.
