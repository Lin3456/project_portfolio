// weatherAPI.js
import axios from 'axios';
import moment from 'moment';

const BASE_URL = 'https://api.open-meteo.com/v1/';

/** 天氣預報 - 欄位 */
const HOUR_COLUMN = 'temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,wind_direction_10m,uv_index,precipitation_probability';
const FUTURE_COLUMN = 'weathercode,temperature_2m_max,temperature_2m_min,precipitation_probability_max,precipitation_probability_min,apparent_temperature_max,apparent_temperature_min,uv_index_max,precipitation_sum,windspeed_10m_max,sunrise,sunset';

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

/**
 * 根據經緯度查天氣(未來一周的概覽)
 * @param {number} lat 緯度
 * @param {number} lon 經度
 * @returns 
 */
export function get8DayWeather(lat, lon) {
  const startDate = moment().add(1, 'day').format('YYYY-MM-DD');
  const endDate = moment().add(7, 'day').format('YYYY-MM-DD');

  return axios.get(`${BASE_URL}/forecast`, {
    params: {
      latitude: lat,
      longitude: lon,
      daily: FUTURE_COLUMN,
      start_date: startDate,
      end_date: endDate,
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