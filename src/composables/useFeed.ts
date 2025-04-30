import type { FeedItem, FeedOptions } from '@islands/feed';
import { isString } from '@sniptt/guards';
import { h } from 'vue';

import { useCopyrightYearString } from './useCopyrightYear';
import { usePosts } from './usePosts';
import { useTagFilter } from './useTags';

export default function useFeed({ tag, min }: { tag?: string; min?: boolean } = {}) {
  const { site } = usePage();
  const {
    author,
    authorLink,
    url,
    title,
    description,
  } = site;
  const yearString = useCopyrightYearString();

  const tagPath = tag ? `/tag/${tag}` : '';
  const minSuffix = min ? '.min' : '';

  const link = new URL(tagPath, url).href;

  const options: FeedOptions = {
    title: tag ? `标签: ${tag} - ${title}` : title,
    description: tag ? `标签为 ${tag} 的文章 - ${description}` : description,
    id: link,
    link,
    language: 'zh-CN',
    favicon: new URL('/favicon.ico', url).href,
    copyright: `Copyright © ${yearString} ${site.author}
Licensed under CC BY-SA 4.0`,
    feedLinks: {
      atom: new URL(`${tagPath}/feed${minSuffix}.atom`, url).href,
      rss: new URL(`${tagPath}/feed${minSuffix}.xml`, url).href,
      json: new URL(`${tagPath}/feed${minSuffix}.json`, url).href,
    },
    author: {
      name: author,
      link: authorLink,
    },
  };

  const items = usePosts({
    filter: tag ? useTagFilter(tag) : () => true,
    pageIndex: 1,
    perPage: 5,
  }).value.map<FeedItem>((post) => {
    let category: FeedItem['category'];
    if (Array.isArray(post.frontmatter.tags)) {
      category = post.frontmatter.tags
        .filter(isString)
        .map((t) => ({
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
      date: post.frontmatter.published,
      category,
      ...(min ? {} : { content: post }),
    };
  }).sort((lhs, rhs) => rhs.date.valueOf() - lhs.date.valueOf());

  options.updated = items[0]?.date;

  return {
    options,
    items,
  };
}
