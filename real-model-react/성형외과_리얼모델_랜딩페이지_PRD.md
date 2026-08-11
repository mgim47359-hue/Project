# PRD — 성형외과 리얼모델 모집 랜딩페이지

## 1. 프로젝트 기본 정보

| 항목 | 내용 |
|---|---|
| 프로젝트명 | 리얼모델 모집 랜딩페이지 |
| 서비스 목적 | 성형외과 리얼모델 지원자 모집 |
| 페이지 유형 | Desktop Landing Page |
| 프런트엔드 | React |
| React 구성 | Create React App(CRA) |
| UI 방향 | Netflix 스타일을 참고한 밝고 고급스러운 이미지 중심 UI |
| 데이터 수집 | CTA → 지원 신청 Form |
| 데이터 저장 | Google Spreadsheet 연동 |
| 배포 | GitHub Pages |
| Repository | `Project` |
| 목표 주소 | `https://mgim47359-hue.github.io/Project` |
| 최종 산출물 | React Source + Production Build |

## 2. 프로젝트 개요

성형외과에서 리얼모델을 온라인으로 모집하기 위한 데스크탑 전용 랜딩페이지를 제작한다.

기존 시안이 가지고 있는 모델 모집 정보 구조를 유지하면서, 디자인은 **Netflix처럼 강한 Hero 이미지와 콘텐츠 카드가 이어지는 구조**를 적용한다.

다만 Netflix의 어두운 UI를 그대로 복제하지 않고 성형외과의 이미지에 맞게 **White + Soft Pink + Light Gray** 기반의 밝은 프리미엄 디자인으로 재해석한다.

페이지의 최종 목표는 방문자가 모집 내용을 확인한 후 **「모델 지원하기」 CTA를 클릭하여 지원 정보를 제출하는 것**이다.

## 3. 핵심 목표

### Business Goal

방문자를 실제 모델 지원자로 전환한다.

```text
SNS / 광고
      ↓
Landing Page
      ↓
모델 모집 내용 확인
      ↓
실제 모델 / 모집 분야 확인
      ↓
혜택 확인
      ↓
사진 제출 방법 확인
      ↓
모델 지원하기
      ↓
지원서 작성
      ↓
개인정보 동의
      ↓
신청 완료
      ↓
Google Spreadsheet 저장
```

### 핵심 KPI

| KPI | 설명 |
|---|---|
| 방문자 수 | 랜딩페이지 방문 |
| CTA 클릭률 | 모델 지원하기 클릭 |
| Form 진입률 | 지원폼 도달 |
| Form 완료율 | 지원서 작성 완료 |
| 최종 지원율 | 실제 신청 완료 |
| 이탈률 | 페이지 중간 이탈 |
| 사진 제출률 | 유효 지원자 판단 |

## 4. 주요 타깃

### Primary Target

**만 19세 이상 성인 남녀**

성형/미용에 관심이 있으며 모델 참여를 통해 시술 또는 수술 비용 지원 등의 혜택을 원하는 사용자.

### 사용자 Needs

사용자는 랜딩페이지에서 빠르게 다음 내용을 알고 싶어 한다.

- 무슨 모델을 모집하는지
- 자신이 지원 가능한지
- 어떤 분야를 모집하는지
- 어떤 혜택이 있는지
- 사진은 어떻게 찍어야 하는지
- 어떻게 지원하는지

따라서 긴 설명보다는 이미지, 카드, 아이콘, 짧은 카피 중심으로 구성한다.

## 5. 디자인 콘셉트

### Bright Netflix Style

Netflix의 핵심적인 콘텐츠 표현 방식을 참고한다.

#### Netflix에서 참고할 요소

- 강력한 Hero Visual
- 대형 Headline
- 이미지 중심 콘텐츠
- 카드형 콘텐츠
- 가로 배열
- 명확한 CTA
- 섹션별 강한 시각적 구분
- 이미지 Hover 효과

이를 성형외과 브랜드에 맞게 밝은 톤으로 변경한다.

### 전체 분위기

```text
Netflix Layout
       +
Beauty Brand
       +
Plastic Surgery
       +
Soft Pink
       +
Premium White
```

## 6. Color System

| 용도 | 컬러 |
|---|---|
| Primary | `#F6DADD` |
| Secondary | `#FFF4F5` |
| Background | `#FFFFFF` |
| Section Background | `#F7F7F8` |
| Text | `#171717` |
| Secondary Text | `#666666` |
| CTA | `#C92838` |
| CTA Hover | `#A91E2B` |

## 7. Typography

추천 Font: **Pretendard**

```css
font-family:
  Pretendard,
  -apple-system,
  BlinkMacSystemFont,
  "Segoe UI",
  sans-serif;
```

### Typography Scale

