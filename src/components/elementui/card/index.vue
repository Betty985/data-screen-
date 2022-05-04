<script setup>
// props
let props = defineProps({
  styles: Object,
});
</script>

<template>
  <div>
    <el-card :style="styles">
      <slot>hello world</slot>
    </el-card>
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
:deep(.el-card) {
  width: 100%;
  height: 100%;
}
</style>
