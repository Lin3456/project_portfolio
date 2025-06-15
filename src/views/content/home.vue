<template>
  <div>
    <!-- 背景 -->
    <section
      class="text-black text-center position-relative"
      :style="{
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '70vh'
      }"
    >
      <div
        class="text-start position-absolute start-0 bottom-0 p-4"
      >
        <h1 class="display-4 Edu">林柔妤</h1>
        <h2 class="h5 self-intro">前端工程師 | 以業務邏輯為核心的前端開發者</h2>
        <div class="d-flex justify-content-between align-items-center" style="max-width: 4em">
          <a>
            <i class="fa-brands fa-github fa-2x"></i>
          </a>
          <a
            href="/files/resume.pdf"
            download="林柔妤_履歷表.pdf"
            class="text-black"
          >
            <i class="fa-solid fa-file-arrow-down fa-2x"></i>
          </a>
        </div>
      </div>
    </section>

    <!-- 個介 -->
    <section class="container py-5">
      <h3 class="fw-bold mb-4 title">個人簡介</h3>
      <div class="row align-items-start">
        <div class="col-12 col-md-3 d-flex justify-content-center mb-4 mb-md-0">
          <img
            src="@/assets/大頭照.jpg"
            alt="個人照片"
            class="img-fluid rounded-circle"
            style="max-width: 200px;"
          />
        </div>

        <!-- 右側文字 -->
        <div class="col-12 col-md-9">
          <p>
            具備 3 ~ 4 年前端開發經驗，熟悉 JavaScript 與 Vue 框架，曾參與企業內部系統的規劃與建置，
            後期於主管要求下接觸後端，逐步獨立完成中小型系統的全端功能。
          </p>
          <p>
            開發風格著重功能正確與實用性，能快速理解業務需求並落實成系統邏輯，
            適應力強、願意持續補強 UI/UX 與團隊協作的能力。
          </p>
          <p><strong>專長：</strong>Vue.js / Bootstrap / REST API 整合 / JavaScript</p>
          <p>
            <strong>職涯目標：</strong><br>
            期望持續深化前端技術，補強畫面細節與互動體驗設計能力，並在有需要時支援後端邏輯開發。
            希望成為能理解業務、掌握技術、解決問題的實用型前端工程師。
          </p>
        </div>
      </div>
    </section>

    <!-- 專案 -->
    <section class="bg-light py-5">
      <div class="container">
        <h3 class="fw-bold mb-4 title">專案經驗</h3>

        <div class="mb-4">
          <h5 class="fw-bold">資安管理系統</h5>
          <p><strong>任職角色：</strong>前端開發</p>
          <p><strong>技術：</strong>Vue 2、JavaScript</p>
          <p>用途：供內部處理 資安管理系統。</p>
          <p>職責：負責實作前端介面功能、維護使用流程的穩定性。</p>
        </div>

        <div class="mb-4">
          <h5 class="fw-bold">帳務系統</h5>
          <p><strong>任職角色：</strong>前後端開發（全端實作）</p>
          <p><strong>技術：</strong>Vue 3、Bootstrap、JavaScript、Node.js、MariaDB</p>
          <p>用途: 內部專用的 國內、外結帳系統</p>
          <p>
            職責：獨立建置前後端資料流，設計使用者列表與查詢介面，撰寫後端 API 與基本權限控管邏輯。
          </p>
        </div>
      </div>
    </section>

    <!-- 作品 -->
    <section class="container py-5">
      <h3 class="fw-bold mb-4">作品展示</h3>
      <div class="row row-cols-1 row-cols-md-2 g-4">
        <div class="col" v-for="(work, index) in works" :key="index">
          <div class="card h-100">
            <div :href="work.link" class="card-body" target="_blank">
              <h5 class="card-title">{{ work.title }}</h5>
              <p class="card-text">{{ work.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <button
      v-show="showTop"
      @click="scrollToTop"
      :class="['btn btn-outline-success back-to-top', { show: showTop }]"
    >
      <i class="fas fa-arrow-up"></i>
    </button>
  </div>
</template>

<script>
import bg from '@/assets/image.jpg';

export default {
  name: 'home',
  data() {
    return {
      works: [
        {
          title: 'ToDoList',
          description: '待辦事項清單'
        }
      ],
      bg,
      showTop: false,
    };
  },
  methods: {
    handleScroll() {
      this.showTop = window.scrollY > 300;
    },
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
};
</script>

<style scoped>
  .title {
    font-size: 1.7em;
    color: #19488f;
    font-family: 'DFKai-SB', '標楷體', serif;
    border-bottom: 1.7px solid #2471e5;
  }

  .back-to-top {
    position: fixed;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 999;
    border-radius: 50%;
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    opacity: 0.8;
    transition: opacity 0.3s ease;
  }
  .back-to-top:hover {
    opacity: 1;
  }

  @media (max-width: 576px) {
    .back-to-top {
      width: 36px;
      height: 36px;
      font-size: 16px;
    }
  }
</style>