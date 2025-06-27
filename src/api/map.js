import axios from '@/api/axios.js'

const KEY = import.meta.env.VITE_OPENCAGE_KEY;
const URL = 'https://api.opencagedata.com/geocode/v1/json';

/** ----------------------------------------------------- */
/** API                                                   */
/** ----------------------------------------------------- */

/**
 * 根據經緯度反查位置
 * @param {number} lat 緯度
 * @param {number} lon 經度
 * @returns 
 */
export function reverseGeocode(lat, lon) {
  return new Promise((resolve, reject) => {
    axios.get(URL,
      { 
        params: {
          q: `${lat}+${lon}`,
          key: KEY,
          language: 'zh-Hant',
          pretty: 1,
          no_annotations: 1
        }
      }
    )
      .then((res) => {
        const data = res.data;
        if (!data.results.length) {
          reject(new Error('查無地理位置結果'));
          return;
        }

        const components = data.results[0].components;
        const city = components.city || components.town || components.county || '';
        const district = components.suburb || components.village || components.neighbourhood || '';

        resolve(`${city} ${district}`.trim());
      })
      .catch((err) => {
        reject(new Error(err));
      });
  });
};

/**
 * 根據中文地名查詢經緯度
 * @param {string} place 中文地區名稱
 * @returns {Promise<{ lat: number, lon: number }>}
 */
export function geocode(place) {
  return new Promise((resolve, reject) => {
    axios.get(URL, {
      params: {
        q: place,
        key: KEY,
        language: 'zh-Hant',
        no_annotations: 1,
        limit: 1
      }
    })
    .then((res) => {
      const results = res.data.results;
      if (!results || results.length === 0) {
        reject(new Error('查無經緯度'));
        return;
      }

      const { lat, lng } = results[0].geometry;
      resolve({ lat, lon: lng });
    })
    .catch((err) => {
      reject(new Error(err));
    });
  });
}