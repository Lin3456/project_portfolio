<template>
  <div class="loading-overlay">
    <div class="loading-box d-flex flex-column align-items-center justify-content-center p-4 shadow rounded">
      <div class="spinner-border text-primary mb-3" role="status"></div>
      <div class="loading-text">{{ text }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Loading',
  props: {
    text: {
      type: String,
      default: '資料載入中，請稍候...',
    },
  },
}
</script>

<style scoped>
.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #f8f9fa;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.loading-box {
  min-width: 200px;
  min-height: 150px;
  background-color: #fff;
  border: 1px solid #dee2e6;
}

.loading-text {
  font-size: 16px;
  color: #333;
}
</style>
