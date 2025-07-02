// weatherAPI.js
import axios from 'axios';

const BASE_URL = 'https://api.open-meteo.com/v1/';

/** 天氣預報 - 欄位 */
const HOUR_COLUMN = 'temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,wind_direction_10m,uv_index,precipitation_probability';
const FUTURE_COLUMN = 'weathercode,temperature_2m_max,temperature_2m_min,precipitation_probability_max,precipitation_probability_min';

/** ----------------------------------------------------- */
/** API                                                   */
/** ----------------------------------------------------- */

/**
 * 根據經緯度查天氣(未來24小時)
 * @param {number} lat 緯度
 * @param {number} lon 經度
 * @returns 
 */
export function getFutureWeather(lat, lon) {
  return axios.get(`${BASE_URL}/forecast`, {
    params: {
      latitude: lat,
      longitude: lon,
      current_weather: true,
      hourly: HOUR_COLUMN,
      forecast_days: 1,
      timezone: 'Asia/Taipei',
    }
  })
    .then(res => {
      return res.data;
    })
    .catch((err) => {
      reject(new Error(err));
    });
}

export function get7DayWeather(lat, lon) {
  return axios.get(`${BASE_URL}/forecast`, {
    params: {
      latitude: lat,
      longitude: lon,
      daily: FUTURE_COLUMN,
      forecast_days: 7,
      timezone: 'Asia/Taipei',
    }
  })
    .then(res => {
      return res.data;
    })
    .catch((err) => {
      reject(new Error(err));
    });
}