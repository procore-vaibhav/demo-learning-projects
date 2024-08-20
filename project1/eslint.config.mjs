import globals from 'globals';
import pluginJs from '@eslint/js';

// Manually define Prettier recommended rules
const prettierRecommendedRules = {
  // Add any specific Prettier rules or configuration here
};

const config = [
  {
    files: ['**/*.js'],
    languageOptions: {
      sourceType: 'module',
      globals: globals.browser,
    },
    plugins: {
      // Define any plugins you use here
    },
    rules: {
      // Define or override rules here if needed
      'no-unused-vars': ['warn', { args: 'none' }],
      // Add Prettier rules directly if necessary
      ...prettierRecommendedRules,
    },
    ignores: ['node_modules', 'dist'],
  },
  // Add recommended rules from ESLint

  pluginJs.configs.recommended,
];

export default config;
