import { useColorMode } from '@vueuse/core';

const theme = useColorMode({ emitAuto: true });

export default function useTheme() {
  return theme;
}
