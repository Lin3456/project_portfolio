<template>
  <div class="position-relative flex-grow-1">
    <input
      type="text"
      class="form-control rounded-end-0"
      :value="input"
      @input="onInput"
      @keydown.enter.prevent="selectHighlighted"
      @blur="onBlur"
      @focus="onFocus"
      :placeholder="plac"
    />

    <button
      v-if="input && isFocused"
      type="button"
      class="btn btn-sm btn-secondary rounded-circle position-absolute top-50 end-0 translate-middle-y me-2"
      style="width: 24px; height: 24px; line-height: 12px; padding: 0;"
      @mousedown.prevent="clearInput"
    >
      &times;
    </button>

    <ul
      v-if="showOptions && filterOptions.length"
      class="list-group position-absolute w-100 mt-1 z-3"
      style="max-height: 200px; overflow-y: auto;"
    >
      <li
        v-for="(suggestion, index) in filterOptions"
        :key="index"
        class="list-group-item list-group-item-action"
        :class="{ active: index === highlightedIndex }"
        @mousedown.prevent="selectSuggestion(suggestion)"
        @mouseover="highlightedIndex = index"
      >
        {{ suggestion }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'AutoComplete',
  props: {
    modelValue: {
      type: String,
      default: ''
    },
    data: {
      type: Array,
      required: true,
    },
    plac: {
      type: String,
      default: '請輸入...'
    }
  },
  data() {
    return {
      isFocused: false,
      showOptions: false,
      highlightedIndex: -1,
    };
  },
  computed: {
    input: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit('update:modelValue', value);
      }
    },
    filterOptions() {
      if (!this.modelValue) return [];
      return this.data.filter((item) =>
        item.toLowerCase().includes(this.modelValue.toLowerCase())
      );
    },
  },
  methods: {
    onInput() {
      this.input = event.target.value;
      this.isFocused = true;
      this.highlightedIndex = -1;
      this.showOptions = true;
    },
    onFocus() {
      this.isFocused = true;
      this.showOptions = true;
    },
    selectHighlighted() {
      if (this.highlightedIndex >= 0) {
        this.selectSuggestion(this.filterOptions[this.highlightedIndex]);
        this.isFocused = false;
      }
    },
    selectSuggestion(suggestion) {
      this.input = suggestion;
      this.showOptions = false;
    },
    onBlur() {
      this.showOptions = false;
      this.isFocused = false;
    },
    clearInput() {
      this.input = '';
    }
  },
};
</script>
