import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";


// https://vite.dev/config/
export default defineConfig({
  base: "Coderiver",
  resolve: {
    alias: {
      "@assets": "/src/assets",
      "@components": "/src/components",
      "@configs": "/src/configs",
      "@constants": "/src/constants",
      "@hooks": "/src/hooks",
      "@styles": "/src/styles",
      "@types": "/src/types",
    },
  },
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
    svgr(),
  ],
});
