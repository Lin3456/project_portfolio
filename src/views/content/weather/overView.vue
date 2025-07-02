<template>
  <div class="container-fluid p-4 position-relative">
    <div class="title">
      搜尋區域: {{ city }}
      <button type="button" class="btn btn-link" @click="openModal">
        選擇地區
      </button>
    </div>

    <div class="row g-4 align-items-stretch">
      <!-- 當日天氣 -->
      <div class="col-12 col-md-6">
        <div class="card h-100 d-flex flex-column">
          <div v-if="!todayWeather.error">
            <div class="card-body d-flex align-items-center gap-4">
              <i :class="`weather-icon ${todayWeather.icon}`" :style="{ color: todayWeather.color}"></i>

              <!-- 溫度相關資料 -->
              <div class="d-flex flex-column">
                <span class="h4">{{ `${todayWeather.celsius}°C | ${todayWeather.fahrenheit} °F` }}</span>
                <small class="text-secondary">{{ `(體感${todayWeather.apparent_temperature}°C | ${todayWeather.apparent_temperature} °F)` }}</small>
                <span style="font-size: 16px">{{ `降雨機率: ${todayWeather.precipitation_probability}%` }}</span>
                <span style="font-size: 16px">{{ `濕度: ${todayWeather.relative_humidity}%` }}</span>
                <span style="font-size: 16px">{{ `風速: ${todayWeather.wind_speed} 公里/時` }}</span>
              </div>

              <!-- 時間資訊 -->
              <div class="d-flex flex-column text-center ms-auto align-self-start pt-2">
                <span class="h1">{{ currentWeekday }}</span>
                <span>{{ currentHour }}</span>
                <span>{{ todayWeather.text }}</span>
              </div>
            </div>

            <div class="px-3">
              <!-- Tab 標籤 -->
              <ul class="nav nav-tabs mb-2">
                <li class="nav-item">
                  <button class="nav-link active" data-bs-toggle="tab" data-bs-target="#tempChart">氣溫</button>
                </li>
                <li class="nav-item">
                  <button class="nav-link" data-bs-toggle="tab" data-bs-target="#rainChart">降雨機率</button>
                </li>
              </ul>

              <div class="tab-content p-3" style="min-height: 250px;">
                <div class="tab-pane fade show active" id="tempChart">
                  <!-- 氣溫折線圖 -->
                  <LineChart
                    v-if="todayWeather.hourly"
                    :labels="todayWeather.hourly.time"
                    :datasets="temperatureDatasets"
                    :stepSize="2"
                  />
                </div>
                <div class="tab-pane fade" id="rainChart">
                  <!-- 降雨機率折線圖 -->
                  <LineChart
                    v-if="todayWeather.hourly"
                    :labels="todayWeather.hourly.time"
                    :datasets="precipitationDatasets"
                    :stepSize="2"
                  />
                </div>
              </div>
            </div>
          </div>

          <div v-else class="card-body">{{todayWeather.error}}</div>
        </div>
      </div>

      <!-- 未來一周天氣(氣溫/降雨機率 折線圖) -->
      <div class="col-12 col-md-6">
        <div class="card h-100 d-flex flex-column">
          <div v-if="!weekWeather.error" class="card-body">
            <p class="card-title h3">未來一周天氣</p>
            <div class="card-body px-3">

              <ul class="nav nav-tabs mb-2">
                <li class="nav-item">
                  <button class="nav-link" data-bs-toggle="tab" data-bs-target="#tempWeekChart">氣溫🌡️</button>
                </li>
                <li class="nav-item">
                  <button class="nav-link active" data-bs-toggle="tab" data-bs-target="#rainWeekChart">降雨機率🌧️</button>
                </li>
              </ul>

              <div class="tab-content p-3" style="min-height: 250px;">
                <div class="tab-pane fade" id="tempWeekChart">
                  <LineChart
                    v-if="weekWeather.dates"
                    :labels="weekWeather.dates"
                    :datasets="weektemperatureDatasets"
                  />
                </div>
                <div class="tab-pane fade show active" id="rainWeekChart">

                  <LineChart
                    v-if="weekWeather.dates"
                    :labels="weekWeather.dates"
                    :datasets="weekprecipitationDatasets"
                  />
                </div>
              </div>
            </div>
          </div>

          <div v-else class="card-body">{{weekWeather.error}}</div>
        </div>
      </div>
    </div>

    <!-- 未來一周天氣(列表) -->
    <DetailCard v-if="weekWeather.detail" title="未來一周天氣概覽" :data="weekWeather.detail" class="mt-3 mb-5">
      <template #extra="{ item }">
        <span class="h4 mt-1">{{ `${item.temp}°C` }}</span>
      </template>
    </DetailCard>
    <div v-else class="card-body">{{weekWeather.error}}</div>

    <!-- 選擇地區(modal) -->
    <Modal ref="mapModal" title="選擇地區">
      <template #body>
        <div class="input-group">
          <AutoComplete :data="cityList" v-model="area.query" plac="請輸入地區名稱（例: 臺北市 信義區）"/>
          <Button :isLoading="btnLoading" @click="search">
            <i class="fa-solid fa-magnifying-glass"/>
          </Button>
        </div>
        
        <div v-if="area.list.length" class="mt-sm-1 mb-sm-1">
          <span style="font-size: 18px">
            <i class="fa-solid fa-location-dot"></i>
            附近位置
          </span>
          <Tag :data="area.list" style="cursor: pointer;" @onClick="handleTag"/>
        </div>

        <div>
          <span style="font-size: 18px">
            <i class="fa-solid fa-house"></i>
            目前位置:
          </span>
          <p class="mb-sm-1">{{`${city}  ${allowLocal ? '(來源：OpenCage 自動定位)' : ''}`}}</p>
        </div>
      </template>
    </Modal>

    <Loading v-if="pageLoading" text="天氣資料載入中..."/>
  </div>
