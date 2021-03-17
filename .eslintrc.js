module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  env: {
    node: true,
    browser: true,
    jest: true,
  },
  rules: {
    'arrow-parens': ['error', 'always'],
    'no-var': 'error',
    semi: 'error',
    indent: 'off',
    'no-multi-spaces': 'error',
    'space-in-parens': 'error',
    'no-multiple-empty-lines': 'error',
    //'no-use-before-define': 'error',
    'prefer-destructuring': 'error',
    'max-len': [
      'warn',
      {
        code: 100,
        ignoreUrls: true,
        ignorePattern: 'import',
      },
    ],
    'no-unused-vars': 'warn',
    'operator-linebreak': 'warn',
    'react/jsx-closing-bracket-location': 0,
    'jsx-quotes': ['error', 'prefer-double'],
    'comma-dangle': [
      2,
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'never',
      },
    ],
    'prefer-const': [
      'error',
      {
        destructuring: 'any',
        ignoreReadBeforeAssign: false,
      },
    ],
  },
  overrides: [
    {
      files: ['src/index.js'],
      rules: {
        'react/jsx-filename-extension': 'off',
      },
    },
  ],
};
