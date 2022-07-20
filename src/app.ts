import { defineApp } from 'iles';
import { computed } from 'vue';
import '@unocss/reset/tailwind.css';
import 'prism-themes/themes/prism-gruvbox-dark.min.css';
import 'uno.css';

import '~/styles/index.scss';

export default defineApp({
  head({ frontmatter, site, meta }) {
    return {
      htmlAttrs: { lang: 'zh-CN' },
      bodyAttrs: {
        itemscope: '',
        itemtype: 'http://schema.org/WebPage',
      },
      title: computed(() => `${frontmatter.title ? `${frontmatter.title} - ${site.title}` : site.title}`),
      link: [
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: '/apple-touch-icon.png',
        },
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
        {
          rel: 'manifest',
          href: '/site.webmanifest',
        },
        {
          rel: 'mask-icon',
          href: '/safari-pinned-tab.svg',
          color: '#a07e5b',
        },
        {
          rel: 'canonical',
          href: computed(() => new URL(meta.href, site.url).href),
        },
        {
          rel: 'feed',
          type: 'application/rss+xml',
          href: '/feed.xml',
          title: `RSS Feed - ${site.title}`,
        },
        {
          rel: 'feed',
          type: 'application/atom+xml',
          href: '/feed.atom',
          title: `Atom Feed - ${site.title}`,
        },
        {
          rel: 'dns-prefetch',
          href: 'https://plausible.ouuan.moe',
        },
        {
          rel: 'preconnect',
          href: 'https://blog-visitor-count.ouuan.moe',
        },
        {
          rel: 'stylesheet',
          href: '/fonts/katex/index.css',
        },
        {
          rel: 'stylesheet',
          href: '/fonts/noto-serif-sc/index.css',
        },
        {
          rel: 'stylesheet',
          href: '/fonts/lxgw-wenkai/index.css',
        },
      ],
      meta: [
        { property: 'author', content: site.author },
        { property: 'keywords', content: computed(() => frontmatter.tags || 'blog') },
        { property: 'twitter:creator', content: '@ouuan' },
      ],
    };
  },
});
