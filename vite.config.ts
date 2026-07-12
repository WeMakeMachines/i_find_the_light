import { readFileSync } from "fs";
import md from "unplugin-vue-markdown/vite";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import vike from "vike/plugin";
import tailwindcss from "@tailwindcss/vite";

const packageJson = JSON.parse(readFileSync("./package.json", "utf-8"));

export default defineConfig({
  define: {
    __APP_VERSION__: JSON.stringify(packageJson.version),
  },
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
