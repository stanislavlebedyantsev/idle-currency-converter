module.exports = {
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  plugins: ['prettier', 'react-hooks'],
  parser: 'babel-eslint',
  env: {
    node: true,
    browser: true,
    jest: true,
  },
  settings: {
    react: {
      version: '16.13.1',
      flowVersion: '0.53',
    },
  },
  rules: {
    'arrow-parens': ['error', 'always'],
    'no-var': 'error',
    semi: 'error',
    indent: 'off',
    'no-multi-spaces': 'error',
    'space-in-parens': 'error',
    'no-multiple-empty-lines': 'error',
    'no-use-before-define': 'error',
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
    'react-hooks/rules-of-hooks': 'error',
    'react/jsx-closing-tag-location': 2,
    'react/jsx-closing-bracket-location': 0,
    'react/jsx-max-props-per-line': [
      2,
      {
        maximum: 4,
        when: 'always',
      },
    ],
    'react/jsx-filename-extension': [
      2,
      {
        extensions: ['.jsx'],
      },
    ],
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
    'react/prop-types': [1],
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
