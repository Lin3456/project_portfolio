<template>
  <div class="bg-dark text-white py-3 self-times mt-5">
    <div class="mx-5">
      <ul class="list-unstyled">
      <li>
        天氣圖示來自 <a href="https://github.com/erikflowers/weather-icons" target="_blank">Weather Icons</a>，感謝 Erik Flowers 和 Lukas Bischoff 提供。依 SIL OFL、MIT 與 CC BY 授權條款使用。
      </li>
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
  </div>
</template>

<script>
import profile from '@/assets/data/profile.js';

export default {
  name: 'Footer',
  data() {
    return {
      profile,
    };
  }
}
</script>