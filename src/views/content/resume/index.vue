<template>
  <div class="container-fluid">
    <div class="row shadow-lg bg-white rounded overflow-hidden">
      <!-- Left Column -->
      <div class="col left-col text-white p-4"  style="flex-basis: 27%; max-width: 27%;">
        <div class="text-center">
          <img
            :src="myImage"
            alt="個人照片"
            class="img-fluid rounded-circle shadow mb-4"
            style="width: 150px; height: 150px; object-fit: cover;"
          />
          <h2 class="text-white Edu">{{ profile.name }}</h2>
          <p class="mb-1 text-light">{{ profile.title }}</p>
          <p class="small secondary">{{ profile.location }}</p>
        </div>

        <div class="mt-4">
          <h5 class="text-white border-bottom border-2 Poppins">聯絡方式</h5>
          <ul class="list-unstyled small">
            <li class="text-light d-flex">
              信 箱: {{ profile.email }}
            </li>
            <li class="text-light">電 話: {{ profile.phone }}</li>
          </ul>
        </div>

        <div class="mt-4">
          <h5 class="text-white border-bottom border-2 Poppins">技能</h5>
          <ul class="list-inline small">
            <li v-for="(skill, i) in profile.skills" :key="i" class="badge bg-info text-dark m-1">
              {{ skill }}
            </li>
          </ul>
        </div>
      </div>

      <!-- Right Column -->
      <div class="col-8 p-4">
        <section class="mt-4">
          <h4 class="right-title fw-bold border-bottom pb-2 mb-3">工作經歷</h4>
          <TimeLine
            :data="profile.experience"
          />
        </section>

        <section class="mt-4">
          <h4 class="right-title fw-bold border-bottom pb-2 mb-3">學歷</h4>
          <ul class="list-group list-group-flush">
            <li v-for="(edu, i) in profile.education" :key="i" class="list-group-item px-0">
              <strong>{{ edu.school }}</strong> - {{ edu.department }} ({{ edu.year }})
            </li>
          </ul>
        </section>

        <section class="mt-4">
          <h4 class="right-title fw-bold border-bottom pb-2 mb-3">關於我</h4>
          <p v-html="profile.summary"/>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import myImage from '@/assets/image.jpg'
import profile from './profile.js';

import TimeLine from '@/components/timeLine.vue'

export default {
  name: 'Resume',
  data() {
    return {
      myImage,
      profile,
    };
  },
  components: {
    TimeLine,
  }
};
</script>

<style scoped>
body {
  font-family: 'Poppins', 'Noto Sans TC', sans-serif;
}

.left-col {
  background-color:  #091944;
}

.secondary {
  color: #e2e4e5;
}

.right-title {
  color: #0a5cd7;
  font-family: 'Poppins', cursive;
  font-size: 1.7em;
}
</style>
