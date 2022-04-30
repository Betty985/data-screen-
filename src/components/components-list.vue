<script setup>
// eslint-disable-next-line no-unused-vars
let props = defineProps({
  list: Array,
});
let emit = defineEmits(["drag"]);
</script>

<template>
  <div>
    <div
      v-for="(item, index) in list"
      :key="index"
      draggable="true"
      class="item"
      @mousedown="
        ($event) => {
          emit('drag', $event, item);
        }
      "
    >
      <el-card shadow="hover"> {{ item.label }}</el-card>
    </div>
  </div>
</template>

<style scoped>
.item {
  margin: 1rem;
}
</style>
