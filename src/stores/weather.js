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
        // 每個地點以 name 為 key，存放 today(今日天氣資料)、daily(一周天氣)、week()
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
            color: weatherCodeMap[current.weathercode]?.color,
            tip: weatherCodeMap[current.weathercode]?.tip,
            tipColor: weatherCodeMap[current.weathercode]?.bgClass,
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

      await _WEATHER.get8DayWeather(lat, lon)
        .then((res) => {
          const daily = res.daily;

          const weekList = daily.time.map((t, index) => {
            const code = daily.weathercode[index];
            return {
              date: moment(t).format('YYYY-MM-DD'),
              temp: daily.temperature_2m_max[index], // 最高氣溫
              min_temp: daily.temperature_2m_min[index], // 最低氣溫
              apparent: daily.apparent_temperature_max[index], // 最高體溫
              min_apparent: daily.apparent_temperature_min[index], // 最低氣溫
              precipitation: daily.precipitation_probability_max[index], // 最高降雨率
              minPrecipitation: daily.precipitation_probability_min[index] ?? '無資料', // 最低降雨率
              precipitationSum: daily.precipitation_sum[index], // 總降雨量
              max_windspeed: daily.windspeed_10m_max[index],  // 最高風速
              sunrise: moment(daily.sunrise[index]).format('HH:mm'),  // 日出時間
              sunset: moment(daily.sunset[index]).format('HH:mm'), // 日落時間
              uv_index: daily.uv_index_max[index], // 最高紫外線指數
              icon: weatherCodeMap[code]?.icon || '', // 天氣圖示
              text: weatherCodeMap[code]?.text || '', // 天氣描述
              color: weatherCodeMap[code]?.color || '',
              tip: weatherCodeMap[code]?.tip,  // 天氣 小提示
            }
          });

          dailyData = {
            detail: weekList,
            dates: daily.time.map(t => moment(t).format('MM/DD')),
            maxTemp: daily.temperature_2m_max,
            minTemp: daily.temperature_2m_min,
            maxPrecipitation: daily.precipitation_probability_max,
            minPrecipitation: daily.precipitation_probability_min,
            maxApparent: daily.apparent_temperature_max,
            minApparent: daily.apparent_temperature_min,
            weathercode: daily.weathercode,
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
    },
  }
})
