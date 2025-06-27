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
          <div class="card-body">

          </div>
        </div>
      </div>
    </div>

    <!-- 選擇地區 -->
    <Modal ref="mapModal" title="選擇地區">
      <template #body>
        <div class="input-group">
          <AutoComplete :data="cityList" v-model="area.query" plac="請輸入地區名稱（例: 臺北市 信義區）"/>
          <Button @click="search">
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
import * as _WEATHER from '@/api/weather.js';
import taiwanDistricts from '@/assets/data/taiwan-districts.json';

export default {
  name: 'weather',
  data() {
    return {
      allowLocal: true,
      city: '臺北市 信義區',
      currWeather: null,
      cityList: [],
      
      // modal
      area: {
        query: '',
        list: [],
      }
    };
  },
  methods: {
    async init() {
      await this.getLocation();
      this.getCityList();
      this.getAreaList();
    },
    async getLocation() {
      if (!navigator.geolocation) {
        this.allowLocal = false;
        alert('瀏覽器不支援地理定位');
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (success) => {
          const { latitude, longitude } = success.coords;
          await _MAP.reverseGeocode(latitude, longitude)
            .then(async(name) => {
              this.city = name;
            })
            .catch((err) => {
              alert(`位置取得失敗，原因: ${err}`);
            })
            .finally(() => {
            });
        },
        (err) => {
          this.allowLocal = false;
          window.alert(`取得位置失敗，原因: ${err.message}`);
        }
      );
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

      await _MAP.geocode(this.area.query)
        .then(async (res) => {
          await this.getCurrentWatcher(res.lat, res.lon);
          this.closeModal();
        })
        .catch((err) => {
          alert(`OpenCange 定位失敗，原因: ${err}`);
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
  mounted() {
    this.init();
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
</style>
