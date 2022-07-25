import {
  defineConfig,
  presetIcons,
  presetUno,
} from 'unocss';
import transformerDirective from '@unocss/transformer-directives';

export default defineConfig({
  presets: [
    presetIcons(),
    presetUno(),
  ],
  rules: [
    [
      /^font-(serif|sans|mono|kai)$/,
      ([, type]) => ({ 'font-family': `var(--default-${type}-font)` }),
    ],
  ],
  theme: {
    breakpoints: {
      xs: '25em',
      sm: '40em',
      md: '48em',
      lg: '64em',
      xl: '80em',
      '2xl': '96em',
      '3xl': '112em',
    },
    colors: {
      dark: ['#353853', '#30344C', '#2C2F45', '#282A3E', '#232637', '#1F2130', '#1A1C29', '#161722', '#12131C', '#0D0E15'],
      light: ['#F7F9FB', '#EFF3F7', '#E6EDF2', '#DEE6EE', '#D6E0EA', '#CEDAE6', '#C6D4E2', '#BECEDD', '#B5C8D9', '#ADC2D5'],
      primary: ['#A2C6F0', '#8BB8EC', '#74AAE8', '#5D9CE5', '#468EE1', '#2E80DD', '#2272CF', '#1E66B8', '#1A59A0', '#164C89'],
      gray: ['#F0F0F3', '#E1E2E8', '#D2D3DC', '#C3C5D1', '#B4B6C5', '#A5A7BA', '#9699AE', '#878AA2', '#787B97', '#6A6E8A', '#5F627B', '#53566C', '#474A5D', '#3C3E4E', '#2F313D'],
      success: '#3DA83A',
      error: '#B7404C',
      gruvboxbg: '#1d2021',
      text: 'var(--text-color)',
      bg: 'var(--bg-color)',
      card: 'var(--card-color)',
      link: 'var(--link-color)',
      hover: 'var(--hover-color)',
      active: 'var(--active-color)',
      bghover: 'var(--bghover-color)',
      popup: 'var(--popup-color)',
      footer: 'var(--footer-color)',
      area: 'var(--area-color)',
      nested: 'var(--nested-color)',
    },
  },
  shortcuts: {
    'container-margin': 'mx-3 md:mx-12 lg:mx-24 2xl:mx-36 3xl:mx-48',
    'floating-button': 'fixed z-5 right-9 md:right-18 lg:right-9 2xl:right-18 3xl:right-27 w-10 h-10 rd-5 flex items-center justify-center bg-popup shadow print:hidden',
    btn: 'b-bghover b-2 rd-1 py-1 flex items-center',
    'btn-normal': 'bg-card hover:bg-bghover',
    'btn-invert': 'text-card bg-gray-11 hover:bg-gray-11 dark:bg-gray-3 dark:hover:bg-gray-3',
    disabled: 'cursor-not-allowed opacity-50',
    'standard-card': 'bg-card rd-2 px-6 md:px-12 overflow-auto md:py-3 shadow',
  },
  transformers: [
    transformerDirective(),
  ],
});
