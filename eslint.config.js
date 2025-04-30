import ouuan from '@ouuan/eslint-config-vue';
import unocss from '@unocss/eslint-config/flat';
import { globalIgnores } from 'eslint/config';

export default [
  globalIgnores([
    '.iles-ssg-temp',
    'components.d.ts',
    'composables.d.ts',
    'dist/',
    'dist-ssr/',
    'third_party/',
    'public/',
  ]),
  ...ouuan,
  unocss,
  {
    rules: {
      'vue/multi-word-component-names': 'off',
      'vue/component-name-in-template-casing': ['error', 'kebab-case', {
        registeredComponentsOnly: false,
        ignores: ['Picture', 'Head', 'Card'],
      }],
      'vuejs-accessibility/heading-has-content': ['error', {
        accessibleChildren: ['SearchResultHighlight'],
      }],
      'vuejs-accessibility/anchor-has-content': ['error', {
        accessibleChildren: ['SearchResultHighlight'],
      }],
    },
  },
];
