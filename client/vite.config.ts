import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(), //svg를 react component로 사용하기 위한 플러그인
  ],
  build: {
    // rollupOptions: {
    //     output:{
    //         manualChunks(id) {
    //             if (id.includes('node_modules')) {
    //                 return id.toString().split('node_modules/')[1].split('/')[0].toString();
    //             }
    //         }
    //     }
    // },
    chunkSizeWarningLimit: 1600,
    
  },
  optimizeDeps: {
    include: ['@emotion/react', '@emotion/styled','@mui/material/Unstable_Grid2']
  }
});
