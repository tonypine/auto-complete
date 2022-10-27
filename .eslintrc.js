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
    'plugin:prettier/recommended',
  ],
  plugins: ['@typescript-eslint/eslint-plugin', 'prettier'],
  rules: {
    '@next/next/no-html-link-for-pages': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
    'default-case': 0,
    'func-style': [
      2,
      'expression',
      {
        allowArrowFunctions: true,
      },
    ],
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
    'import/prefer-default-export': 0,
    'no-restricted-exports': 0,
    'no-unused-vars': 'off',
    'object-curly-newline': 0,
    'prefer-arrow-callback': 2,
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }],
    'react/jsx-key': 'off',
    'react/jsx-props-no-spreading': 1,
    'react/no-unescaped-entities': 'off',
    'react/react-in-jsx-scope': 'off',
    'sort-imports': [
      'error',
      {
        ignoreDeclarationSort: true,
        ignoreCase: true,
      },
    ],
    quotes: ['error', 'single', { allowTemplateLiterals: false }],
  },
  globals: {
    JSX: true,
  },
};
