module.exports = {
  extends: ['airbnb-base', 'airbnb-typescript/base', 'plugin:import/recommended', 'prettier'],
  plugins: ['import', 'prettier'],
  env: {
    browser: true,
    es2021: true,
  },
  parserOptions: {
    project: './tsconfig.json',
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    semi: ['error', 'never'],
    'no-underscore-dangle': ['error', { allowAfterThis: true }],
    '@typescript-eslint/semi': 'off',
    'import/prefer-default-export': 'off',
    'class-methods-use-this': 0,
    'import/no-absolute-path': 0,
  },
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
}
