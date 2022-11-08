import { defineApp } from 'iles';
import { computed } from 'vue';
import '@unocss/reset/tailwind.css';
import 'prism-themes/themes/prism-gruvbox-dark.min.css';
import 'uno.css';

import '~/styles/index.scss';

function pageType(href: string) {
  if (href === '/about') return 'About';
  if (href === '/search') return 'SearchResults';
  if (href.startsWith('/posts') || href.startsWith('/tag')) return 'Collection';
  if (href.startsWith('/post/')) return 'Item';
  return 'Web';
}

const fonts = [
  '/assets/fonts/noto-serif-sc/NotoSerifSC.31c223c6.css',
  '/assets/fonts/lxgw-wenkai/LXGWWenKai.b86f3f29.css',
  '/vendors/katex/katex.css',
];

export default defineApp({
  head({ frontmatter, site, route }) {
    return {
      htmlAttrs: { lang: 'zh-CN' },
      bodyAttrs: {
        itemscope: '',
        itemtype: computed(() => `https://schema.org/${pageType(route.path)}Page`),
      },
      title: computed(() => `${frontmatter.title ? `${frontmatter.title} - ${site.title}` : site.title}`),
      style: [{ // hide when theme not set
        children: 'html:not(.dark):not(.light) { visibility: hidden; }',
      }, { // hide when CSS not loaded
        children: 'body { visibility: hidden; }',
      }],
      script: [{
        children: `(() => {
let dark;
try {
  const theme = localStorage && localStorage.getItem('vueuse-color-scheme');
  if (theme === 'dark') dark = true;
  else if (theme === 'light') dark = false;
  else dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
} catch (e) {
  dark = false;
}
document.documentElement.classList.add(dark ? 'dark' : 'light');
})()`,
      }],
      noscript: fonts.map((href) => ({
        children: `<link rel="stylesheet" href="${href}">`,
      })).concat({
        // remove restriction on theme not set
        children: '<style>html { visibility: visible !important; }</style>',
      }),
      link: [
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          href: '/favicon-32x32.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16',
          href: '/favicon-16x16.png',
        },
        { rel: 'manifest', href: '/site.webmanifest' },
        { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#a07e5b' },
        { rel: 'canonical', href: computed(() => new URL(frontmatter.canonical || route.path, site.url).href) },
        {
          rel: 'alternate',
          type: 'application/rss+xml',
          href: '/feed.xml',
          title: `RSS Feed - ${site.title}`,
        },
        {
          rel: 'alternate',
          type: 'application/atom+xml',
          href: '/feed.atom',
          title: `Atom Feed - ${site.title}`,
        },
        {
          rel: 'alternate',
          type: 'application/json',
          href: '/feed.json',
          title: `JSON Feed - ${site.title}`,
        },
        { rel: 'dns-prefetch', href: 'https://plausible.ouuan.moe' },
        { rel: 'preconnect', href: 'https://blog-visitor-count.ouuan.moe' },
      ].concat(fonts.map((href) => ({
        rel: 'stylesheet',
        href,
        media: 'print',
        onload: 'this.media="all";this.onload=null',
      }))),
      meta: [
        { name: 'author', content: site.author },
        { name: 'keywords', content: computed(() => frontmatter.tags || 'blog') },
        { name: 'twitter:creator', content: '@ouuan' },
        { name: 'twitter:card', content: 'summary' },
        {
          property: 'og:image',
          content: computed(
            () => new URL(frontmatter.image || '/android-chrome-512x512.png', site.url).href,
          ),
        },
      ],
    };
  },
});
