<template>
	<div>
		<nav class="navbar navbar-expand-lg shadow bg-white fixed-top">
			<div class="d-flex align-items-center">
				<div>
					<button class="icon-button text-primary" @click="handleMenu">
						<i class="bar line1"></i>
						<i class="bar line2"></i>
						<i class="bar line3"></i>
						<span class="edu-font">MENU</span>
					</button>
				</div>
				<span class="text-primary left-span">作品集</span>
			</div>
		</nav>

		<transition name="slide">
			<MenuItem
			  class="sidebar"
			  v-if="showMenu"
				:data="routers"
				:isRoot="true"
				@close="showMenu = false"
			/>
		</transition>
	</div>
</template>

<script>
import MenuItem from './menu-item.vue';
import routes from '@/router/routers.js';

const SKIP_MENU = ['404'];

export default {
	name: 'NavBar',
	data() {
		return {
			showMenu: false,
		};
	},
	computed: {
		routers() {
			return routes.filter((route) => route.name && !SKIP_MENU.includes(route.name));
		}
	},
	components: {
		MenuItem,
	},
	methods: {
		handleMenu() {
			this.showMenu = !this.showMenu;
		},
	},
}
</script>

<style scoped>
/** menu botton */
.icon-button {
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.bar {
  display: block;
  height: 3px;
  background-color: rgb(27, 130, 186);
  border-radius: 2px;
}

/* 三條線長度不同 */
.line1 {
  width: 40px;
}
.line2 {
  width: 32px;
}
.line3 {
  width: 24px;
}

/** 文字 */
.left-span {
  margin-left: 20px;
	font-family: 'Edu SA Beginner', cursive;
	font-size: 38px;
}

.edu-font {
  font-family: 'Edu SA Beginner', cursive;
}

/* 側邊欄樣式 */
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 33.3333vw;
	padding-top: 16px;
  background-color: #3b3b59;
	color: white;
  box-shadow: 2px 0 5px rgba(0,0,0,0.3);
  z-index: 2000;
	font-size: 20px;
	overflow-y: hidden;
}

/* 小螢幕隱藏 sidebar 預設 */
.sidebar-collapse {
	transform: translateX(-100%);
}

/* slide 進出動畫 */
/* 預設狀態（enter-from, leave-to）在左側外面 */
.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

/* 進入時最終狀態 */
.slide-enter-to,
.slide-leave-from {
  transform: translateX(0);
  opacity: 1;
}

/* 過渡動畫設定 */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.5s ease, opacity 0.5s ease;
}
</style>