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
    if (curCom.value.z == 0) {
      ElMessage.error("已经到最底层了~");
      return;
    }
    curCom.value.z = minZ - 1 < 0 ? 0 : minZ - 1;
  }
  // 上移一层
  function onLayerup() {
    curCom.value = findFocus();
    curCom.value.z = curCom.value.z + 1;
  }
  // 下移一层
  function onLayerdown() {
    curCom.value = findFocus();
    if (curCom.value.z == 0) {
      ElMessage.error("已经到最底层了~");
      return;
    }
    curCom.value.z = curCom.value.z - 1 < 0 ? 0 : curCom.value.z - 1;
  }
  return {
    onLayerRemove,
    onLayerTop,
    onLayerBottom,
    onLayerup,
    onLayerdown,
  };
}
