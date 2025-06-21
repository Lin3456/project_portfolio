<template>
  <div>
    <!-- 只有 root 頂層才顯示關閉按鈕 -->
    <button v-if="isRoot" class="close-btn" @click="$emit('close')">✕</button>

    <div :class="{ 'menu-list': isRoot }">
      <div v-for="route in data" :key="route.name">
        <div
					v-if="route.children"
					class="menu-item row"
					@click="route.meta.hidden = !route.meta.hidden"
				>
          <span class="col-10">{{ route.meta.title || route.name }}</span>
					<span
						v-if="route.children && route.children.length"
						class="arrow col-2"
						:class="{ open: route.meta.hidden }"
					>
					˃
					</span>

					<MenuItem
					  class="col"
						v-if="route.meta.hidden"
						:data="route.children"
						@close="$emit('close')"
					/>
        </div>
				<!-- 沒有子節點 -->
				<template v-else>
					<div
						class="menu-item"
						@click="navigateTo(route)"
					>
						{{ route.meta.title || route.name }}
					</div>
				</template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MenuItem',
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    isRoot: {
      type: Boolean,
      default: false,
    }
  },
	data() {
		return {
			showChild: false,
		};
	},
  methods: {
    navigateTo(route) {
      if (!route.component) return;
      this.$router.push(route.path).catch(() => {});
      this.$emit('close');
    }
  }
};
</script>


<style scoped>
.close-btn {
  position: absolute;
  top: 10px;
  left: 10px;
  background: transparent;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: white;
}

.menu-list {
  margin-top: 40px; /* 確保不被按鈕蓋住 */
}

.menu-item {
  cursor: pointer;
  padding: 5px 15px;
  color: white;
	justify-content: space-between;
	align-items: center;
}

.menu-item:hover {
	background-color: #1e1e2f;
}


/** 箭頭 */
.arrow {
  display: inline-block;
  transition: transform 0.3s ease;
  /* 預設是「>」的方向，旋轉 -90deg 變成「v」 */
  transform: rotate(0deg);
  user-select: none;
  cursor: pointer;
	margin: auto auto auto 0px;
	align-items: center;
	font-size: 18px;
}

.arrow.open {
  /* 展開時轉回正常方向「v」 */
  transform: rotate(90deg);
	font-size: 18px;
  margin-top: 10px;
}

</style>
