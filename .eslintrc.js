module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin', '@typescript-eslint', 'import', 'prettier'],
  extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended', 'airbnb-typescript', 'prettier'],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    'react/jsx-filename-extension': [0, {}],
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [['@src', './src']],
      },
    },
  },
};
