import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
    esbuild: {
        target: 'esnext', // <--- permite top-level await
    },
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            refresh: true,
        }),
        react(),
        tailwindcss(),
    ],
    build: {
        chunkSizeWarningLimit: 1500, // Aumenta o limite para 1.5MB
    },
    server: {
        https:false,
    },
    base: '/build/',
});
