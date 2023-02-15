import { computed, unref } from 'vue';
import { format } from 'date-fns';
import type { MaybeRef } from '@vueuse/core';

import site from '~/site';
import type { Post } from './usePosts';

const MAX_LENGTH = 120;

export function useAdjustedDescription(description: MaybeRef<string>) {
  return computed(() => {
    const d = unref(description);
    if (d.length > MAX_LENGTH) return `${d.slice(0, MAX_LENGTH - 1)}…`;
    if (d.length + site.description.length <= MAX_LENGTH) return d + site.description;
    return d;
  });
}

export function usePostListDescription({
  posts,
  lead,
  page,
  dateType,
}: {
  posts: MaybeRef<Post[]>,
  lead: MaybeRef<string>,
  page?: MaybeRef<number>,
  dateType: MaybeRef<'date' | 'lastUpdated'>,
}) {
  return computed(
    () => {
      const p = unref(page);
      const fullLead = `${unref(lead)}${p === undefined || p === 1 ? '' : `（第${p}页）`}`;
      const list = [];
      let totalLength = fullLead.length + 2;
      for (const post of unref(posts)) {
        const item = `${format(post.frontmatter[unref(dateType)], 'yyyy-MM-dd')}《${post.frontmatter.title}》`;
        totalLength += item.length + 1;
        if (list.length > 0 && totalLength >= MAX_LENGTH) break;
        list.push(item);
      }
      return useAdjustedDescription(`${fullLead}：${list.join('，')}……`).value;
    },
  );
}
