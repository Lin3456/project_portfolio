<template>
  <div>
    <!-- 背景 -->
    <section
      class="text-dark text-center position-relative"
      :style="{
        backgroundImage: `url(/src/assets/background.png), linear-gradient(to right, rgb(223 255 238), rgb(145 241 170))`,
        backgroundSize: 'auto 100%',
        backgroundPosition: 'right bottom',
        backgroundRepeat: 'no-repeat',
        height: '70vh',
      }"
    >
      <div
        class="text-start position-absolute start-0 p-4"
        :style="{top: '60%', transform: 'translateY(-40%)'}"
      >
        <p class="h2 self-DFKai">{{ profile.info.name }}</p>
        <p class="self-PMingLiU" style="font-size:25px">
          {{ `${profile.info.title} | ${profile.info.summary}` }}
        </p>
        <div
          class="d-flex justify-content-between align-items-center"
          style="max-width: 4em"
        >
          <a :href="profile.info.github" target="_blank" style="color: #181717">
            <i class="fa-brands fa-github fa-2x"></i>
          </a>
          <a
            href="/files/resume.pdf"
            download="林柔妤_履歷表.pdf"
          >
            <i class="fas fa-file-pdf fa-2x text-dark ms-3"></i>
          </a>
        </div>
      </div>
    </section>

    <!-- 技能 -->
    <section class="container-fluid px-4 py-2">
      <p class="fw-bold mb-4 title">技能摘要</p>
      <div>
        <span>前端技術:</span>
        <Tag :data="profile.skills.frontEnd" />
        <p></p>
        <span>後端技術(輔助能力):</span>
        <Tag :data="profile.skills.backEnd" />
      </div>
    </section>

    <!-- 工作 -->
    <section class="bg-light container-fluid px-4 py-2 position-relative">
      <p class="fw-bold mb-4 title">工作經歷</p>
      <div
        class="card mb-4"
        v-for="(item, index) in profile.experience"
        :key="`card-${index}`"
      >
        <div class="card-body" style="white-space: pre-line;">
          <h5 class="card-title">{{ `${item.company} (${item.time})` }}</h5>
          <p style="font-size: 1rem;">{{ item.position }}</p>
          <p v-if="item.description" style="margin-left: 1rem">{{ item.description }}</p>

          <div
            class="card mb-2"
            v-for="(project, pIndex) in item.project"
            :key="`childCard-${pIndex}`"
          >
            <div
              class="card-header d-flex justify-content-between align-items-center"
              role="button"
              @click="toggleCollapse(index, pIndex)"
            >
              {{ project.name }}
              <i
                class="fa-solid fa-chevron-down arrow"
                :class="{ rotated: isExpanded(index, pIndex) }"
                aria-hidden="true"
              />
            </div>
            <div v-show="isExpanded(index, pIndex)" class="collapse-content">
              <div class="card-body" style="white-space: pre-line;">
                <span>
                  <strong>專案簡介:</strong><br>
                  {{ project.introduction }}
                </span><br>
                <span v-if="project.curSituation">
                  <strong>當前狀態:</strong><br>
                  {{ project.curSituation }}
                </span><br>
                <span>
                  <strong>工作內容:</strong><br>
                  {{ project.job }}
                </span>

                <div class="mt-2" v-if="project.skills.frontEnd">
                  <strong>前端技術:</strong>
                  <Tag :data="project.skills.frontEnd" />
                </div>

                <div class="mt-2" v-if="project.skills.backEnd">
                  <strong>後端技術:</strong>
                  <Tag :data="project.skills.backEnd" />
                </div>
              </div>
            </div>
            <img
              v-if="index === 0 && isExpanded(index, pIndex)"
              src="@/assets/cybersecurity.png"
              alt="report"
              class="bg-deco position-absolute"
            />
            <img
              v-if="index === 1 && pIndex === 0 && isExpanded(index, pIndex)"
              src="@/assets/report-analysis.png"
              alt="report"
              class="bg-deco position-absolute"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- 作品 -->
    <!-- <section class="container py-5">
      <p class="fw-bold mb-4">作品展示</p>
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

    <footer class="bg-dark text-white py-3 self-times">
      <div class="row container">
        <div class="col-3"></div>
        <div class="col-4 d-flex align-items-center">
          <ul class="list-unstyled">
            <li>
              <i class="fa-solid fa-phone me-2"></i>
              {{profile.info.contact.phone}}
            </li>
            <li>
              <i class="fa-solid fa-envelope me-2"></i>
              {{profile.info.contact.email}}
            </li>
          </ul>
        </div>
        <div class="col-4 d-flex align-items-center">
          <!-- <p class="mb-1">© 2025 林柔妤 All rights reserved.</p> -->
        </div>
      </div>
    </footer>

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
  import bg from '@/assets/background.png';
  import profile from './resume/profile.js';

  export default {
    name: 'home',
    data() {
      return {
        bg,
        profile,
        showTop: false,
        expandedItems: [],
      };
    },
    methods: {
      handleScroll() {
        this.showTop = window.scrollY > 300;
      },
      scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      toggleCollapse(index, pIndex) {
        const key = `${index}-${pIndex}`;
        if (this.expandedItems.includes(key)) {
          this.expandedItems = this.expandedItems.filter(k => k !== key);
        } else {
          this.expandedItems.push(key);
        }
      },
      isExpanded(index, pIndex) {
        const key = `${index}-${pIndex}`;
        return this.expandedItems.includes(key);
      }
    },
    mounted() {
      window.addEventListener('scroll', this.handleScroll);
    },
    beforeUnmount() {
      window.removeEventListener('scroll', this.handleScroll);
    }
  };
</script>

<style scoped>
  .title {
    font-size: 2em;
    color: #3496ce;
    font-family: 'DFKai-SB', '標楷體', serif;
    border-bottom: 1.7px solid #3496ce;
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

  .arrow {
    transition: transform 0.3s ease;
  }
  .rotated {
    transform: rotate(-180deg);
  }
  .collapse-content {
    transition: max-height 0.3s ease;
    overflow: hidden;
  }

  .bg-deco {
  bottom: 0;
  right: 0;
  width: 300px;
  z-index: 0;
  pointer-events: none;
}
</style>
