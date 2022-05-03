<script setup>
import { useApp } from "@/hooks/useApp";
let { curCom } = useApp();
</script>

<template>
  <div>{{ curCom }}</div>
</template>

<style scoped></style>
