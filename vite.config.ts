import md from "unplugin-vue-markdown/vite";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import vike from "vike/plugin";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    vike({}),
    vue({
      include: [/\.vue$/, /\.md$/],
    }),
    md({}),
    tailwindcss(),
  ],
  build: {
    target: "es2022",
  },
});
