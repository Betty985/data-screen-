<script setup>
// props
let props = defineProps({
  styles: Object,
});
</script>

<template>
  <div>
    <el-button :style="styles">
      <slot>hello world</slot>
    </el-button>
  </div>
</template>

<style scoped>
div {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}
:deep(.el-button) {
  width: 100%;
  height: 100%;
}
</style>
