import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');

  return {
    base: '/',
    envPrefix: ['VITE_'],
    define: {
      'import.meta.env.VITE_MAIN_API_URL': JSON.stringify(env.VITE_MAIN_API_URL),
    },
    build: {
      chunkSizeWarningLimit: 3000,
    },
    optimizeDeps: {
      include: ['@emotion/react', '@emotion/styled', '@mui/material/Tooltip'],
    },
    plugins: [react()],
    server: {
      proxy: {
        '/api/': {
          target: env.VITE_MAIN_API_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/main/, ''),
        },
      },
    },
  };
});
