import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
  // base: '/project_portfolio/', github page 專用
  base: '/', // 開發用
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // 讓 @ 指向 src 資料夾
    },
  },
  server: {
    port: 8080,
    open: true, // 啟動時自動打開瀏覽器
  },
  plugins: [vue()],
});
