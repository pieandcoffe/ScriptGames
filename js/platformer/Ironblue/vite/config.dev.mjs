import { defineConfig } from 'vite';
import { soundManifestPlugin } from './plugins/sound-manifest.js';
import { SOUNDS }              from '../src/game/assets.js';

export default defineConfig({
    base: './',
    plugins: [
        soundManifestPlugin(SOUNDS),
    ],
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    phaser: ['phaser']
                }
            }
        },
    },
    server: {
        port: 8080
    }
});
