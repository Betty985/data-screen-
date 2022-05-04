<script setup>
import router from "@/router";
import { ref } from "vue";
import { useContextMenu } from "@/hooks/useContextMenu";
let { onLayerRemove, onLayerTop, onLayerBottom, onLayerup, onLayerdown } =
  useContextMenu();
const activeIndex = ref("1");
const handleSelect = (key) => {
  switch (key) {
    case "2-1":
      onLayerTop();
      break;
    case "2-2":
      onLayerBottom();
      break;
    case "2-3":
      onLayerup();
      break;
    case "2-4":
      onLayerdown();
      break;
    case "2-5":
      onLayerRemove();
      break;
  }
};
</script>

<template>
  <div>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      background-color="#fffbf0"
      active-text-color="#392f41"
      @select="handleSelect"
    >
      <el-menu-item @click="router.push({ path: '/preview' })"
        >预览</el-menu-item
      >
      <el-sub-menu index="2">
        <template #title>工作区</template>
        <el-menu-item index="2-1">置顶</el-menu-item>
        <el-menu-item index="2-2">置底 </el-menu-item>
        <el-menu-item index="2-3">上移</el-menu-item>
        <el-menu-item index="2-4">下移</el-menu-item>
        <el-menu-item index="2-5">删除</el-menu-item>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<style scoped></style>