| Type | Size |
|---|---:|
| Hero | 64px |
| H1 | 52px |
| H2 | 40px |
| H3 | 26px |
| Body Large | 20px |
| Body | 16px |
| Caption | 14px |

## 8. 전체 페이지 구조

```text
App
│
├── Header
├── Hero
├── Model Showcase
├── Recruitment Info
├── Categories
├── Benefits
├── Application Process
├── Photo Guide
├── Notice
├── CTA
├── Application Form
└── Footer
```

## 9. Header

상단에는 심플한 Navigation을 제공한다.

```text
LOGO

모델모집
모집분야
지원절차
사진가이드

                       [모델 지원하기]
```

Header는 스크롤 시 상단 고정 형태를 적용할 수 있다.

CTA 클릭 시 `ApplicationForm`으로 Smooth Scroll 한다.

## 10. Hero Section

페이지에서 가장 중요한 영역이다.

첨부 시안의 모델 이미지와 유사한 구조를 활용한다.

```text
┌──────────────────────────────────────────┐

 YOU'RE TURN

 당신의 변화가
 새로운 이야기가 됩니다.

 리얼모델을 모집합니다.

 [모델 지원하기]

                         MODEL IMAGE

└──────────────────────────────────────────┘
```

CTA 버튼: **리얼모델 지원하기**

클릭하면 지원폼 영역으로 이동한다.

## 11. Model Showcase

Netflix의 콘텐츠 Row 구조를 활용한다.

### 제목

**REAL MODEL**

### Sub Copy

실제 모델들의 변화와 이야기를 만나보세요.

```text
[MODEL]

[Model01] [Model02] [Model03] [Model04]
```

카드 Hover:

```css
transform: scale(1.04);
transition: 0.3s ease;
```

## 12. Recruitment Information

### Section Title

**REAL MODEL RECRUIT**

### 모집기간

상시모집

### 모집대상

만 19세 이상 성인 남녀

### 지원혜택

선정된 모델에 대해 운영 정책에 따른 시술/수술 지원

구체적인 비용 지원 범위는 실제 병원 정책에 맞춰 최종 문구를 확정한다.

## 13. Recruitment Category

Netflix의 콘텐츠 카드처럼 구성한다.

### 모집 분야

- 눈성형
- 코성형
- 안면윤곽
- 가슴성형
- 지방이식

Desktop: **5 Column Layout**

카드에 아이콘 또는 관련 이미지를 사용한다.

## 14. Benefits

### Headline

**리얼모델에게 제공되는 혜택**

```text
01
시술/수술 지원

02
전문 의료진 상담

03
개인 맞춤 상담

04
체계적인 진행 과정
```

의료적 결과를 보장하는 표현은 사용하지 않는다.

## 15. Application Process

### Headline

**지원은 이렇게 진행됩니다**

```text
01 서류심사
→
02 개별연락
→
03 사전미팅
→
04 내원상담
→
05 최종선정
```

Desktop에서는 가로형 Step UI로 구현한다.

## 16. Photo Guide

### Headline

**지원 사진은 이렇게 준비해주세요**

FACE 예시:

```text
[정면] [45도] [측면] [셀카]
```

사진 카드 아래 촬영 방법을 간단하게 안내한다.

민감할 수 있는 신체 사진이 필요한 모집 분야는 일반 지원 단계에서 무조건 요구하기보다, 필요성과 수집 범위를 실제 운영정책·법률 검토에 맞춰 별도로 설계한다.

## 17. CTA Section

페이지 중간과 하단에 CTA를 반복 배치한다.

### Copy

**당신의 새로운 변화를 시작해보세요.**

Sub Copy:

리얼모델 지원은 간단한 신청으로 시작됩니다.

### Button

**리얼모델 지원하기**

## 18. Application Form

CTA 클릭 시 해당 위치로 이동한다.

### Title

**리얼모델 지원하기**

### 입력 정보

| 필드 | Type | 필수 |
|---|---|---:|
| 이름 | text | O |
| 연락처 | tel | O |
| 생년월일/성인 여부 확인 | date 등 | O |
| 지원분야 | select | O |
| 상담내용 | textarea | 선택 |
| 개인정보 동의 | checkbox | O |

사진 제출이 실제 모집에 필수라면 별도의 안전한 업로드 시스템을 사용한다.

## 19. 개인정보 동의

```text
□ 개인정보 수집 및 이용 동의 [필수]
□ 모델 지원을 위한 개인정보 처리 동의 [필수]
□ 마케팅 정보 수신 동의 [선택]
```

필수 동의와 선택 동의를 분리한다.

지원자는 `[자세히 보기]`를 통해 수집 목적, 항목, 보유기간 등을 확인할 수 있도록 한다.

## 20. Google Spreadsheet 연동

지원자가 신청하면 데이터가 Google Spreadsheet로 전달된다.

