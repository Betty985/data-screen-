<script setup>
// props
let props = defineProps({
  styles: Object,
});
</script>

<template>
  <div :style="styles">
    <el-button>hello world</el-button>
  </div>
</template>

<style scoped>
div {
  background: blue;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}
</style>
