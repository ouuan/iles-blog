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

export default defineApp({
  head({ frontmatter, site, route }) {
    return {
      htmlAttrs: { lang: 'zh-CN' },
      bodyAttrs: {
        itemscope: '',
        itemtype: computed(() => `https://schema.org/${pageType(route.path)}Page`),
      },
      title: computed(() => `${frontmatter.title ? `${frontmatter.title} - ${site.title}` : site.title}`),
      style: [{ children: 'body { visibility: hidden; }' }],
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
        { rel: 'canonical', href: computed(() => new URL(route.path, site.url).href) },
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
        { rel: 'dns-prefetch', href: 'https://plausible.ouuan.moe' },
        { rel: 'preconnect', href: 'https://blog-visitor-count.ouuan.moe' },
        { rel: 'stylesheet', href: '/fonts/katex/index.css' },
        { rel: 'stylesheet', href: '/fonts/noto-serif-sc/index.css' },
        { rel: 'stylesheet', href: '/fonts/lxgw-wenkai/index.css' },
      ],
      meta: [
        { property: 'author', content: site.author },
        { property: 'keywords', content: computed(() => frontmatter.tags || 'blog') },
        { property: 'twitter:creator', content: '@ouuan' },
        { property: 'og:image', content: new URL('/android-chrome-512x512.png', site.url).href },
      ],
    };
  },
});
