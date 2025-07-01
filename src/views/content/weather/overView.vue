<template>
  <div class="container-fluid p-4">
    <div class="title">
      搜尋區域: {{ city }}
      <button type="button" class="btn btn-link" @click="openModal">
        選擇地區
      </button>
    </div>

    <div class="row row-cols-1 row-cols-md-2 g-4">
      <div class="col">
        <!-- 當日天氣 -->
        <div class="card">
          <div v-if="!weather.error">
            <div class="card-body d-flex align-items-center gap-4">
              <img class="weather-icon" :src="weather.icon"/>

              <!-- 溫度相關資料 -->
              <div class="d-flex flex-column">
                <span class="h4">{{ `${weather.celsius}°C | ${weather.fahrenheit} °F` }}</span>
                <small class="text-secondary">{{ `(體感${weather.apparent_temperature}°C | ${weather.apparent_temperature} °F)` }}</small>
                <span style="font-size: 16px">降雨機率: {{ weather.precipitation_probability }}%</span>
                <span style="font-size: 16px">濕度: {{ weather.relative_humidity }}%</span>
                <span style="font-size: 16px">風速: {{ weather.wind_speed }} 公里/時</span>
              </div>

              <!-- 時間資訊 -->
              <div class="d-flex flex-column text-center ms-auto align-self-start pt-2">
                <span class="h1">{{ currentWeekday }}</span>
                <span>{{ currentHour }}</span>
                <span>{{ weather.text }}</span>
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
                    v-if="weather.hourly"
                    label="氣溫 (°C)"
                    :labels="weather.hourly.time"
                    :data="weather.hourly.temperature"
                    color="#f57c00"
                    bgColor="rgba(245, 124, 0, 0.2)"
                    :stepSize="2"
                  />
                </div>
                <div class="tab-pane fade" id="rainChart">
                  <!-- 降雨機率折線圖 -->
                  <LineChart
                    v-if="weather.hourly"
                    label="降雨機率 (%)"
                    :labels="weather.hourly.time"
                    :data="weather.hourly.precipitation"
                    color="#2196f3"
                    bgColor="rgba(33, 150, 243, 0.2)"
                    :stepSize="2"
                  />
                </div>
              </div>
            </div>
          </div>

          <div v-else class="card-body">{{weather.error}}</div>
        </div>
      </div>
    </div>

    <!-- 選擇地區 -->
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
  </div>
</template>

<script>
import * as _MAP from '@/api/map.js';
import { useWeatherStore } from '@/stores/weather';
import taiwanDistricts from '@/assets/data/taiwan-districts.json';

import LineChart from '@/components/lineChart.vue';

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
    weather() {
      return this.weatherStore.currentWeather ?? {};
    },
    currentHour() {
      const now = new Date();
      const hour = now.getHours().toString().padStart(2, '0');
      return `${hour}:00`;
    },
    currentWeekday() {
      const days = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
      return days[new Date().getDay()]
    }
  },
  components: {
    LineChart,
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
          this.allowLocal = false;
          alert(`取得位置失敗，原因: ${err.message}`);
          await this.fallbackGeocode();
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
          this.closeModal();
        })
        .catch((err) => {
          alert(`OpenCange 定位失敗，原因: ${err}`);
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
    width: 96px;
    height: 96px;
  }
</style>
