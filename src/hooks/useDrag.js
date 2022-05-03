import { ref, markRaw } from "vue";
// 所有组件
import obj from "@/components";
let comX = ref(0),
  comY = ref(0),
  curCom = ref(null),
  // 操作区域的组件
  content = ref([]),
  // 组件ID
  Id = ref(1);

export function useDrag() {
  // 失去焦点
  function unfocuse(cur) {
    // 其他项失去焦点
    content.value = content.value.map((item) => {
      item.focus = item.id === cur.id;
      return item;
    });
  }
  function onDrag(e, i) {
    comX.value = e.offsetX;
    comY.value = e.offsetY;
    curCom.value = i;
  }
  function onDrop(e, i) {
    let x = e.pageX - comX.value,
      y = e.pageY - comY.value;

    Id.value = Id.value + 1;
    let newItem = {
      ...curCom.value,
      id: Id.value,
      x,
      y,
      component: markRaw(obj[curCom.value.component]),
      // 新增的面板项层级应该最高
      z: !content.value.length
        ? 0
        : Math.max(...content.value.map((item) => item.z)) + 1,
      focus: true,
    };
    unfocuse(newItem);
    content.value.push(newItem);
  }
  function findFocus() {
    return content.value.find((item) => item.focus);
  }

  return {
    curCom,
    content,
    comX,
    comY,
    findFocus,
    unfocuse,
    onDrag,
    onDrop,
  };
}
