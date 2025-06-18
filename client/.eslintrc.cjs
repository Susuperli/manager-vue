/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 2021, // 修复点：设置合适的 ECMAScript 版本
    sourceType: 'module',
    ecmaFeatures: {
      jsx: false
    },
    // 解析 Vue 单文件组件的 script 和 template
    vueFeatures: {
      filter: true,
      interpolation: true
    }
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    // 可根据需要添加规则
  }
}
