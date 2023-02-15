import type { FeedItem, FeedOptions } from '@islands/feed';
import { h } from 'vue';

import useCopyrightYear from './useCopyrightYear';
import { usePosts } from './usePosts';
import { useTagFilter } from './useTags';

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
    title: tag ? `${title}: 标签: ${tag}` : title,
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
      json: new URL(`${tag ? `/tag/${tag}` : ''}/feed.json`, url).href,
    },
    author: {
      name: author,
      link: authorLink,
    },
  };

  const items = usePosts({
    filter: tag ? useTagFilter(tag) : () => true,
    pageIndex: 1,
  }).value.map<FeedItem>((post) => {
    let category: FeedItem['category'];
    if (Array.isArray(post.frontmatter.tags)) {
      category = post.frontmatter.tags.map((t) => ({
        name: t,
        domain: new URL(`/tag/${t}`, url).href,
        term: new URL(`/tag/${t}`, url).href,
      }));
    }
    return {
      title: post.frontmatter.title,
      id: new URL(post.href, url).href,
      link: new URL(post.href, url).href,
      description: h(post, { excerpt: true }),
      content: post,
      date: post.frontmatter.published,
      category,
    };
  }).sort((lhs, rhs) => rhs.date.valueOf() - lhs.date.valueOf());

  options.updated = items[0]?.date;

  return {
    options,
    items,
  };
}
