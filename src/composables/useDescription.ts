import { computed, unref } from 'vue';
import type { MaybeRef } from '@vueuse/core';
import type { Post } from './usePosts';

export default function useDescription({
  posts,
  count,
  lead,
  page,
}: {
  posts: MaybeRef<Post[]>,
  count: MaybeRef<number>,
  lead: MaybeRef<string>,
  page?: MaybeRef<number>,
}) {
  return computed(
    () => {
      const p = unref(page);
      const pageString = p === undefined || p === 1 ? '' : `（第${p}页）`;
      return `${unref(lead)}${pageString}：${
        unref(posts).slice(0, unref(count)).map(
          (post) => `《${post.frontmatter.title}》`,
        ).join('，')
      }……`;
    },
  );
}
