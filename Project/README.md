# Real Model Landing Page

성형외과 리얼모델 모집용 React CRA 랜딩페이지입니다.

## 실행

```bash
npm install
npm start
```

## Google Spreadsheet 연동

1. Google Spreadsheet를 생성합니다.
2. 확장 프로그램 → Apps Script에서 `google-apps-script.gs` 내용을 붙여넣습니다.
3. 웹 앱으로 배포하고 실행 권한을 설정합니다.
4. 프로젝트 루트에 `.env` 파일을 만들고 아래 값을 입력합니다.

```env
REACT_APP_GOOGLE_SCRIPT_URL=발급받은_웹앱_URL
```

5. 개발 서버를 다시 실행합니다.

> 실제 운영 환경에서 민감한 의료·신체 이미지나 고위험 개인정보를 단순 Google Sheet에 저장하는 구조는 권장하지 않습니다.

## 빌드

```bash
npm run build
```

## GitHub Pages 배포

```bash
npm run deploy
```

배포 목표 주소: `https://mgim47359-hue.github.io/Project`