```text
React Form
      ↓
Google Apps Script Web App
      ↓
Google Spreadsheet
```

Spreadsheet 예:

| 접수일 | 이름 | 연락처 | 연령 확인 | 지원분야 | 상담내용 | 동의 |
|---|---|---|---|---|---|---|
| 2026-08-11 | 홍길동 | 010-****-**** | 성인 | 코성형 | 상담희망 | Y |

React 코드에 Spreadsheet 자체의 수정 권한이나 민감한 인증정보를 노출하지 않는다.

민감한 신체 사진이나 의료 관련 정보는 단순 Google Sheet 저장 대상으로 잡지 않는 것을 권장한다. 해당 데이터가 필요하다면 별도의 보안 백엔드를 설계한다.

## 21. Submit Process

```text
지원하기
↓
Validation
↓
개인정보 동의 확인
↓
Loading
↓
Google Apps Script
↓
Spreadsheet 저장
↓
Success
↓
신청완료
```

## 22. Success UI

신청 성공 시:

```text
✓

지원 신청이 완료되었습니다.

지원 내용을 확인한 후
담당자가 개별적으로 연락드리겠습니다.

[확인]
```

실패 시:

```text
신청 처리 중 문제가 발생했습니다.

잠시 후 다시 시도해주세요.
```

## 23. React CRA 구조

```text
Project/

├── public/
│   ├── index.html
│   └── images/
│
├── src/
│   ├── assets/
│   │   ├── images/
│   │   └── icons/
│   │
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Hero.jsx
│   │   ├── ModelShowcase.jsx
│   │   ├── RecruitmentInfo.jsx
│   │   ├── Categories.jsx
│   │   ├── Benefits.jsx
│   │   ├── Process.jsx
│   │   ├── PhotoGuide.jsx
│   │   ├── CTA.jsx
│   │   ├── ApplicationForm.jsx
│   │   └── Footer.jsx
│   │
│   ├── styles/
│   │   ├── global.css
│   │   └── landing.css
│   │
│   ├── App.js
│   └── index.js
│
├── package.json
└── README.md
```

## 24. App Component 구조

```jsx
<App>
  <Header />

  <main>
    <Hero />
    <ModelShowcase />
    <RecruitmentInfo />
    <Categories />
    <Benefits />
    <Process />
    <PhotoGuide />
    <CTA />
    <ApplicationForm />
  </main>

  <Footer />
</App>
```

## 25. React 기능 요구사항

| ID | 기능 | Priority |
|---|---|---|
| FR01 | Header Navigation | Must |
| FR02 | Hero | Must |
| FR03 | CTA | Must |
| FR04 | Model Cards | Must |
| FR05 | 모집분야 Cards | Must |
| FR06 | 지원절차 | Must |
| FR07 | 사진가이드 | Must |
| FR08 | Application Form | Must |
| FR09 | Validation | Must |
| FR10 | 개인정보 동의 | Must |
| FR11 | Google Sheet 연동 | Must |
| FR12 | 신청 성공 UI | Must |
| FR13 | 신청 실패 UI | Must |
| FR14 | Smooth Scroll | Should |
| FR15 | Card Hover | Should |
| FR16 | Loading State | Must |

## 26. GitHub Pages 배포 설정

Repository:

```text
Project
```

`package.json`:

```json
"homepage": "https://mgim47359-hue.github.io/Project"
```

Scripts:

```json
"predeploy": "npm run build",
"deploy": "gh-pages -d build"
```

배포 흐름:

```text
React Source
     ↓
npm run build
     ↓
build/
     ↓
GitHub
     ↓
gh-pages
     ↓
GitHub Pages
```

목표 공개 주소:

`https://mgim47359-hue.github.io/Project`

## 27. 최종 Build 산출물

```text
Project/

├── build/
├── public/
├── src/
├── package.json
├── package-lock.json
└── README.md
```

다운로드용:

```text
Project-build.zip
```

소스코드뿐만 아니라 `npm run build`가 완료된 실제 배포용 `build` 폴더까지 포함하는 것을 최종 납품 조건으로 한다.

## 28. 개발 완료 기준

다음 조건을 모두 만족하면 MVP 개발 완료로 본다.

- 첨부 시안의 콘텐츠 구조 유지
- 밝은 Netflix 스타일로 재설계
- React CRA 프로젝트 실행 가능
- 섹션별 컴포넌트 분리
- 주요 CTA가 실제 지원 Form으로 연결
- Form Validation 작동
- 개인정보 동의 처리
- Google Apps Script를 통한 Spreadsheet 저장
- 신청 성공/실패 UI 구현
- GitHub Pages 정상 배포
- Production Build 생성
- `React 전체 프로젝트 + build 폴더 + ZIP` 형태 납품
