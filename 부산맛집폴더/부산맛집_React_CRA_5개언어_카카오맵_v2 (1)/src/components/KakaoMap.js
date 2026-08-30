import { useEffect, useRef, useState } from "react";
import { APP_CONFIG } from "../config";
let sdkPromise;
function loadSdk(key) {
  if (window.kakao?.maps) return Promise.resolve(window.kakao);
  if (sdkPromise) return sdkPromise;
  sdkPromise = new Promise((resolve, reject) => {
    const ready = () =>
      window.kakao?.maps
        ? window.kakao.maps.load(() => resolve(window.kakao))
        : reject(new Error("SDK"));
    const existing = document.getElementById("kakao-map-sdk");
    if (existing) {
      existing.addEventListener("load", ready, { once: true });
      existing.addEventListener("error", reject, { once: true });
      return;
    }
    const script = document.createElement("script");
    script.id = "kakao-map-sdk";
    script.async = true;
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${encodeURIComponent(key)}&autoload=false`;
    script.onload = ready;
    script.onerror = reject;
    document.head.appendChild(script);
  });
  return sdkPromise;
}
export default function KakaoMap({ restaurant }) {
  const element = useRef(null),
    [status, setStatus] = useState("loading");
  const lat = Number(restaurant?.LAT),
    lng = Number(restaurant?.LNG);
  useEffect(() => {
    let active = true;
    const key = APP_CONFIG.KAKAO_MAP_JAVASCRIPT_KEY.trim();
    if (!key || key.includes("여기에_")) {
      setStatus("key");
      return;
    }
    if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
      setStatus("location");
      return;
    }
    setStatus("loading");
    loadSdk(key)
      .then((kakao) => {
        if (!active || !element.current) return;
        const center = new kakao.maps.LatLng(lat, lng);
        const map = new kakao.maps.Map(element.current, { center, level: 3 });
        new kakao.maps.Marker({
          map,
          position: center,
          title: restaurant.MAIN_TITLE,
        });
        map.addControl(
          new kakao.maps.ZoomControl(),
          kakao.maps.ControlPosition.RIGHT,
        );
        setStatus("ready");
        requestAnimationFrame(() => map.relayout());
      })
      .catch(() => active && setStatus("error"));
    return () => {
      active = false;
    };
  }, [lat, lng, restaurant?.MAIN_TITLE]);
  if (status === "key")
    return (
      <div className="map-message">
        src/config.js에 카카오 JavaScript 키를 입력해 주세요.
      </div>
    );
  if (status === "location")
    return <div className="map-message">유효한 위치 정보가 없습니다.</div>;
  return (
    <div className="map-wrap">
      <div ref={element} className="map" />
      {status === "loading" && (
        <div className="map-status">지도를 불러오는 중…</div>
      )}
      {status === "error" && (
        <div className="map-message map-error">
          지도를 불러오지 못했습니다.
          <br />
          카카오 Web 플랫폼 도메인과 JavaScript 키를 확인해 주세요.
        </div>
      )}
    </div>
  );
}
