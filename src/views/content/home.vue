<template>
  <div>
    <!-- 背景 -->
    <section
      class="custom-section text-dark text-center position-relative"
      :style="{
        backgroundImage: `url(${bg}), linear-gradient(to right, rgb(213 255 159), rgb(202 255 114))`,
      }"
    >
      <div
        class="text-start position-absolute start-0 p-4"
        :style="{top: '60%', transform: 'translateY(-40%)'}"
      >
        <p class="text-dark h1 self-DFKai">{{ profile.info.name }}</p>
        <p class="h4 text-secondary introduction self-PMingLiU mt-2 mb-3">
          {{ `${profile.info.title} | ${profile.info.summary}` }}
        </p>
        <div
          class="d-flex justify-content-between align-items-center"
          style="max-width: 4em"
        >
          <a :href="profile.info.github" target="_blank" style="color: #6e40c9; font-size: 20px;">
            <i class="fa-brands fa-github fa-2x"></i>
          </a>
          <a :href="profile.info.resume" target="_blank" style="font-size: 20px;">
            <i class="fa-regular fa-file-pdf fa-2x text-dark ms-3"></i>
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
          <h5 style="font-size: 22px;">{{ `${item.company} (${item.time})` }}</h5>
          <p style="font-size: 17px;">{{ item.position }}</p>
          <p v-if="item.description" style="margin-left: 8px">{{ item.description }}</p>

          <div
            class="card mb-2"
            v-for="(project, pIndex) in item.project"
            :key="`childCard-${pIndex}`"
          >
            <div
              class="card-header d-flex justify-content-between align-items-center"
              style="font-size: 18px"
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
                <span class="secound-title">
                  <strong>專案簡介:</strong><br>
                  {{ project.introduction }}
                </span><br>
                <span v-if="project.curSituation" class="secound-title">
                  <strong>當前狀態:</strong><br>
                  {{ project.curSituation }}
                </span><br>
                <span class="secound-title">
                  <strong>工作內容:</strong><br>
                  {{ project.job }}
                </span>

                <div class="mt-2" v-if="project.skills.frontEnd">
                  <strong class="secound-title">前端技術:</strong>
                  <Tag :data="project.skills.frontEnd" />
                </div>

                <div class="mt-2" v-if="project.skills.backEnd">
                  <strong class="secound-title">後端技術:</strong>
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
    <section class="container-fluid px-4 py-2">
      <p class="fw-bold mb-4 title">作品展示</p>
      <div class="row row-cols-1 row-cols-md-2 g-4">
        <div class="col" v-for="(work, index) in profile.works" :key="index">
          <div class="card h-100">
            <div @click="openWork(work.href)" class="card-body d-flex" style="cursor: pointer;">
              <!-- 左邊 icon -->
              <div class="icon-container me-3" :style="`color: ${work.color}`">
                <i :class="`fa-solid ${work.icon} mt-2`" style="font-size: 80px;"></i>
              </div>
              <!-- 右邊內容 -->
              <div>
                <p class="card-title h3 mb-1">{{ work.title }}</p>
                <div style="white-space: pre-line; line-height: 2;">{{ work.description }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <button
      v-show="showTop"
      @click="scrollToTop"
      :class="['btn btn-outline-secondary back-to-top', { show: showTop }]"
    >
      <i class="fas fa-arrow-up"></i>
    </button>
  </div>
</template>

<script>
import bg from '@/assets/background.png';
import profile from '@/assets/data/profile.js';

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
      },
      openWork(href) {
        const url = this.$router.resolve(href).href
        window.open(url, '_blank')
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
  .introduction {
    font-size: 25px;
  }

  .title {
    font-size: 2em;
    color: #3496ce;
    font-family: 'DFKai-SB', '標楷體', serif;
    border-bottom: 1.7px solid #3496ce;
  }

  /** 返回頂端 */
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

  /** section */
  .custom-section {
    background-size: auto 100%;
    background-position: right bottom;
    background-repeat: no-repeat;
    height: 75vh;
  }

  @media (max-width: 768px) {
    .custom-section {
      background-size: contain;
      height: 40vh;
    }

    .introduction {
      font-size: 16px;
    }
  }

  /** collapse */
  .collapse-content {
    transition: max-height 0.3s ease;
    overflow: hidden;
  }

  .arrow {
    transition: transform 0.3s ease;
  }
  .rotated {
    transform: rotate(-180deg);
  }

  /** 插圖 */
  .bg-deco {
    bottom: 0;
    right: 0;
    width: 300px;
    z-index: 0;
    pointer-events: none;
  }

  @media (max-width: 768px) {
    .bg-deco {
      width: 150px;
      max-width: 30vw;
      max-height: 30vh;
    }
  }

  .secound-title {
    font-size: 17px;
  }
</style>
