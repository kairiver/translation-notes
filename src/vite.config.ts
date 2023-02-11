import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react'

export default defineConfig({
    server: {
        host: true,
        hmr: {
            host: 'localhost',
        },
    },
    plugins: [
        react(),
        laravel({
            input: [
                'resources/react/src/main.tsx',
            ],
            refresh: true,
        }),
    ],
});
