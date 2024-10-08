module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:vue/vue3-recommended',
    'prettier',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  plugins: ['import', 'vue', '@typescript-eslint', 'prettier'],
  rules: {
    'global-require': 0,
    'no-unused-vars': 0,
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['off'],
    /** ******************* */
    /* General Code Rules */
    /** ******************* */

    // Enforce import order
    'import/order': 'error',

    'import/extensions': ['off'],

    // Imports should come first
    'import/first': 'error',

    // Other import rules
    'import/no-mutable-exports': 'error',

    // Allow unresolved imports
    'import/no-unresolved': 'off',

    // Allow async-await
    'generator-star-spacing': 'off',

    // Prefer const over let
    'prefer-const': [
      'error',
      {
        destructuring: 'any',
        ignoreReadBeforeAssign: false,
      },
    ],

    // No single if in an "else" block
    'no-lonely-if': 'error',

    // Force curly braces for control flow,
    // including if blocks with a single statement
    curly: ['error', 'all'],

    // No async function without await
    'require-await': 'error',

    // Force dot notation when possible
    'dot-notation': 'error',

    'no-var': 'error',

    // Force object shorthand where possible
    'object-shorthand': 'error',

    // No useless destructuring/importing/exporting renames
    'no-useless-rename': 'error',

    // No use before define
    'no-use-before-define': 'off',

    'no-param-reassign': 0,

    'no-undef': 0,

    /** ******************* */
    /*     Vue Rules      */
    /** ******************* */

    // Disable template errors regarding invalid end tags
    'vue/no-parsing-error': [
      'error',
      {
        'x-invalid-end-tag': false,
      },
    ],

    // Max Attributes Per Line
    'vue/max-attributes-per-line': 'off',

    // Allow Multiple Template Root
    'vue/no-multiple-template-root': 0,

    /** ************************ */
    /* ESLint Vue Plugin Rules */
    /** ************************ */
    'vue/order-in-components': [
      'error',
      {
        order: [
          'el',
          'name',
          'parent',
          'functional',
          ['delimiters', 'comments'],
          ['components', 'directives', 'filters'],
          'extends',
          'mixins',
          'inheritAttrs',
          'model',
          ['props', 'propsData'],
          'fetch',
          'asyncData',
          'data',
          'computed',
          'watch',
          'LIFECYCLE_HOOKS',
          'methods',
          'head',
          ['template', 'render'],
          'renderError',
        ],
      },
    ],
    'vue/multi-word-component-names': 'off',
    'vue/html-self-closing': ['off'],
    'class-methods-use-this': 0,
    'no-underscore-dangle': 'off',
    camelcase: 'off',

    'vue/attributes-order': [
      'error',
      {
        order: [
          'DEFINITION',
          'LIST_RENDERING',
          'CONDITIONALS',
          'RENDER_MODIFIERS',
          'GLOBAL',
          'UNIQUE',
          'TWO_WAY_BINDING',
          'OTHER_DIRECTIVES',
          'OTHER_ATTR',
          'EVENTS',
          'CONTENT',
        ],
      },
    ],
    'prettier/prettier': 'error',
  },
};
