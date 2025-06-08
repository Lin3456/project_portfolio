<template>
  <div class="timeline-container">
    <div
      v-for="(item, index) in data"
      :key="index"
      class="timeline-item"
    >
      <!-- 圓點 -->
      <div class="timeline-icon"></div>

      <!-- 線段：不是最後一個才顯示 -->
      <div v-if="index < data.length - 1" class="timeline-line"></div>

      <!-- 右側內容 -->
      <div class="timeline-content">
        <p class="title">{{ item.title }} ({{ item.time }})</p>
        <p class="secound-title">{{ item.secoundTitle }}</p>
        <p class="content">{{ item.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TimeLine",
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.timeline-container {
  position: relative;
  padding-left: 40px;
}

.timeline-item {
  position: relative;
  padding-bottom: 0.5rem;
}

/* 圓點 */
.timeline-icon {
  position: absolute;
  top: 10px;
  width: 12px;
  height: 12px;
  background-color: #0d6efd;
  border-radius: 50%;
  z-index: 1;
}

/* 線：從當前圓點底部延伸 */
.timeline-line {
  position: absolute;
  left: 5px;
  top: 22px;
  width: 2px;
  height: calc(100% - 12px);
  background-color: #0d6efd;
  z-index: 0;
}

/* 右側內容 */
.timeline-content {
  margin-left: 30px;
}

.title {
  font-weight: 700;
  font-size: 22px;
  margin-bottom: 4px;
}
.secound-title {
  font-weight: 600;
  font-size: 20px;
  margin-bottom: 8px;
}
.content {
  font-size: 18px;
}
</style>
