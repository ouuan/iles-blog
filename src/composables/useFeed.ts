import { FeedItem, FeedOptions } from '@islands/feed';
import { h } from 'vue';

import useCopyrightYear from '~/composables/useCopyrightYear';
import { usePosts } from '~/composables/usePosts';

export default function useFeed(tag?: string) {
  const { site } = usePage();
  const {
    author,
    authorLink,
    url,
    title,
    description,
  } = site;
  const yearString = useCopyrightYear();

  const link = tag ? new URL(`/tag/${tag}`, url).href : url;

  const options: FeedOptions = {
    title: tag ? `标签: ${tag} - ${title}` : title,
    description: tag ? `标签: ${tag} - ${description}` : description,
    id: link,
    link,
    language: 'zh-CN',
    favicon: new URL('/favicon.ico', url).href,
    copyright: `Copyright © ${yearString} ${site.author}
Licensed under CC BY-SA 4.0`,
    updated: new Date(),
    feedLinks: {
      atom: new URL(`${tag ? `/tag/${tag}` : ''}/feed.atom`, url).href,
      rss: new URL(`${tag ? `/tag/${tag}` : ''}/feed.xml`, url).href,
    },
    author: {
      name: author,
      link: authorLink,
    },
  };

  const items = usePosts({
    filter: (post) => (tag ? post.frontmatter.tags.includes(tag) : true),
    pageIndex: 1,
  }).value.map<FeedItem>((post) => ({
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
