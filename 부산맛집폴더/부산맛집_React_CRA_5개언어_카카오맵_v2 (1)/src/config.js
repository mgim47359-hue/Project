// 카카오 개발자 콘솔에서 발급받은 "JavaScript 키"를 아래 값에 입력하세요.
export const APP_CONFIG = {
  KAKAO_MAP_JAVASCRIPT_KEY:
    process.env.REACT_APP_KAKAO_MAP_JAVASCRIPT_KEY ||
    "여기에_카카오맵_JAVASCRIPT_KEY_입력",
  FOOD_API_SERVICE_KEY: process.env.REACT_APP_FOOD_API_SERVICE_KEY || "",
  API_BASE_URL:
    process.env.REACT_APP_API_BASE_URL ||
    "http://apis.data.go.kr/6260000/FoodService",
  USE_LIVE_API: process.env.REACT_APP_USE_LIVE_API === "true",
};
export const LANGUAGE_ENDPOINTS = {
  ko: "getFoodKr",
  en: "getFoodEn",
  ja: "getFoodJa",
  zhs: "getFoodZhs",
  zht: "getFoodZht",
};
