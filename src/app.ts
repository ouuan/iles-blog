import { defineApp } from 'iles';
import { computed } from 'vue';
import '@unocss/reset/tailwind.css';
import 'uno.css';

import '~/styles/index.scss';
import noscriptStyle from '~/styles/noscript.scss?inline';

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
      style: [{
        // hide when theme not set & CSS not loaded
        children: `html:not(.dark):not(.light) {
          visibility: hidden;
        }
        body {
          visibility: hidden;
        }`.replace(/\s+/g, ' '),
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
        })()`.replace(/\s+/g, ' '),
      }],
      noscript: [{
        children: `<style>${noscriptStyle.replace(/\s+/g, ' ')}</style>`,
      }],
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
        { rel: 'stylesheet', href: '/vendors/katex/katex.css' },
        { rel: 'sitemap', href: 'https://ouuan.moe/sitemap.xml' },
      ],
      meta: [
        { name: 'author', content: site.author },
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
