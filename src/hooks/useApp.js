import { ref } from "vue";
let comX = ref(0),
  comY = ref(0),
  curCom = ref(null),
  // 操作区域的组件
  content = ref([]);
export function useApp() {
  function drag(e, i) {
    comX = e.offsetX;
    comY = e.offsetY;
    curCom.value = i;
  }
  curCom.value = content.value.find((item) => item.focused);
  return {
    curCom,
    content,
    comX,
    comY,
    drag,
  };
}
