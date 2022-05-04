<script setup>
import preView from "@/components/preview/index.vue";
import { useDrag } from "@/hooks/useDrag";
// 操作区域的组件
let { content } = useDrag();
</script>

<template>
  <div>
    <pre-view
      v-for="item in content"
      :key="item.id"
      :w="item.w"
      :h="item.h"
      :x="item.x"
      :y="item.y"
      :z="item.z"
      ><component
        :is="item.component"
        :value="item.value"
        :styles="item.style"
      />
    </pre-view>
  </div>
</template>

<style scoped></style>
