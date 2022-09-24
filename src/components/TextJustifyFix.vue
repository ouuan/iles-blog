<template>
  <div />
</template>

<script client:load lang="ts">
// eslint-disable-next-line import/prefer-default-export
export function onLoad() {
  const math = Array.from(document.getElementsByClassName('math-inline'));
  const code = Array.from(document.querySelectorAll(':not(pre) > code'));
  math.concat(code).forEach((node) => {
    if (!node.parentElement) return;
    if (getComputedStyle(node.parentElement).display === 'table-cell') {
      return;
    }
    if (node.getBoundingClientRect().width < node.parentElement.getBoundingClientRect().width / 3) {
      return;
    }
    // eslint-disable-next-line no-param-reassign
    node.parentElement.style.textAlign = 'initial';
  });
}
</script>
