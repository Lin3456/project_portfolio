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
        <h1 class="display-4">{{profile.info.name}}</h1>
        <h2 class="h5">{{ `${profile.info.title} | ${profile.info.summary}` }}</h2>
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

    <!-- 技能 -->
    <section class="container py-5">
      <h3 class="fw-bold mb-4 title h4">技能摘要</h3>
      <div>
        <span>前端技術:</span>
        <Tag :data="profile.skills.frontEnd"/>
        <p></p>
        <span>後端技術(輔助能力):</span>
        <Tag :data="profile.skills.backEnd"/>
      </div>
    </section>

    <!-- 專案 -->
    <section class="bg-light py-5">
      <div class="container">
        <h3 class="fw-bold mb-4 title">專案經歷</h3>

        <div class="card mb-4" v-for="(item, index) in profile.experience" :key="`card-${index}`">
          <div class="card-body">
            <h5 class="card-title">{{ `${item.company} (${item.time})` }}</h5>
            <h5>{{item.position}}</h5>
            <p v-if="item.description">{{item.description}}</p>
            <div class="card" v-for="(porject, index) in item.porject" :key="`childCard-${index}`">
              <details>
                <summary>{{porject.name}}</summary>
              </details>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 作品 -->
    <!-- <section class="container py-5">
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
    </section> -->

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
import profile from './resume/profile.js';

export default {
  name: 'home',
  data() {
    return {
      bg,
      profile,
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
    font-size: 3em;
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