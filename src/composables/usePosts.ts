import { exhaustiveCheck } from 'ts-exhaustive-check';
import { computed, unref } from 'vue';
import { MaybeRef } from '@vueuse/core';

const posts = useDocuments<unknown>('~/pages/post/**/*.md{,x}');

export type Post = typeof posts['value'][number];

export function usePosts({
  sort = 'created-desc',
  pageIndex = 0,
  perPage = 10,
  filter = () => true,
}: {
  sort?: MaybeRef<'created-desc' | 'updated-desc' | 'visitor-desc'>;
  pageIndex?: MaybeRef<number>;
  perPage?: MaybeRef<number>;
  filter?: MaybeRef<(post: (typeof posts)['value'][number]) => boolean>;
} = {}) {
  return computed(() => {
    const sortedPosts = posts.value.filter(unref(filter)).sort((lhs, rhs) => {
      const unrefedSort = unref(sort);
      switch (unrefedSort) {
        case 'created-desc':
          return rhs.frontmatter.date - lhs.frontmatter.date
              || rhs.frontmatter.lastUpdated - lhs.frontmatter.lastUpdated;
        case 'updated-desc':
          return rhs.frontmatter.lastUpdated - lhs.frontmatter.lastUpdated
              || rhs.frontmatter.date - lhs.frontmatter.date;
        case 'visitor-desc':
          return (rhs.frontmatter.visitor || 0) - (lhs.frontmatter.visitor || 0)
              || rhs.frontmatter.date - lhs.frontmatter.date;
        default:
          return exhaustiveCheck(unrefedSort);
      }
    });
    if (unref(pageIndex) > 0) {
      return sortedPosts.slice(
        (unref(pageIndex) - 1) * unref(perPage),
        unref(pageIndex) * unref(perPage),
      );
    }
    return sortedPosts;
  });
}

export function usePostCount(filter: MaybeRef<(post: (typeof posts)['value'][number]) => boolean> = () => true) {
  return computed(() => posts.value.filter(unref(filter)).length);
}

export function usePageCount({
  perPage = 10,
  filter = () => true,
}: {
  perPage?: MaybeRef<number>;
  filter?: MaybeRef<(post: (typeof posts)['value'][number]) => boolean>;
} = {}) {
  const postCount = usePostCount(filter);
  return computed(() => Math.ceil(postCount.value / unref(perPage)));
}
