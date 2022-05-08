<script setup>
import { ref } from "vue";
let props = defineProps({
  title: String,
  show: {
    type: Boolean,
    default: false,
  },
});
let state = ref(props.show);
</script>

<template>
  <div class="center" @click="state = !state">
    {{ title }}
    <el-icon><caret-bottom v-if="state" /><caret-top v-else /></el-icon>
  </div>
  <div v-if="state">
    <slot />
  </div>
</template>

<style scoped>
/* .center {
  display: flex;
  justify-content: center;
} */
</style>
