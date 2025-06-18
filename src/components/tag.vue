<template>
  <div class="d-flex flex-wrap">
    <div v-for="(item, index) in data" :key="index">
      <span 
        ref="tags"
        class="tag me-2 mb-2" 
        :title="item.tooltip"
      >
        {{item.label}}
      </span>
    </div>
  </div>
</template>

<script>
import { Tooltip } from 'bootstrap';

export default {
  name: 'Tag',
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  mounted() {
  this.$nextTick(() => {
    const tags = this.$refs.tags;
      if (tags && Array.isArray(tags)) {
        tags.forEach(el => {
          new Tooltip(el);
        });
      }
  });
}

};
</script>
