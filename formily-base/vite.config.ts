import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      // react17以后jsx转换器经过的修改 createElement -> jsx()
      jsxRuntime: "classic",
    }),
  ],
  resolve: {
    alias: [
      {
        // 将less里面的 ~ 替换为 空
        find: /^~/,
        replacement: "",
      },
    ],
  },
  css: {
    preprocessorOptions: {
      less: {
        // less3.0以后 默认是false
        javascriptEnabled: true,
      },
    },
  },
});
