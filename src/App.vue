<script setup>
import componentsList from "@/components/components-list.vue";
// 静态配置
import * as CONFIG from "@/constants/config";
import obj from "@/components";
import { ref, markRaw, inject } from "vue";
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
  comY = e.offsetY;
  curCom = i;
}
// 失去焦点
function unfocuse(cur) {
  // 其他项失去焦点
  content.value = content.value.map((item) => {
    item.focus = item.id === cur.id;
    return item;
  });
}

function onDrop(e, i) {
  let x = e.pageX - comX,
    y = e.pageY - comY;
  Id.value = Id.value + 1;
  let newItem = {
    ...curCom,
    id: Id.value,
    x,
    y,
    component: markRaw(obj[curCom.component]),
    // 新增的面板项层级应该最高
    z: !content.value.length
      ? 0
      : Math.max(...content.value.map((item) => item.z)) + 1,
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
function onLayerTop() {
  const currentItem = content.value.find((item) => item.focused);
  const maxZ = findTopLayerZ(currentItem);
  if (!maxZ) {
    return;
  }
  console.log(currentItem);
  currentItem.z = maxZ + 1;
  sortList();
}
// 找到最顶层的z
function findTopLayerZ(currentItem) {
  console.log(content.value);
  const maxZ = Math.max(...content.value.map((item) => item?.z)) || 0;
  if (currentItem?.z === maxZ) {
    alert("已经是最顶层了");
    return;
  }
  return maxZ;
}
// 将列表按z从大到小排列
function sortList() {
  content.value.sort((a, b) => b.z - a.z);
}
// 移除图层
function onLayerRemove() {
  content.value = content.value.filter((item) => !item.focus);
  sortList();
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
        :w="item.style.width ? 200 : parseInt(item.style.width)"
        :h="item.style.height ? 200 : parseInt(item.style.height)"
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
    <div class="right">2</div>
  </div>
  <!-- 右键菜单 -->
  <context-menu name="context-menu" ref="contextMenu" style="zindex: 9999">
    <context-menu-item @click.prevent="onLayerTop">置顶</context-menu-item>
    <context-menu-item>置底</context-menu-item>
    <context-menu-item>上移图层</context-menu-item>
    <context-menu-item>下移图层</context-menu-item>
    <context-menu-item @click.prevent="onLayerRemove">删除</context-menu-item>
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
