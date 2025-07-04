<template>
  <div class="card" style="margin: 0 auto;">
    <div class="card-body">
      <div v-if="title" class="card-title h3 mb-3">
        {{ title }}
      </div>
      
      <div class="d-flex flex-wrap justify-content-center gap-3">
        <div
          v-for="(item, index) in data"
          :key="`child-card-${index}`"
          class="card mx-1"
          style="min-width: 120px; width: calc(100/ 7);"
        >
          <div class="card-body d-flex flex-column align-items-center">
            <i :class="`weather-icon ${item.icon} mb-1`" :style="{ color: item.color }"></i>
            <span class="h3 mt-4">{{ getWeekDay(item.date) }}</span>
            <span class="h4 mt-2">{{ dayFormat(item.date) }}</span>
            <slot name="extra" :item="item" />
            <span class="h5">{{ item.text }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment/moment';

export default {
  name: 'DetailCard',
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    title: {
      type: String,
      default: '',
    }
  },
  data() {
    return {

    };
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
    }
  }
}
</script>
<style scoped>
.weather-icon {
  font-size: 6em;
}
</style>