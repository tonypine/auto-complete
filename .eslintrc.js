module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
  },
  settings: {
    react: { version: 'detect' },
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  env: { browser: true, amd: true, node: true },
  extends: [
    'airbnb',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'prettier',
  ],
  plugins: ['@typescript-eslint/eslint-plugin'],
  rules: {
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }],
    'no-restricted-exports': 0,
    'object-curly-newline': 0,
    quotes: ['error', 'single', { allowTemplateLiterals: false }],
    'react/jsx-key': 'off',
    'react/jsx-props-no-spreading': 1,
    'react/react-in-jsx-scope': 'off',
    '@next/next/no-html-link-for-pages': 'off',
    'sort-imports': [
      'error',
      {
        ignoreDeclarationSort: true,
        ignoreCase: true,
      },
    ],
    'import/order': [
      'error',
      {
        alphabetize: {
          caseInsensitive: true,
          order: 'asc',
        },
        groups: [
          ['unknown', 'builtin', 'external'],
          ['internal', 'parent', 'sibling', 'object', 'index'],
          ['type'],
        ],
        'newlines-between': 'always',
      },
    ],
    'react/no-unescaped-entities': 'off',
    'import/prefer-default-export': 1,
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '**/*.test.{ts,tsx}',
          '**/__mocks__/*.{ts,tsx}',
          'src/test-utils/**/*.{ts,tsx}',
        ],
      },
    ],
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
  },
};
