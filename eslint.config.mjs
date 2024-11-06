import globals from 'globals';
import pluginJs from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';
import pluginPrettier from 'eslint-plugin-prettier';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['**/*.js'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },
    rules: {
      'prettier/prettier': 'error'
    }
  },
  pluginJs.configs.recommended,
  prettierConfig,
  pluginPrettier.configs.recommended
];
