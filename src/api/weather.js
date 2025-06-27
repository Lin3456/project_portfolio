// weatherAPI.js
import axios from 'axios';

const WEATHER_KEY = import.meta.env.VITE_WEATHER_KEY;
const URL = 'https://api.weatherapi.com/v1/current.json';

/** ----------------------------------------------------- */
/** API                                                   */
/** ----------------------------------------------------- */

/**
 * 根據地名查天氣
 * @param {string} locationName 地名
 * @returns 
 */
export function getWeather(lat, lon) {
  return axios.get(URL, {
    params: {
      key: WEATHER_KEY,
      q: `${lat},${lon}`,
      lang: 'zh-tw'
    }
  }).then(res => {
    const current = res.data.current;
    return {
      temp_c: current.temp_c,
      condition: current.condition.text,
      icon: current.condition.icon,
    };
  }).catch((err) => {
    reject(new Error(err));
  });;
}
