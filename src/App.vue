<script setup>
import componentsList from "@/components/components-list.vue";
// 静态配置
import * as CONFIG from "@/constants/config";
import { ref, inject } from "vue";
const siderType = ref("components");
// 操作区域的组件
let content = ref([]);
// 组件初始坐标
let comX = 0,
  comY = 0;
// 当前组件
let curCom = null;
// 组件ID
let Id = ref(1);
function drag(e, i) {
  comX = e.offsetX;
  comY = e.offsetX;
  curCom = i;
}
// 失去焦点
function unfocuse(i) {
  // 其他项失去焦点
  for (let item of content.value) {
    if (item.id != i.id) {
      item.focus = false;
    }
  }
}
function onDrop(e, i) {
  let x = e.clientX - comX,
    y = e.clientY - comY;
  Id.value = Id.value + 1;
  let newItem = {
    id: Id.value,
    x,
    y,
    label: curCom.label,
    type: curCom.type,
    focus: true,
  };
  unfocuse(newItem);
  content.value.push(newItem);
}
// 打开右键菜单
const emitContext = inject("emitContext");
function onContextMenuOpen(e, i) {
  // 给当前项获取焦点
  i.focus = true;
  // 打开右键菜单
  emitContext(e, { name: "context-menu" });
  // 其他项失去焦点
  unfocuse(i);
}
</script>

<template>
  <div id="main" @contextmenu.prevent>
    <el-tabs v-model="siderType" class="left">
      <el-tab-pane label="图层" name="layer">图层</el-tab-pane>
      <el-tab-pane label="组件" name="components">
        <!-- 组件列表 -->
        <components-list :list="CONFIG.List" @drag="drag"></components-list>
      </el-tab-pane>
    </el-tabs>
    <div class="center" @dragover.prevent @drop="onDrop">
      <Dragger
        :isActive="item.focus"
        :w="100"
        :h="50"
        :x="item.x"
        :y="item.y"
        v-for="(item, index) in content"
        :key="index"
        @contextmenu.prevent="onContextMenuOpen($event, item)"
      >
        <h3>{{ item.label }}</h3>
      </Dragger>
    </div>
    <div class="right">2</div>
  </div>
  <!-- 右键菜单 -->
  <context-menu name="context-menu" ref="contextMenu">
    <context-menu-item>置顶</context-menu-item>
    <context-menu-item>置底</context-menu-item>
    <context-menu-item>上移图层</context-menu-item>
    <context-menu-item>下移图层</context-menu-item>
    <context-menu-item>删除</context-menu-item>
  </context-menu>
</template>

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
