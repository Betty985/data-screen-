<script setup>
import componentsList from "@/components/components-list.vue";
// 静态配置
import * as CONFIG from "@/constants/config";
import { ref } from "vue";
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
function onDrop(e, i) {
  let x = e.clientX - comX,
    y = e.clientY - comY;
  Id = Id.value + 1;
  let newItem = {
    id: Id,
    x,
    y,
    label: curCom.label,
    type: curCom.type,
    focus: true,
  };
  for (let item of content.value) {
    if (item.id != Id.value) {
      item.focus = false;
    }
  }
  content.value.push(newItem);
}
</script>

<template>
  <div id="main">
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
      >
        <h3>{{ item.label }}</h3>
      </Dragger>
    </div>
    <div class="right">2</div>
  </div>
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
