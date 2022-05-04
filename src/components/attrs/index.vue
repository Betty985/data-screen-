<script setup>
import { useDrag } from "@/hooks/useDrag";
let { curCom } = useDrag();
</script>

<template>
  <div v-for="item of curCom" :key="item.id">
    {{ item.label }}
  </div>
</template>

<style scoped></style>
