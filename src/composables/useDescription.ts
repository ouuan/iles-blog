import { computed, unref } from 'vue';
import { format } from 'date-fns';
import type { MaybeRef } from '@vueuse/core';
import type { Post } from './usePosts';

export default function useDescription({
  posts,
  count,
  lead,
  page,
  dateType,
}: {
  posts: MaybeRef<Post[]>,
  count: MaybeRef<number>,
  lead: MaybeRef<string>,
  page?: MaybeRef<number>,
  dateType: MaybeRef<'date' | 'lastUpdated'>,
}) {
  return computed(
    () => {
      const p = unref(page);
      const pageString = p === undefined || p === 1 ? '' : `（第${p}页）`;
      return `${unref(lead)}${pageString}：${
        unref(posts).slice(0, unref(count)).map(
          (post) => `${format(post.frontmatter[unref(dateType)], 'yyyy-MM-dd')}《${post.frontmatter.title}》`,
        ).join('，')
      }……`;
    },
  );
}
