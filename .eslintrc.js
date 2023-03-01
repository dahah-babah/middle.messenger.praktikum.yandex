module.exports = {
  extends: ['airbnb-base', 'airbnb-typescript/base', 'prettier'],
  plugins: ['import', 'prettier'],
  env: {
    browser: true,
    es2021: true,
  },
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    semi: ['error', 'never'],
    '@typescript-eslint/semi': 'off',
    'class-methods-use-this': 0,
    'import/prefer-default-export': 'off',
    'import/no-absolute-path': 0,
    'no-constructor-return': 0,
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'no-underscore-dangle': ['error', { allowAfterThis: true }],
    'import/extensions': 'off',
  },
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
}
