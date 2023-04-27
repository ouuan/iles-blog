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
      /^font-(serif|sans|mono|kai|latin)$/,
      ([, type]) => ({ 'font-family': `var(--default-${type}-font)` }),
    ],
    ['break-anywhere', { 'overflow-wrap': 'anywhere' }],
  ],
  theme: {
    breakpoints: {
      xs: '25em',
      sm: '40em',
      md: '48em',
      lg: '64em',
      xl: '79.9em', // fix TOC display on exactly at xl
      '2xl': '96em',
      '3xl': '112em',
    },
    colors: {
      // theme colors
      dark: ['#353853', '#30344C', '#2C2F45', '#282A3E', '#232637', '#1F2130', '#1A1C29', '#161722', '#12131C', '#0D0E15'],
      light: ['#F7F9FB', '#EFF3F7', '#E6EDF2', '#DEE6EE', '#D6E0EA', '#CEDAE6', '#C6D4E2', '#BECEDD', '#B5C8D9', '#ADC2D5'],
      primary: ['#A2C6F0', '#8BB8EC', '#74AAE8', '#5D9CE5', '#468EE1', '#2E80DD', '#2272CF', '#1E66B8', '#1A59A0', '#164C89'],
      gray: ['#F0F0F3', '#E1E2E8', '#D2D3DC', '#C3C5D1', '#B4B6C5', '#A5A7BA', '#9699AE', '#878AA2', '#787B97', '#6A6E8A', '#5F627B', '#53566C', '#474A5D', '#3C3E4E', '#2F313D'],
      // utility colors
      success: '#3DA83A',
      error: '#B7404C',
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
      // LoveLive! colors
      muse: '#E50080',
      honoka: '#FFAE00',
      aqours: '#19B1F6',
      nijigasaki: '#F8B656',
      aisan: '#FF5800',
      emma: '#84C36E',
      lanzhu: '#F69992',
      mia: '#A9A898',
      setsuna: '#D81C2F',
      qfour: '#D9DB83',
      liella: '#DA57D8',
      kanon: '#FF7F27',
      keke: '#A0FFF9',
    },
    media: {
      screen: 'screen',
    },
  },
  shortcuts: [{
    bghover: 'hover:bg-bghover transition-colors ease-out',
    'page-container': 'mx-2 sm:mx-12 md:mx-24 lg:mx-auto lg:w-208 xl:w-288 2xl:w-300 3xl:w-312',
    'floating-button': 'fixed z-5 right-9 md:right-18 lg:right-9 2xl:right-18 3xl:right-27 w-10 h-10 rd-full flex items-center justify-center bg-popup shadow print:hidden',
    btn: 'b-bghover b-2 rd-1 py-1 flex items-center',
    'btn-normal': 'bg-card bghover',
    'btn-invert': 'text-card bg-gray-11 hover:bg-gray-11 dark:bg-gray-3 dark:hover:bg-gray-3',
    disabled: 'cursor-not-allowed opacity-50',
    heimu: 'bg-text hover:text-card',
    'standard-card': 'bg-card rd-2 px-6 md:px-12 overflow-auto md:py-3 shadow',
  }, [
    /^contrast-(.+?)(?:-(.+))?$/,
    ([, color, lightColor]) => [
      `light:text-${lightColor || 'text'}`,
      'light:drop-shadow',
      `light:drop-shadow-color-${color}`,
      `dark:text-${color}`,
    ],
  ]],
  transformers: [
    transformerDirective(),
  ],
});
