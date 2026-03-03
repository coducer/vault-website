module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['react', '@typescript-eslint', 'prettier'],
  extends: [
    'airbnb-base',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'next/core-web-vitals',
  ],
  ignorePatterns: ['next.config.mjs', 'jest.setup.js', 'public/sw.js'],
  rules: {
    'prettier/prettier': 'error',
    'import/no-extraneous-dependencies': 'off',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'no-unused-vars': 'off', // disabled in favor of TS rule
    'no-use-before-define': 'off', // disabled in favor of TS rule
    '@typescript-eslint/no-use-before-define': 'error',
    'no-restricted-imports': [
      'error',
      {
        paths: [],
        // patterns: ['.*', '**/../*'],
      },
    ],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        ts: 'never',
        tsx: 'never',
        js: 'never',
        jsx: 'never',
      },
    ],
    'react/jsx-filename-extension': 'off',
    'react/jsx-props-no-spreading': 'off',
    'import/prefer-default-export': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'react/require-default-props': 'off',
    'no-useless-escape': 'off',
    'import/no-cycle': 'off',
    'react/function-component-definition': 'off',
    'no-unused-expressions': 'error',
    'no-console': ['error', { allow: ['error', 'info'] }],
    'no-debugger': 'error',
    // Optional: enable when you want to avoid commented-out code
    // 'no-warning-comments': [
    //   'error',
    //   {
    //     terms: ['todo', 'fixme', 'xxx'],
    //     location: 'start',
    //   },
    // ],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
    react: {
      version: 'detect',
    },
  },
};
