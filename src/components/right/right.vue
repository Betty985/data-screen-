<script setup>
import { useDrag } from "@/hooks/useDrag";
let { curCom } = useDrag();
</script>

<template>
  <div>{{ curCom }}</div>
</template>

<style scoped></style>
