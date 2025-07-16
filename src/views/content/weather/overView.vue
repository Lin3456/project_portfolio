<template>
  <div class="container-fluid p-4 position-relative">
    <MapModal @locationEvent="setLocation"/>

    <div>
      <p class="h5 mb-3">📌 今日小提醒: {{ todayWeather.tip }}</p>
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
                <span class="h4 mb-1">{{ `${todayWeather.celsius}°C | ${todayWeather.fahrenheit} °F` }}</span>
                <small class="text-secondary mb-1">{{ `(體感${todayWeather.apparent_temperature}°C | ${todayWeather.apparent_fahrenheit} °F)` }}</small>
                <span class="text">{{ `降雨機率: ${todayWeather.precipitation_probability}%` }}</span>
                <span class="text">{{ `濕度: ${todayWeather.relative_humidity}%` }}</span>
                <span class="text">{{ `風速: ${todayWeather.wind_speed} 公里/時` }}</span>
              </div>

              <!-- 時間資訊 -->
              <div class="d-flex flex-column text-center ms-auto align-self-start">
                <span class="h1">{{ currentWeekday }}</span>
                <span class="h3 mb-1">{{ currentHour }}</span>
                <span class="h4">{{ todayWeather.text }}</span>
              </div>
            </div>

            <div class="px-3 mt-0">
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

      <div class="col-12 col-md-6">
        <!-- 未來一周天氣(天氣摘要 表格 + 氣溫/降雨機率 折線圖) -->
        <div class="card h-100 d-flex flex-column">
          <div v-if="!weekWeather.error" class="card-body">
            <p class="card-title h3">未來一周天氣</p>
            <div class="card-body px-3">

              <ul class="nav nav-tabs mb-2">
                <li class="nav-item">
                  <button class="nav-link active" data-bs-toggle="tab" data-bs-target="#tempWeekTable">天氣摘要</button>
                </li>
                <li class="nav-item">
                  <button class="nav-link" data-bs-toggle="tab" data-bs-target="#tempWeekChart">氣溫🌡️</button>
                </li>
                <li class="nav-item">
                  <button class="nav-link" data-bs-toggle="tab" data-bs-target="#rainWeekChart">降雨機率🌧️</button>
                </li>
              </ul>

              <div class="tab-content pt-3" style="min-height: 250px;">
                <!-- 未來一週天氣摘要表 -->
                <div class="tab-pane fade  show active" id="tempWeekTable">
                  <table class="table table-bordered table-hover text-center align-middle">
                    <thead class="table-light">
                      <tr>
                        <th>日期</th>
                        <th>溫度 🌡️</th>
                        <th>體感溫度 🤒</th>
                        <th>降雨率 🌧️</th>
                        <th>紫外線(max)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(day, index) in weekWeather.detail" :key="index">
                        <td>{{ `${dayFormat(day.date)}(${getWeekDay(day.date)})` }}</td>
                        <td>{{ `${day.temp} ~ ${day.min_temp}°C` }}</td>
                        <td>{{ `${day.apparent} ~ ${day.min_apparent}°C` }}</td>
                        <td>{{ `${day.precipitation} ~ ${day.minPrecipitation}%` }}</td>
                        <td>{{ day.uv_index }}</td>
                      </tr>
                    </tbody>
                  </table>

                </div>
                <div class="tab-pane fade" id="tempWeekChart">
                  <LineChart
                    v-if="weekWeather.dates"
                    :labels="weekWeather.dates"
                    :datasets="weektemperatureDatasets"
                  />
                </div>
                <div class="tab-pane fade" id="rainWeekChart">

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
    <DetailCard
      title="未來一周天氣概覽"
      class="mt-3 mb-2"
      v-if="weekWeather.detail"
      :data="weekWeather.detail"
      @onClick="openDetail"
    >
      <template #extra="{ item }">
        <div class="d-flex align-items-center">
          <span>{{ `${item.temp}°C` }}</span>
          <span class="text-secondary px-1">{{ `(${item.apparent}°C)` }}</span>
        </div>
      </template>
    </DetailCard>
    <div v-else class="card-body">{{weekWeather.error}}</div>

    <!-- 未來一周天氣(單天 天氣) -->
    <Modal ref="dayModal" :title="detailData.title">
      <template #body>
        <p class="h5">📌 天氣小提醒: {{ detailData.tip }}</p>

        <div class="tab-content pt-3" style="min-height:250px;">
          <!-- 未來一週天氣摘要表 -->
          <div class="tab-pane fade show active" id="overView">
            <table id="dayTable" class="table table-bordered table-hover text-center align-middle">
              <tbody>
                <tr>
                  <th>天氣狀況</th>
                  <td>
                    <i :class="detailData.icon" :style="{ color: detailData.color, fontSize: '18px'}"/>
                    {{`${detailData.text}`}}
                  </td>
                </tr>
                <tr>
                  <th>氣溫</th>
                  <td>{{`🌡️ 最高 ${detailData.temp}°C / 最低 ${detailData.min_temp}°C`}}</td>
                </tr>
                <tr>
                  <th>降雨機率</th>
                  <td>{{`☔ 最高 ${detailData.precipitation}% / 最低 ${detailData.minPrecipitation}%`}}</td>
                </tr>
                <tr>
                  <th>降雨量</th>
                  <td>{{`💧 ${detailData.precipitationSum} mm`}}</td>
                </tr>
                <tr>
                  <th>紫外線指數</th>
                  <td>{{`🌞 UV Max ${detailData.uv_index}`}}</td>
                </tr>
                <tr>
                  <th>最高風速</th>
                  <td>{{`🌬️ ${detailData.max_windspeed} km/h`}}</td>
                </tr>
                <tr>
                  <th>日出/日落</th>
                  <td>{{`🌄 ${detailData.sunrise} / 🌇 ${detailData.sunset}`}}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </template>
    </Modal>

    <Loading v-if="pageLoading" text="天氣資料載入中..."/>
  </div>
</template>

<script>
import moment from 'moment';
import { useWeatherStore } from '@/stores/weather';

import LineChart from '@/components/lineChart.vue';
import MapModal from '@/modularity/weather/mapModal.vue';
import DetailCard from '@/modularity/weather/detailCard.vue';

export default {
  name: 'weather',
  data() {
    return {
      weatherStore: useWeatherStore(),
      weekDetail: {},
      detailData: {},
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
    MapModal,
    LineChart,
    DetailCard,
  },
  methods: {
    getWeekDay(date) {
      const weekdays = ['日', '一', '二', '三', '四', '五', '六'];
      const index = moment(date).day();
      
      const dayText = '星期' + weekdays[index];

      return dayText;
    },
    dayFormat(date) {
      return moment(date).format('MM/DD');
    },
    async setLocation(city, lat, lon) {
      this.weatherStore.setLocation(city, lat, lon);
      
    },

    openDetail(data) {
      this.detailData = this.weekWeather.detail.filter((item) => item.date === data.date)[0];
      if (!this.detailData) return alert(`出現意外狀況，無${data.date}的資料`);

      this.detailData.title = `${moment(this.detailData.date).format('MM/DD')} 天氣預報`;
      this.$refs.dayModal.show();
    }
  },
};
</script>

<style scoped>
  .weather-icon {
    font-size: 5em;
  }

  .text {
    line-height: 1.5;
  }

  #dayTable th {
    background-color: #f8f9fa;
  }

</style>
