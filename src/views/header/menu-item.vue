<template>
  <div>
    <!-- 只有 root 頂層才顯示關閉按鈕 -->
    <button v-if="isRoot" class="close-btn" @click="$emit('close')">✕</button>

    <div :class="{ 'menu-list': isRoot }">
      <div v-for="route in data" :key="route.name">
        <div
					v-if="route.children"
					class="menu-item row"
					@click="toggleMenu(route.name)"
				>
          <span class="col-9">
            <i :class="`fa-solid ${route.meta.icon} me-1`"/>
            {{ route.meta.title || route.name }}
          </span>
					<span
						v-if="route.children && route.children.length"
						class="arrow col-2"
						
					>
					  <i class="fa-solid fa-chevron-right" :class="{ open: isOpen(route.name) }"></i>
					</span>

					<MenuItem
					  class="col"
						v-if="isOpen(route.name)"
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
            <i :class="`fa-solid ${route.meta.icon} me-1`"/>
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
      openMap: {},
		};
	},
  methods: {
    toggleMenu(routeName) {
      this.openMap[routeName] = !this.openMap[routeName];
    },
    isOpen(routeName) {
      return !!this.openMap[routeName];
    },
    navigateTo(route) {
      if (!route.component) return;
      this.$router.push({name: route.name}).catch(() => {});
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
  /* 預設是「>」的方向，旋轉 -90deg 變成「v」 */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  cursor: pointer;
  font-size: 18px;
  vertical-align: middle;
}

.arrow i {
  transition: transform 0.3s ease;
  transform-origin: center center;
}

.arrow i.open {
  /* 展開時轉回正常方向「v」 */
  transform: rotate(90deg);
}
</style>
