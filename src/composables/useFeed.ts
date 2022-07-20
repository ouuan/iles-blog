import { FeedItem, FeedOptions } from '@islands/feed';
import { h } from 'vue';

import useCopyrightYear from '~/composables/useCopyrightYear';
import { usePosts } from '~/composables/usePosts';

export default function useFeed() {
  const { site } = usePage();
  const {
    author,
    authorLink,
    url,
    title,
    description,
  } = site;
  const yearString = useCopyrightYear();

  const options: FeedOptions = {
    title,
    description,
    id: url,
    link: url,
    language: 'zh-CN',
    favicon: new URL('/favicon.ico', url).href,
    copyright: `Copyright © ${yearString} ${site.author}
Licensed under CC BY-SA 4.0`,
    updated: new Date(),
    feedLinks: {
      atom: new URL('/feed.atom', url).href,
      rss: new URL('/feed.xml', url).href,
    },
    author: {
      name: author,
      link: authorLink,
    },
  };

  const items = usePosts().value.slice(0, 10).map<FeedItem>((post) => ({
    title: post.frontmatter.title,
    id: new URL(post.href, url).href,
    link: new URL(post.href, url).href,
    description: h(post, { excerpt: true }),
    content: post,
    date: post.frontmatter.date,
  }));

  return {
    options,
    items,
  };
}
