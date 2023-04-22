import { useColorMode } from '@vueuse/core';

const theme = useColorMode();

export default function useTheme() {
  return theme;
}
