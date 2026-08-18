# Wedding-Project 실행 및 Google Spreadsheet 연결 가이드

이 프로젝트는 React CRA 기반 웨딩드레스 예약 랜딩페이지입니다. Hero Swiper, 컬렉션 필터, 룩북 Lightbox, 예약 Form Validation, Google Spreadsheet 저장 코드가 포함되어 있습니다.

## 1. 실행

1. Node.js 설치 후 VS Code에서 프로젝트 폴더를 엽니다.
2. 터미널에서 아래 실행:

```bash
npm install
npm start
```

브라우저: `http://localhost:3000`

## 2. Google Spreadsheet 만들기

Google Drive → 새로 만들기 → Google 스프레드시트.
하단 시트 탭 이름을 정확히 `웨딩예약`으로 변경합니다.

첫 행 헤더를 다음 순서로 입력합니다.

`접수일 | 이름 | 연락처 | 이메일 | 결혼일 | 방문일 | 방문시간 | 관심드레스 | 방문인원 | 요청사항 | 개인정보동의 | 마케팅동의 | 상태`

## 3. Apps Script 연결

스프레드시트 → 확장 프로그램 → Apps Script → 기본 코드를 삭제 → 프로젝트의 `google-apps-script.gs` 내용을 전부 붙여넣고 저장합니다.

오른쪽 위 `배포` → `새 배포` → 유형 `웹 앱`을 선택합니다.

- 다음 사용자로 실행: 나
- 액세스 권한: 모든 사용자(계정에서 제공되는 외부 접근 옵션)

권한 승인을 완료하고 배포합니다. 생성된 `/exec`로 끝나는 웹 앱 URL을 복사합니다.

예:
`https://script.google.com/macros/s/XXXXXXXX/exec`

## 4. React에 URL 넣기

프로젝트 최상위에서 `.env.example`을 복사해 `.env` 파일을 만듭니다.

```env
REACT_APP_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/본인의배포ID/exec
```

`.env`를 수정한 뒤에는 개발 서버를 재시작합니다.

```bash
Ctrl + C
npm start
```

## 5. 저장 테스트

예약폼에서 이름, 연락처, 결혼 예정일, 방문 희망일, 시간, 개인정보 동의를 입력하고 `피팅 예약 신청하기`를 누릅니다. 성공 메시지가 뜨고 `웨딩예약` 시트에 행이 추가되면 연결 성공입니다.

URL을 설정하지 않은 상태에서는 데모 메시지가 표시되며 실제 저장은 하지 않습니다.

## 6. 오류 체크

- `/exec` URL인지 확인
- 시트 이름이 정확히 `웨딩예약`인지 확인
- Apps Script 수정 후 `배포 → 배포 관리 → 수정 → 새 버전 → 배포` 수행
- 웹앱 URL을 브라우저에서 열었을 때 JSON `status: ok`가 나오는지 확인
- `.env` 수정 후 `npm start` 재시작

## 7. 이미지 교체

`public/images/`의 PNG 파일을 같은 파일명으로 교체하면 코드 수정 없이 사용할 수 있습니다.

## 8. Production Build

```bash
npm run build
```

성공하면 `build/` 폴더가 생성됩니다.

## 9. GitHub Pages

목표 주소: `https://mgim47359-hue.github.io/Project`

```bash
git init
git add .
git commit -m "Wedding landing page"
git branch -M main
git remote add origin https://github.com/mgim47359-hue/Project.git
git push -u origin main
npm run deploy
```

GitHub Repository → Settings → Pages에서 `gh-pages` 브랜치 배포 여부를 확인합니다.

## 10. 개인정보 주의

실서비스에서는 개인정보처리방침, 수집 목적/항목/보유기간/파기정책을 실제 운영정책에 맞춰 고지하세요. 사진, 신체정보, 의료정보 등 민감한 데이터를 추가로 수집하려면 Google Spreadsheet보다 접근통제·암호화가 가능한 별도 백엔드/스토리지를 권장합니다.


## 현재 제공 버전
이 ZIP은 전달받은 Google Apps Script 웹앱 URL을 기본 연결값으로 포함합니다. 따라서 `.env`를 별도로 만들지 않아도 예약 폼이 해당 웹앱으로 POST 요청을 전송합니다. 운영 URL을 변경하려면 `.env`의 `REACT_APP_GOOGLE_SCRIPT_URL` 값을 교체한 뒤 개발 서버를 재시작하거나 다시 빌드하세요.
