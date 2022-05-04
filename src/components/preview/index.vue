<script setup>
defineProps({
  w: Number,
  h: Number,
  x: Number,
  y: Number,
  z: Number,
});
</script>

<template>
  <div
    :style="{
      width: `${w}px`,
      height: `${h}px`,
      position: 'absolute',
      left: `${x}px`,
      top: `${y}px`,
      zIndex: z,
    }"
  >
    <slot></slot>
  </div>
</template>

<style scoped></style>
