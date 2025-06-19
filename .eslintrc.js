module.exports = {
    root: true,
    env: {
      browser: true,
      es2021: true,
      node: true,
    },
    extends: [
      'google',
      'plugin:vue/vue3-essential',
      'plugin:prettier/recommended'
    ],
    parserOptions: {
      ecmaVersion: 12,
      sourceType: 'module',
    },
    plugins: [
      'vue'
    ],
    rules: {
      'require-jsdoc': 'off',
      'vue/multi-word-component-names': 'off',
      'prettier/prettier': 'error',
    },
    ignorePatterns: [
      'node_modules/',
      'dist/'
    ]
  }
