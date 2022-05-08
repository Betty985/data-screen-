<script setup>
import { useDrag } from "@/hooks/useDrag";
import { useStyle } from "@/hooks/useStyleSider";
import item from "./item.vue";
let { curCom } = useDrag();
let { alignOptions, geometry, align } = useStyle();
</script>

<template>
  <div v-if="curCom">
    {{ curCom.label }}
    <item title="几何">
      <el-row v-for="i in geometry" :key="i.key">
        <div>
          <span>{{ i.label + ":" }}</span>
          <component
            :is="i.component"
            type="number"
            class="input Num"
          ></component>
        </div>
      </el-row>
    </item>
    <el-form label-width="120px">
      <el-button @click="$emit('change', current.id, styles)">保存</el-button>
    </el-form>
  </div>
</template>

<style scoped>
:deep(.el-input) {
  width: 4rem;
  height: 2rem;
  margin: 0.3rem;
}
:deep(.el-row) {
  display: flex;
}
</style>
