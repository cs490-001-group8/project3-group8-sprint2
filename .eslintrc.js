module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    "indent" : ["error", 4, { "ignoredNodes": ["JSXElement *"] }],
    "react/jsx-indent" : ["error", 4],
    "linebreak-style": 0,
  },
};