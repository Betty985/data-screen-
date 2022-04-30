/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-prettier",
  ],
  rules: {
    "prettier/prettier": 0,
    "vue/comment-directive": 0,
    "vue/multi-word-component-names": 0,
    "no-unused-vars": 0,
    "vue/no-duplicate-attributes": 0,
  },
  env: {
    "vue/setup-compiler-macros": true,
  },
};