</template>

<script>
import * as _MAP from '@/api/map.js';
import { useWeatherStore } from '@/stores/weather';
import taiwanDistricts from '@/assets/data/taiwan-districts.json';

import LineChart from '@/components/lineChart.vue';
import DetailCard from '@/modularity/weather/detailCard.vue';

export default {
  name: 'weather',
  data() {
    return {
      weatherStore: useWeatherStore(),

      allowLocal: true,
      city: '臺北市 信義區',
      cityList: [],
      
      // modal
      area: {
        query: '',
        list: [],
      },

      // button
      btnLoading: false,
    };
  },
  computed: {
    todayWeather() {
      return this.weatherStore.currentWeather ?? {};
    },
    weekWeather() {
      return this.weatherStore.weekWeather ?? {};
    },
    currentHour() {
      const now = new Date();
      const hour = now.getHours().toString().padStart(2, '0');
      return `${hour}:00`;
    },
    currentWeekday() {
      const days = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
      return days[new Date().getDay()]
    },
    weatherReady() {
      return (
        this.todayWeather && Object.keys(this.todayWeather).length > 0 &&
        this.weekWeather && Object.keys(this.weekWeather).length > 0 &&
        this.temperatureDatasets && Array.isArray(this.temperatureDatasets) && this.temperatureDatasets.length > 0 &&
        this.precipitationDatasets && Array.isArray(this.precipitationDatasets) && this.precipitationDatasets.length > 0 &&
        this.weektemperatureDatasets && Array.isArray(this.weektemperatureDatasets) && this.weektemperatureDatasets.length > 0 &&
        this.weekprecipitationDatasets && Array.isArray(this.weekprecipitationDatasets) && this.weekprecipitationDatasets.length > 0
      );
    },
      pageLoading() {
        return !this.weatherReady
      },

    /** LineChart */
    temperatureDatasets() {
      const temp = this.todayWeather?.hourly?.temperature;
      return temp && Array.isArray(temp)
        ? [
            {
              label: '氣溫 (°C)',
              data: temp,
              borderColor: '#f57c00',
              backgroundColor: 'rgba(245, 124, 0, 0.2)',
            },
          ]
        : [];
    },
    precipitationDatasets() {
      const precipitation = this.todayWeather?.hourly?.precipitation;
      return precipitation && Array.isArray(precipitation)
        ? [
          {
            label: "降雨機率 (%)",
            data: precipitation,
            borderColor: "#2196f3",
            backgroundColor: "rgba(33, 150, 243, 0.2)",
          }
        ]
        : [];
    },
    weektemperatureDatasets() {
      const maxTemp = this.weekWeather?.maxTemp;
      const minTemp = this.weekWeather?.minTemp;

      return maxTemp && Array.isArray(maxTemp) && minTemp && Array.isArray(minTemp)
        ? [
          {
            label: "最高溫 (°C)",
            data: maxTemp,
            borderColor: "#d32f2f",
            backgroundColor: "rgba(211, 47, 47, 0.3)",
          },
          {
            label: "最低溫 (°C)",
            data: minTemp,
            borderColor: "#f57c01",
            backgroundColor: "rgba(245, 124, 0, 0.3)",
          }
        ]
        : [];    
    },
    weekprecipitationDatasets() {
      const maxPrec = this.weekWeather?.maxPrecipitation;
      const minPrec = this.weekWeather?.minPrecipitation;

      return maxPrec && Array.isArray(maxPrec) && minPrec && Array.isArray(minPrec)
        ? [
          {
            label: "最高降雨率(%)",
            data: maxPrec,
            borderColor: "#1565c0",
            backgroundColor: "rgba(21, 101, 192, 0.3)",
          },
          {
            label: "最低降雨率(%)",
            data: minPrec,
            borderColor: "#64b5f6",
            backgroundColor: "rgba(100, 181, 246, 0.15)",
          }
        ]
        : []; 
    }
  },
  components: {
    LineChart,
    DetailCard,
  },
  methods: {
    async init() {
      await this.getLocation(); // 取得位置

      this.getCityList();
      this.getAreaList();
    },
    async getLocation() {
      if (!navigator.geolocation) {
        alert('瀏覽器不支援地理定位');
        await this.fallbackGeocode();

        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (success) => {
          const { latitude, longitude } = success.coords;
          await _MAP.reverseGeocode(latitude, longitude)
            .then(async(name) => {
              this.city = name;
              this.setLocation(name, latitude, longitude);
            })
            .catch((err) => {
              alert(`位置取得失敗，原因: ${err}`);
            })
            .finally(() => {
            });
        },
        async (err) => {
          alert(`取得位置失敗，原因: ${err.message}`);
          await this.fallbackGeocode();

          this.allowLocal = false;
        }
      );
    },
    async fallbackGeocode() {
      await _MAP.geocode(this.city)
        .then(async (res) => {
          this.setLocation(this.area.query, res.lat, res.lon);
        })
        .catch((err) => {
          alert(`OpenCange 定位 ${this.city} 失敗，原因: ${err}`);
        })
        .finally(() => {
        })
    },
    setLocation(city, lat, lon) {
      this.weatherStore.setLocation(city, lat, lon)
    },
    getCityList() {
      for (const city in taiwanDistricts) {
        taiwanDistricts[city].forEach(district => {
          this.cityList.push(`${city} ${district}`);
        });
      }
    },
    // 區域清單
    async getCurrentWatcher(lat, lon) {
      await _WEATHER.getWeather(lat, lon)
        .then((data) => {
          this.currWeather = data;
        })
        .catch((err) => {
          alert(`天氣查詢失敗，原因: ${err}`)
        });
    },

    /**
     * Modal 相關
    */
    async search () {
      if (!this.area.query) return;

      this.btnLoading = true;
      await _MAP.geocode(this.area.query)
        .then(async (res) => {
          this.setLocation(this.area.query, res.lat, res.lon);
          this.city = this.area.query;
          this.closeModal();
        })
        .catch((err) => {
          alert(`OpenCange 定位 ${this.city} 失敗，原因: ${err}`);
        })
        .finally(() => {
          this.btnLoading = false;
        })
    },
    handleTag(item) {
      const city = this.city.split(' ')[0];
      this.area.query = `${city} ${item}`;
    },
    getAreaList() {
      const city = this.city.split(' ')[0];
      if (!city) return [];

      this.area.list = taiwanDistricts[city];
    },
    async openModal() {
      this.getAreaList();
      this.$refs.mapModal.show();
    },
    closeModal() {
      this.$refs.mapModal.hide();
    },
  },
  async mounted() {
    await this.init();
  }
};
</script>

<style scoped>
  .title {
    font-size: 20px;
    line-height: 1em;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .title .btn-link {
    font-size: 20px;
    vertical-align: middle;
  }

  .weather-icon {
    font-size: 5em;
  }
</style>
