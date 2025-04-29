import { computed, unref } from 'vue';
import { format } from 'date-fns';
import type { MaybeRef } from '@vueuse/core';

import type { Post } from './usePosts';

const MAX_LENGTH = 120;

export default function useDescription({
  posts,
  lead,
  page,
  dateType,
}: {
  posts: MaybeRef<Post[]>;
  lead: MaybeRef<string>;
  page?: MaybeRef<number>;
  dateType: MaybeRef<'date' | 'lastUpdated'>;
}) {
  return computed(
    () => {
      const p = unref(page);
      const fullLead = `${unref(lead)}${p === undefined || p === 1 ? '' : `（第${p}页）`}`;
      const list = [];
      let totalLength = fullLead.length + 2;
      for (const post of unref(posts)) {
        const date = format(post.frontmatter[unref(dateType)], 'yyyy-MM-dd');
        const item = `${date}《${post.frontmatter.title}》`;
        totalLength += item.length + 1;
        if (list.length > 0 && totalLength >= MAX_LENGTH) break;
        list.push(item);
      }
      return `${fullLead}：${list.join('，')}……`;
    },
  );
}
