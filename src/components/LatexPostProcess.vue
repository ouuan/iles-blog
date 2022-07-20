<template>
  <div />
</template>

<script client:load lang="ts">
// eslint-disable-next-line import/prefer-default-export
export function onLoad() {
  Array.from(document.getElementsByClassName('math-inline')).forEach((node) => {
    if (node.parentElement) {
      if (node.getBoundingClientRect().width
          > node.parentElement.getBoundingClientRect().width / 3) {
        // eslint-disable-next-line no-param-reassign
        node.parentElement.style.textAlign = 'initial';
      }
    }
  });
}
</script>
