<template>
  <div />
</template>

<script client:idle lang="ts">
// eslint-disable-next-line import/prefer-default-export
export function onLoad() {
  document.fonts.ready.then(() => {
    const math = Array.from(document.getElementsByClassName('math-inline'));
    math.forEach((node) => {
      if (!node.parentElement) return;
      if (getComputedStyle(node.parentElement).textAlign !== 'justify') {
        return;
      }
      if (node.getBoundingClientRect().width
          < node.parentElement.getBoundingClientRect().width / 3) {
        return;
      }
      // eslint-disable-next-line no-param-reassign
      node.parentElement.style.textAlign = 'initial';
    });
  });
}
</script>
