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
        // 每個地點以 name 為 key
      }
    }
  },
  getters: {
    currentWeather(state) {
      return state.locations[state.currentLocation.name]?.data || null
    },
  },
  actions: {
    async setLocation(name, lat, lon) {
      this.currentLocation = { name, lat, lon };

      if (!this.locations[name]) {
        this.locations[name] = {
          data: null,
          lastUpdated: null,
          loading: false,
          error: null
        }
      }

      await this.fetchWeather(name, lat, lon);
    },
    async fetchWeather(name, lat, lon) {
      const locData = this.locations[name] || {
        data: null,
        lastUpdated: null,
        error: '',
      };

      const now = Date.now();

      // 10 分鐘內有快取，不重複請求
      if (locData.lastUpdated && now - locData.lastUpdated < 10 * 60 * 1000 && locData.data) {
        return
      }

      /** 根據經緯度查天氣(當天) */
      await _WEATHER.getFutureWeather(lat, lon)
        .then(res => {
          const current = res.current_weather;
          const hourly = res.hourly;

          // 當前天氣資料
          locData.data = {
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
            locData.data.apparent_temperature = hourly.apparent_temperature[index];
            locData.data.apparent_fahrenheit = Math.floor((hourly.apparent_temperature[index] * 9 / 5 + 32) * 100) / 100;
            locData.data.relative_humidity = hourly.relative_humidity_2m[index];
            locData.data.wind_speed = hourly.wind_speed_10m[index];
            locData.data.wind_direction = hourly.wind_direction_10m[index];
            locData.data.uv_index = hourly.uv_index[index];
            locData.data.precipitation_probability = hourly.precipitation_probability[index];
          }
      
          // 今天24小時的資料(chart.js使用)
          locData.data.hourly = {
            time: hourly.time.map(t => moment(t).format('HH:mm')),
            temperature: hourly.temperature_2m,
            precipitation: hourly.precipitation_probability
          };
      
          locData.lastUpdated = Date.now();
          locData.data.error = '';
        })
        .catch((err) => {
          locData.error = err.message || '無法取得天氣資料';
        })
        .finally(() => {
          this.locations[name] = locData;
        });
    }
  }
})
