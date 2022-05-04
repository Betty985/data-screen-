<script setup>
import router from "@/router";
</script>

<template>
  <div>
    <el-button @click.prevent="router.push({ path: '/preview' })"
      >预览</el-button
    >
  </div>
</template>

<style scoped></style>
