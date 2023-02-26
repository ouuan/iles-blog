module.exports = {
  root: true,
  extends: [
    '@ouuan/eslint-config-vue',
    '@unocss',
  ],
  rules: {
    'vue/component-name-in-template-casing': ['error', 'kebab-case', {
      registeredComponentsOnly: false,
      ignores: ['Picture', 'Head', 'Card'],
    }],
  },
};
