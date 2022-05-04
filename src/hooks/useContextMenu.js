import { useDrag } from "@/hooks/useDrag";
import { ElMessage } from "element-plus";
let { content, curCom, findFocus } = useDrag();
export function useContextMenu() {
  // 将列表按z从大到小排列
  function sortList() {
    content.value.sort((a, b) => b.z - a.z);
  }
  // 移除图层
  function onLayerRemove() {
    content.value = content.value.filter((item) => !item.focus);
  }
  //置顶
  function onLayerTop() {
    curCom.value = findFocus();
    let maxZ = Math.max(...content.value.map((item) => item?.z)) || 0;
    curCom.value.z = maxZ + 1;
  }
  // 置底
  function onLayerBottom() {
    curCom.value = findFocus();
    let minZ = Math.min(...content.value.map((item) => item?.z));
    console.log(curCom.value.z, 1);
    curCom.value.z = minZ - 1 < 0 ? 0 : minZ - 1 < 0;
    console.log(curCom.value.z, 2);
  }

  return {
    onLayerRemove,
    onLayerTop,
    onLayerBottom,
  };
}
