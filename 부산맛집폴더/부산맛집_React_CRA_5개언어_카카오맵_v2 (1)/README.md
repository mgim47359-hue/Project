# 부산맛집 탐색 React CRA

PRD v1.1 기준의 부산 맛집 정보 서비스입니다. 검색, 구·군 필터, 다국어 API 구조, 상세, 즐겨찾기, 카카오맵을 포함합니다.

## 실행
1. `npm install`
2. `.env.example`을 `.env`로 복사
3. `.env`의 `REACT_APP_KAKAO_MAP_JAVASCRIPT_KEY`에 카카오 JavaScript 키 입력
4. `npm start`

## 실제 공공데이터 API
`.env`에서 `REACT_APP_FOOD_API_SERVICE_KEY`를 입력하고 `REACT_APP_USE_LIVE_API=true`로 변경하세요. 브라우저 CORS 문제가 있으면 `REACT_APP_API_BASE_URL`에 별도 프록시 주소를 넣어야 합니다. 인증키는 공개 저장소에 커밋하지 마세요.

## GitHub Pages
`package.json`의 homepage는 `https://yshop.github.io/react2/`로 설정되어 있습니다.
1. GitHub 저장소 `yshop/react2`에 업로드
2. `npm run deploy`
3. 저장소 Settings → Pages에서 `gh-pages` 브랜치 확인

카카오 개발자 콘솔 플랫폼 Web 사이트 도메인에 `http://localhost:3000`과 `https://yshop.github.io`를 등록하세요.
