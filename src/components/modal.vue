<template>
  <div
    class="modal fade"
    tabindex="-1"
    role="dialog"
    aria-modal="true"
    aria-hidden="true"
    ref="modal"
  >
    <div class="modal-dialog" :class="modalDialogClass">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ title }}</h5>
          <button
            type="button"
            class="btn-close"
            @click="hide"
            aria-label="Close"
          />
        </div>
        <div class="modal-body">
          <slot name="body"/>
        </div>
        <div v-if="footer" class="modal-footer">
          <slot name="footer">
            <button
              type="button"
              class="btn btn-secondary"
              @click="hide"
            >
              關閉
            </button>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle';

export default {
  name: "Modal",
  props: {
    title: {
      type: String,
      default: '',
    },
    size: {
      type: String,
      default: '', // 可填 'modal-sm', 'modal-lg', 'modal-xl'
    },
    footer: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      modalInstance: null,
    };
  },
  computed: {
    modalDialogClass() {
      return this.size || '';
    },
  },
  mounted() {
    this.modalInstance = new bootstrap.Modal(this.$refs.modal);

    // note: 透過綁定bootstrap的modal事件，避免可能造成的錯誤影響
    const modalEl = this.$refs.modal;

    modalEl.addEventListener('shown.bs.modal', () => {
      modalEl.setAttribute('aria-hidden', 'false');
    });

    modalEl.addEventListener('hidden.bs.modal', () => {
      modalEl.setAttribute('aria-hidden', 'true');
    });
  },
  methods: {
    show() {
      this.modalInstance.show();
    },
    hide() {
      this.modalInstance.hide();
    },
  },
};
</script>

<style scoped>

</style>
