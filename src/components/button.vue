<template>
  <button
    :class="buttonClass"
    :disabled="isLoading"
    @click="handleClick"
  >
    <span v-if="isLoading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
    <slot v-else></slot>
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    label: {
      type: String,
      default: 'Submit',
    },
    style: {
      type: String,
      default: 'primary',  // 可選：primary, secondary, success, danger 等
    },
    size: {
      type: String,
      default: 'md',  // 可選：sm, md, lg
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    // 動態的按鈕 class
    buttonClass() {
      return `btn btn-${this.style} btn-${this.size}`;
    },
  },
  methods: {
    handleClick(e) {
      if (this.loading) return;

      this.$emit('click', e);
    },
  },
};
</script>

<style scoped>
/* 這裡可以加入一些自定義樣式 */
</style>
