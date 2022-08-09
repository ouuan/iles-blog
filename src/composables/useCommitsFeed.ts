import { FeedItem, FeedOptions } from '@islands/feed';
import { simpleGit } from 'simple-git';

import useCopyrightYear from './useCopyrightYear';
import { Post } from './usePosts';

export default async function useCommitsFeed(post: Post) {
  const { meta, frontmatter } = post;
  const { site } = usePage();
  const {
    author,
    authorLink,
    branch,
    repo,
    url,
  } = site;
  const yearString = useCopyrightYear();

  const link = `https://github.com/${repo}/commits/${branch}/${meta.filename}`;

  const options: FeedOptions = {
    title: `${frontmatter.title} - ${site.title}`,
    description: `Git Commits of ${frontmatter.title} - ${site.description}`,
    id: link,
    link,
    language: 'zh-CN',
    favicon: new URL('/favicon.ico', url).href,
    copyright: `Copyright © ${yearString} ${site.author}`,
    updated: new Date(),
    feedLinks: {
      atom: new URL(`${meta.href}/feed.atom`, url).href,
      rss: new URL(`${meta.href}/feed.xml`, url).href,
    },
    author: {
      name: author,
      link: authorLink,
    },
  };

  const log = await simpleGit().log({
    file: meta.filename,
    maxCount: 10,
    strictDate: true,
  });

  const items = await Promise.all(log.all.map<Promise<FeedItem>>(async (commit) => ({
    title: commit.message,
    id: `https://github.com/${site.repo}/commit/${commit.hash}`,
    link: `https://github.com/${site.repo}/commit/${commit.hash}`,
    description: commit.body,
    content: await simpleGit().raw(['show', commit.hash, meta.filename]),
    date: new Date(commit.date),
    author: [{
      name: commit.author_name,
      email: commit.author_email,
    }],
  })));

  return {
    options,
    items,
  };
}
