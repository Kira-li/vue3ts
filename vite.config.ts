// vite.config.js
import { defineConfig, loadEnv } from 'vite'; // 使用 defineConfig 工具函数获取类型提示：
import vue from '@vitejs/plugin-vue';
import path from 'path';
// import { viteMockServe } from 'vite-plugin-mock';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    base: './', // 开发或生产环境服务的公共基础路径
    optimizeDeps: {
      force: true, // 强制进行依赖预构建
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import '/src/assets/styles/variables.scss';`, // 引入全局变量文件
        },
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'), // 路径别名
      },
      extensions: ['.js', '.ts', '.json'], // 导入时想要省略的扩展名列表
    },
    server: {
      host: true, // 监听所有地址
      port: 8000,
      open: true,
      proxy: {
        [env.VUE_APP_BASE_API]: {
          target: `http://localhost:8080`,
          // target: `http://10.0.55.93:8100/prod-api`,
          changeOrigin: true,
          pathRewrite: {
            ['^' + env.VUE_APP_BASE_API]: '',
          },
        },
      },
    },
    build: {
      assetsDir: 'static', // 静态资源的存放目录
      assetsInlineLimit: 4096, // 图片转 base64 编码的阈值
    },
    plugins: [vue()],
  };
});
