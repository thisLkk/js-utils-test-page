import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import styleImport from 'vite-plugin-style-import';

let path = require('path')
const resolve = (pathname = '') => {
  return path.join(__dirname, './', pathname)
}
export default defineConfig(({ command, mode }) => {
  return {
    base: command == 'serve' ? './' : '/m/js-utils-page/',
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },
    css: {
      preprocessorOptions: { 
        scss: {
          additionalData: `@import "./src/assets/css/global.scss";`,
        }
      }
    },
    plugins: [
      vue(),
      styleImport({
        libs: [
          {
            libraryName: 'vant',
            esModule: false,
            resolveStyle: (name) => {
              return `vant/es/${name}/style/index`
            },
          },
        ],
      })
    ]
  }
})
