import react from '@vitejs/plugin-react'
import { fileURLToPath } from "url";
import { defineConfig } from "vite"
import wasm from "vite-plugin-wasm";
import path, { dirname } from "path";
import { createRequire } from 'module'
import inject from '@rollup/plugin-inject'
import stdLibBrowser from 'node-stdlib-browser'


const require = createRequire(import.meta.url)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const symbolCryptoWasmPath = path.resolve(
  __dirname,
  "./node_modules/symbol-crypto-wasm-web/symbol_crypto_wasm"
);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    wasm(),
    {
      ...inject({
        global: [
          require.resolve(
            './node_modules/node-stdlib-browser/helpers/esbuild/shim'
          ),
          'global'
        ],
        process: [
          require.resolve(
            './node_modules/node-stdlib-browser/helpers/esbuild/shim'
          ),
          'process'
        ],
        Buffer: [
          require.resolve(
            './node_modules/node-stdlib-browser/helpers/esbuild/shim'
          ),
          'Buffer'
        ]
      }),
      enforce: 'post'
    }
  ],
  server: {
    cors: false,
  },
  resolve: {
    alias: {...stdLibBrowser, 'symbol-crypto-wasm-node': symbolCryptoWasmPath},
  },
  optimizeDeps: {
    esbuildOptions: {
      target: 'es2020',
    },
  },
  build: {
    target: 'es2020'
  }
})
