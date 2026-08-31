# CINEVERSE TMDB

넷플릭스의 콘텐츠 탐색 구조에서 영감을 받은 순수 HTML/CSS/JavaScript 반응형 프로젝트입니다.

## API 키 입력

`config.js`를 열고 TMDB의 API Read Access Token 또는 API Key 중 하나를 입력하세요.

```js
window.APP_CONFIG = {
  TMDB_ACCESS_TOKEN: "여기에_Read_Access_Token",
  TMDB_API_KEY: ""
};
```

## 실행

VS Code의 Live Server 확장으로 `index.html`을 실행하는 것을 권장합니다. 키가 없거나 API 호출에 실패하면 내장 예시 콘텐츠가 표시됩니다.

- 접속하거나 새로고침할 때 메인 배너 작품이 무작위로 선택됩니다.
- 선택 작품에 YouTube 예고편이 있으면 음소거 상태로 자동 재생됩니다.
- 개발자 도구 Console에서 TMDB API 응답 데이터를 확인할 수 있습니다.

> 이 프로젝트는 TMDB API를 사용하지만 TMDB가 보증하거나 인증한 서비스는 아닙니다. Netflix의 로고·상표·콘텐츠는 포함하지 않습니다.
