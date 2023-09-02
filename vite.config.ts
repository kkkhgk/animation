/*
 * @Author: yu.wang 634562990@qq.com
 * @Date: 2023-07-21 04:58:18
 * @LastEditors: yu.wang 634562990@qq.com
 * @LastEditTime: 2023-09-02 00:39:14
 * @FilePath: \visualization-collection-vue-master\vite.config.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";
import fs from "fs";
import path from "path";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import legacy from '@vitejs/plugin-legacy';

/**
 * 获取 Node.js 进程的当前工作目录的绝对路径
 */
const appDirectory = fs.realpathSync(process.cwd());

/**
 * 返回相对于当前工作目录的绝对路径
 * @param {String} relativePath  需要返回的目录
 * @returns
 */
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

export default defineConfig({
  build: {
    outDir: "docs",
    sourcemap: false,
  },
  base: "./",
  publicDir: "public",
  resolve: {
    extensions: [".ts", ".js"],
    alias: {
      "@": resolveApp("src"),
      pages: resolveApp("src/pages"),
      components: resolveApp("src/components"),
      constants: resolveApp("src/constants"),
      images: resolveApp("src/images"),
      utils: resolveApp("src/utils"),
      router: resolveApp("src/router"),
      hooks: resolveApp("src/hooks"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "src/global.scss";`,
      },
    },
  },
  plugins: [
    vue(),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), "src/images/svg")],
      // 指定symbolId格式
      symbolId: "icon-[dir]-[name]",
    }),
    Components({
      resolvers: [AntDesignVueResolver({ importStyle: false })],
    }),
    legacy({
        targets: ['defaults', 'not IE 11']
      }),
  ],
  server: {
    port: 3002,
    open: true,
    // proxy: {
    //     //配置自定义代理规则
    //     // 字符串简写写法
    //     '/jpi': 'http://101.200.234.125:80',
    //     '/api': {
    //       target: 'http://101.200.234.125:80',
    //       changeOrigin: true, //是否跨域
    //       rewrite: path => path.replace(/^\/api/, '')
    //     }
    //   }
  },
});
