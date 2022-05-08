import { ref } from "vue";
import { useDrag } from "@/hooks/useDrag";
let { curCom } = useDrag();
let alignOptions = ref([
  "左对齐",
  "右对齐",
  "顶部对齐",
  "底部对齐",
  "垂直居中",
  "水平居中",
]);

export function useStyle() {
  let geometry = ref([
    [
      {
        label: "X",
        key: "x",
      },
      {
        label: "Y",
        key: "y",
      },
    ],
    [
      {
        label: "宽",
        key: "w",
      },
      {
        label: "高",
        key: "h",
      },
    ],
  ]);
  function align(type) {
    switch (type) {
      case "左对齐":
        if (!curCom.value) return;
        curCom.value.x = 0;
        break;
      case "右对齐":
        if (!curCom.value) return;
        break;
      case "顶部对齐":
        if (!curCom.value) return;
        curCom.value.y = 0;
        break;
      case "底部对齐":
        if (!curCom.value) return;
        break;
      case "水平居中":
        if (!curCom.value) return;
        break;
      case "垂直居中":
        if (!curCom.value) return;
        break;
    }
  }
  return {
    alignOptions,
    geometry,
    align,
  };
}
