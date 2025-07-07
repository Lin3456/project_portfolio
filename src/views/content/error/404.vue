<template>
  <div class="container-fluid bg-container">
    <div class="content-wrapper">
      <img src="@/assets/404-page.png" alt="404" class="bg-error"/>

      <div class="text-group">
        <h3 @click="goBack" style="cursor: pointer;">返回上一頁</h3>
        <h3 @click="goHome" style="cursor: pointer;">返回首頁({{`${countdown} s`}})</h3>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '404',
  data () {
    return {
      countdown: 5,
      timer: null,
    };
  },
  methods: {
    goHome() {
      this.$router.push('/')
    },
    goBack() {
      this.$router.back()
    },
    startCountdown() {
      this.timer = setInterval(() => {
        this.countdown--
        if (this.countdown <= 0) {
          clearInterval(this.timer)
          this.goHome()
        }
      }, 1000)
    },
  },
  mounted() {
    this.startCountdown()
  },
  beforeUnmount() {
    if (this.timer) {
      clearInterval(this.timer)
    }
  }
}
</script>

<style scoped>
  .bg-container {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding-top: 60px;
    text-align: center;
  }

  .content-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50%;
  }

  .bg-error {
    width: 100%;
  }

  .button-group {
    margin-top: 16px;
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  
  .text-group {
    margin-top: 16px;
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
</style>