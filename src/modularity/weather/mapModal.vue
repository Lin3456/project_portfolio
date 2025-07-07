<template>
  <div>
    <div class="title">
      搜尋區域: {{ city }}
      <button type="button" class="btn btn-link" @click="openModal">
        選擇地區
      </button>
    </div>

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
  </div>
</template>

<script>
import * as _MAP from '@/api/map.js';
import taiwanDistricts from '@/assets/data/taiwan-districts.json';

export default {
  name: 'MapModal',
  data () {
    return {
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
              this.$emit('locationEvent', name, latitude, longitude);
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
          this.$emit('locationEvent', this.area.query, res.lat, res.lon);
        })
        .catch((err) => {
          alert(`OpenCange 定位 ${this.city} 失敗，原因: ${err}`);
        })
        .finally(() => {
        })
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
          this.$emit('locationEvent', this.area.query, res.lat, res.lon);
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
}
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