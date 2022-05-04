<script setup>
import preView from "@/components/preview/index.vue";
import { useDrag } from "@/hooks/useDrag";
// 操作区域的组件
let { content } = useDrag();
</script>

<template>
  <div class="container">
    <pre-view
      v-for="item in content"
      :key="item.id"
      :w="item.w"
      :h="item.h"
      :x="item.x"
      :y="item.y"
      :z="item.z"
    >
      <component
        :is="item.component"
        :value="item.value"
        :styles="item.style"
      />
    </pre-view>
  </div>
</template>

<style scoped>
.container {
  position: relative;
  height: 100%;
  width: 100%;
  background: url("https://th.bing.com/th/id/OIP.I_uvScRFnaTepA9OOcNf3gHaEK?pid=ImgDet&rs=1")
    no-repeat left top;
  background-size: cover;
}
</style>
