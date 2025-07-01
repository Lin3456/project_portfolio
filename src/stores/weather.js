import moment from 'moment/moment';
import { defineStore } from 'pinia';
import * as _WEATHER from '@/api/weather.js';
import { weatherCodeMap } from '@/assets/data/weather-antithesis.js';

export const useWeatherStore = defineStore('weather', {
  state() {
    return {
      currentLocation: {
        name: '',
        lat: null,
        lon: null
      },
      locations: {
        // 每個地點以 name 為 key，存放 today(今日天氣資料)、daily(一周天氣)
      }
    }
  },
  getters: {
    currentWeather(state) {
      return state.locations[state.currentLocation.name]?.today || null;
    },
    weekWeather(state) {
      return state.locations[state.currentLocation.name]?.daily || null
    }
  },
  actions: {
    async setLocation(name, lat, lon, options = { today: true, daily: true }) {
      this.currentLocation = { name, lat, lon };

      if (!this.locations[name]) {
        this.locations[name] = {
          today: {
            data: null,
            lastUpdated: null,
            error: ''
          },
          daily: {
            data: null,
            lastUpdated: null,
            error: ''
          }
        }
      }

      if (options.today) await this.fetchTodayWeather(name, lat, lon);
      if (options.daily) await this.fetchDailyWeather(name, lat, lon);
    },
    /**
     * 取得今日天氣資料
     * @param {string} name 位置名稱
     * @param {number} lat 緯度
     * @param {number} lon 經度
     * @returns 
     */
    async fetchTodayWeather(name, lat, lon) {
      let todayData = this.locations[name].today || {
        lastUpdated: null,
        error: '',
      };

      const now = Date.now();

      // 10 分鐘內有快取，不重複請求
      if (todayData.lastUpdated && now - todayData.lastUpdated < 10 * 60 * 1000) {
        return;
      }

      /** 根據經緯度查天氣(當天) */
      await _WEATHER.getFutureWeather(lat, lon)
        .then(res => {
          const current = res.current_weather;
          const hourly = res.hourly;

          // 當前天氣資料
          todayData = {
            icon: weatherCodeMap[current.weathercode]?.icon,
            text: weatherCodeMap[current.weathercode]?.text,
            celsius: current.temperature,

            // 華式溫度
            fahrenheit: Math.floor((current.temperature * 9 / 5 + 32) * 100) / 100,
          }

          // 從 未來預測取得當前的其他天氣資料
          const nowHour = moment().format('YYYY-MM-DDTHH:00');
          const index = hourly.time.findIndex(t => t === nowHour);

          if (index !== -1) {
            todayData.apparent_temperature = hourly.apparent_temperature[index];
            todayData.apparent_fahrenheit = Math.floor((hourly.apparent_temperature[index] * 9 / 5 + 32) * 100) / 100;
            todayData.relative_humidity = hourly.relative_humidity_2m[index];
            todayData.wind_speed = hourly.wind_speed_10m[index];
            todayData.wind_direction = hourly.wind_direction_10m[index];
            todayData.uv_index = hourly.uv_index[index];
            todayData.precipitation_probability = hourly.precipitation_probability[index];
          }
      
          // 今天24小時的資料(chart.js使用)
          todayData.hourly = {
            time: hourly.time.map(t => moment(t).format('HH:mm')),
            temperature: hourly.temperature_2m,
            precipitation: hourly.precipitation_probability
          };
      
          todayData.lastUpdated = Date.now();
          todayData.error = '';
        })
        .catch((err) => {
          todayData.error = err.message || '無法取得天氣資料';
        })
        .finally(() => {
          this.locations[name].today = todayData;
        });
    },
    /**
     * 取得未來一周天氣資料
     * @param {string} name 位置名稱
     * @param {number} lat 緯度
     * @param {number} lon 經度
     * @returns 
     */
    async fetchDailyWeather(name, lat, lon) {
      let dailyData = this.locations[name].daily || {
        lastUpdated: null,
        error: '',
      };

      const now = Date.now();

      // 10 分鐘內有快取，不重複請求
      if (dailyData.lastUpdated && now - dailyData.lastUpdated < 10 * 60 * 1000 && dailyData) {
        return;
      }

      await _WEATHER.get7DayWeather(lat, lon)
        .then((res) => {
          const daily = res.daily;

          dailyData = {
            dates: daily.time.map(t => moment(t).format('MM/DD')),
            maxTemp: daily.temperature_2m_max,
            precipitation_probability: daily.precipitation_probability_max,
            icon: weatherCodeMap[daily.weathercode]?.icon,
            text: weatherCodeMap[daily.weathercode]?.text,
          };

          dailyData.lastUpdated = Date.now();
          dailyData.error = '';
        })
        .catch((err) => {
          dailyData.error = err.message || '無法取得天氣資料';
        })
        .finally(() => {
          this.locations[name].daily = dailyData;
        });
    }
  }
})
