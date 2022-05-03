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
  function onLayerTop() {
    curCom.value = findFocus();
    let maxZ = findTopLayerZ(curCom.value);
    if (!maxZ) {
      return;
    }
    curCom.value.z = maxZ + 1;
  }
  // 找到最顶层的z
  function findTopLayerZ(currentItem) {
    const maxZ = Math.max(...content.value.map((item) => item?.z)) || 0;
    if (currentItem?.z === maxZ) {
      ElMessage.error("已经是最顶层了");
      return;
    }
    return maxZ;
  }
  return {
    onLayerRemove,
    onLayerTop,
  };
}
