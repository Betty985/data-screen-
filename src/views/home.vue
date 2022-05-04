<script setup>
import componentsList from "@/components/components-list.vue";
// 静态配置
import * as CONFIG from "@/constants/config";
import { ref, markRaw, inject } from "vue";
import { useDrag } from "@/hooks/useDrag";
import { useContextMenu } from "@/hooks/useContextMenu";
import right from "@/components/right/right.vue";
import toolbox from "@/components/toolbox/index.vue";
let { content, unfocuse, onDrag, onDrop } = useDrag();
let { onLayerRemove, onLayerTop, onLayerBottom, onLayerup, onLayerdown } =
  useContextMenu();
// 打开右键菜单
const emitContext = inject("emitContext");
// 打开右键菜单
function onContextMenuOpen(e, i) {
  // 给当前项获取焦点
  i.focus = true;
  // 打开右键菜单
  emitContext(e, { name: "context-menu" });
  // 其他项失去焦点
  unfocuse(i);
}
const siderType = ref("components");
</script>

<template>
  <toolbox></toolbox>
  <div id="main" @contextmenu.prevent>
    <el-tabs v-model="siderType" class="left">
      <el-tab-pane label="图层" name="layer">图层</el-tab-pane>
      <el-tab-pane label="组件" name="components">
        <!-- 组件列表 -->
        <components-list :list="CONFIG.List" @drag="onDrag"></components-list>
      </el-tab-pane>
    </el-tabs>
    <div class="center" @dragover.prevent @drop="onDrop">
      <Dragger
        :isActive="item.focus"
        :w="item.w"
        :h="item.h"
        :x="item.x"
        :y="item.y"
        :z="item.z"
        v-for="(item, index) in content"
        :key="item.id"
        @click="unfocuse(item)"
        @contextmenu.prevent="onContextMenuOpen($event, item)"
      >
        <!-- @drop.native.stop="onDrop($event, index)" -->
        <component
          class="inner-widget"
          :is="item.component"
          :value="item.value"
          :styles="item.style"
          @drop.stop="onDrop($event, index)"
        />
      </Dragger>
    </div>
    <div class="right" @click="unfocuse()"><right /></div>
  </div>
  <!-- 右键菜单 -->
  <context-menu name="context-menu">
    <context-menu-item @click.prevent="onLayerTop">置顶</context-menu-item>
    <context-menu-item @click.prevent="onLayerBottom">置底</context-menu-item>
    <context-menu-item @click.prevent="onLayerup">上移图层</context-menu-item>
    <context-menu-item @click.prevent="onLayerdown">下移图层</context-menu-item>
    <context-menu-item @click.prevent="onLayerRemove">删除</context-menu-item>
  </context-menu>
</template>

<style>
.v-contextmenu {
  z-index: 9999;
}
</style>
<style scoped>
#main {
  display: flex;
  flex-direction: row;
  width: 100vw;
  height: 100vh;
}
.left {
  width: 200px;
  background-color: rgb(209, 250, 228);
}
.center {
  flex: 1;
  background-color: rgb(226, 245, 250);
}
.right {
  width: 200px;
  background-color: rgb(252, 232, 232);
}
</style>
