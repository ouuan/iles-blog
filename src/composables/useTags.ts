import { computed } from 'vue';
import { Post } from './usePosts';

const posts = useDocuments<unknown>('~/pages/post/**/*.{md,mdx}');

const tags = computed(() => Array.from(new Set(posts.value.reduce((set, post) => {
  if (Array.isArray(post.frontmatter.tags)) {
    post.frontmatter.tags.forEach((tag) => set.add(tag));
  }
  return set;
}, new Set<string>()))));

export function useTags() {
  return tags;
}

const tagCountMap = computed(() => (posts.value.reduce((map, post) => {
  if (Array.isArray(post.frontmatter.tags)) {
    post.frontmatter.tags.forEach((tag) => map.set(tag, (map.get(tag) ?? 0) + 1));
  }
  return map;
}, new Map<string, number>())));

export function useTagCountMap() {
  return tagCountMap;
}

export function useTagFilter(tag: string) {
  return function filter(post: Post) {
    return Array.isArray(post.frontmatter.tags) && post.frontmatter.tags.includes(tag);
  };
}
