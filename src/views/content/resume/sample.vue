<template>
  <div class="resume container py-5">
    <div class="row">
      <!-- 左欄 -->
      <div class="col-md-4">
        <!-- 個人照片 -->
        <div class="text-center mb-4">
          <img src="" alt="個人照片" class="img-fluid rounded-circle shadow" width="150" height="150" />
        </div>

        <!-- 姓名與職稱 -->
        <h3 class="text-center">王小明</h3>
        <p class="text-center text-muted">前端工程師</p>

        <!-- 合格證照 -->
        <h5 class="mt-4 border-bottom pb-1">合格證照</h5>
        <ul>
          <li>網頁設計丙級</li>
          <li>JavaScript 專業認證</li>
        </ul>

        <!-- 興趣 / 嗜好 -->
        <h5 class="mt-4 border-bottom pb-1">興趣 / 嗜好</h5>
        <ul>
          <li>攝影</li>
          <li>烘焙</li>
          <li>健身</li>
        </ul>

        <!-- 基本資料 -->
        <h5 class="mt-4 border-bottom pb-1">基本資料</h5>
        <ul>
          <li>出生：1990/01/01</li>
          <li>學歷：資訊工程學系</li>
        </ul>

        <!-- 聯絡方式 -->
        <h5 class="mt-4 border-bottom pb-1">聯絡方式</h5>
        <ul>
          <li>Email: example@mail.com</li>
          <li>電話: 0912-345-678</li>
        </ul>
      </div>

      <!-- 右欄 -->
      <div class="col-md-8">
        <!-- 工作經驗（時間軸） -->
        <h4 class="mb-3">工作經驗</h4>
        <div class="timeline position-relative ps-4 border-start">
          <div v-for="(job, index) in jobs" :key="index" class="mb-4 position-relative">
            <div class="dot bg-primary position-absolute top-0 start-0 translate-middle rounded-circle"></div>
            <h6 class="mb-1">{{ job.title }}</h6>
            <small class="text-muted">{{ job.period }}</small>
            <p class="mb-0">{{ job.description }}</p>
          </div>
        </div>

        <!-- 技術評比（圓點） -->
        <h4 class="mt-5 mb-3">技術評比</h4>
        <div class="mb-3" v-for="skill in skills" :key="skill.name">
          <label>{{ skill.name }}</label>
          <div class="d-flex gap-1">
            <span v-for="n in 5" :key="n" class="dot-rating" :class="{ filled: n <= skill.level }"></span>
          </div>
        </div>

        <!-- 語言能力 -->
        <h4 class="mt-5 mb-3">語言能力</h4>
        <div class="mb-3" v-for="lang in languages" :key="lang.name">
          <label>{{ lang.name }}</label>
          <div class="d-flex gap-1">
            <span v-for="n in 5" :key="n" class="dot-rating" :class="{ filled: n <= lang.level }"></span>
          </div>
        </div>

        <!-- 自傳 / 關於我 -->
        <h4 class="mt-5 mb-3">關於我</h4>
        <p>{{ about }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      jobs: [
        { title: 'ABC科技 前端工程師', period: '2022 - 現在', description: '負責 Vue 專案開發與維護' },
        { title: 'XYZ設計 UI實習生', period: '2020 - 2021', description: '網站設計與切版' }
      ],
      skills: [
        { name: 'HTML', level: 5 },
        { name: 'CSS', level: 4 },
        { name: 'JavaScript', level: 4 },
        { name: 'Vue', level: 4 }
      ],
      languages: [
        { name: '中文', level: 5 },
        { name: '英文', level: 3 }
      ],
      about: '熱愛前端開發，具備良好的美感與程式設計能力。追求簡潔有效率的 UI/UX 設計。'
    }
  }
}
</script>

<style scoped>
.dot {
  width: 10px;
  height: 10px;
  background-color: #0d6efd;
  border: 2px solid white;
  z-index: 1;
}
.timeline::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 2px;
  background: #0d6efd;
}
.dot-rating {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #e0e0e0;
  display: inline-block;
}
.dot-rating.filled {
  background: #0d6efd;
}
</style>
