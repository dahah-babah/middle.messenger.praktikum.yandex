module.exports = {
    env: {
        'browser': true,
        'es2021': true
    },
    extends: [
        'airbnb-base',
        'airbnb-typescript/base',
        'plugin:import/recommended'
    ],
    parserOptions: {
        project: './tsconfig.json',
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    plugins: ['import'],
    rules: {
        'semi': ['error', 'never'],
        'no-underscore-dangle': ['error', { 'allowAfterThis': true }],
        '@typescript-eslint/semi': 'off',
        'import/prefer-default-export': 'off',
    },
    settings: {
        'import/resolver': {
            typescript: {
                alwaysTryTypes: true,
            },
        },
    },
}
