import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';

import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import rollupNodePolyFill from 'rollup-plugin-node-polyfills';
import { svgBuilder } from './src/assets/icons';
import { VitePWA } from 'vite-plugin-pwa';

const path = require('path');

const mode = process.env.VUE_APP_MODE || process.env.NODE_ENV;

// process.env.VUE_APP_VERSION = require('./package.json').version;
// process.env.VUE_APP_CONFIG = JSON.stringify(require(`./src/config/conf.d/config.${mode}.json`));

export default mode =>
  defineConfig({
    build: {
      rollupOptions: {
        plugins: [rollupNodePolyFill()],
      },
    },
    optimizeDeps: {
      esbuildOptions: {
        plugins: [
          NodeGlobalsPolyfillPlugin({
            process: true,
            buffer: true,
          }),
        ],
      },
    },
    define: {
      __INTLIFY_PROD_DEVTOOLS__: false,
      __VUE_I18N_FULL_INSTALL__: true,
      __VUE_I18N_LEGACY_API__: false,
      'process.env': loadEnv(mode, process.cwd(), ''),
    },
    resolve: {
      alias: {
        stream: 'rollup-plugin-node-polyfills/polyfills/stream',
        buffer: 'rollup-plugin-node-polyfills/polyfills/buffer-es6',
        '@': path.resolve(__dirname, './src'),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
          @import "@/assets/scss/_/_variables.scss";
          @import "@/assets/scss/_/_animations.scss";
          @import "@/assets/scss/_/_mixins.scss";
          @import "@/assets/scss/_/_typography.scss";
        `,
        },
      },
    },
    server: {
      port: 3000,
    },
    plugins: [
      VitePWA({ registerType: 'autoUpdate' }),
      vue(),
      svgBuilder('./src/assets/icons/svg/'),
    ],
  });
