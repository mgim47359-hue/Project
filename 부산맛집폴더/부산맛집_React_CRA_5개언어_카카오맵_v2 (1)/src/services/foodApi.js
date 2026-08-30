import {APP_CONFIG,LANGUAGE_ENDPOINTS} from "../config";
import {sampleRestaurants} from "../data/restaurants";
export async function fetchRestaurants({language="ko",pageNo=1,numOfRows=100}){
 if(!APP_CONFIG.USE_LIVE_API||!APP_CONFIG.FOOD_API_SERVICE_KEY) return {items:sampleRestaurants,totalCount:sampleRestaurants.length,isDemo:true};
 const base=APP_CONFIG.API_BASE_URL.replace(/\/$/,""); const endpoint=LANGUAGE_ENDPOINTS[language]||LANGUAGE_ENDPOINTS.ko;
 const params=new URLSearchParams({serviceKey:APP_CONFIG.FOOD_API_SERVICE_KEY,numOfRows:String(numOfRows),pageNo:String(pageNo),resultType:"json"});
 const response=await fetch(`${base}/${endpoint}?${params}`); if(!response.ok) throw new Error(`HTTP ${response.status}`);
 const data=await response.json(); console.log("FoodService API 응답:",{resultCode:data?.getFoodKr?.header?.resultCode,totalCount:data?.getFoodKr?.body?.totalCount});
 const root=data[endpoint]||data.getFoodKr||data.response; const body=root?.body||root; const raw=body?.items?.item||body?.item||[];
 return {items:Array.isArray(raw)?raw:[raw].filter(Boolean),totalCount:Number(body?.totalCount||raw.length),isDemo:false};
}
