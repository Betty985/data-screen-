<script setup>
import { reactive, ref, watch } from "vue";
import { useElementSize } from "@vueuse/core";
let props = defineProps({
  styles: Object,
});

const options = reactive({
  width: props.styles.width, //播放器高度
  height: props.styles.height, //播放器高度
  color: "#409eff", //主题色
  title: "", //视频名称
  src: "", //视频源
  muted: true, //静音
  webFullScreen: false,
  speedRate: ["0.75", "1.0", "1.25", "1.5", "2.0"], //播放倍速
  autoPlay: false, //自动播放
  loop: false, //循环播放
  mirror: false, //镜像画面
  ligthOff: false, //关灯模式
  volume: 0.3, //默认音量大小
  control: true, //是否显示控制
  controlBtns: [
    "audioTrack",
    "quality",
    "speedRate",
    "volume",
    "setting",
    "pip",
    "pageFullScreen",
    "fullScreen",
  ], //显示所有按钮,
});
// props

let dom = ref();
let { width, height } = useElementSize(dom);

watch(
  () => [width.value, height.value],
  () => {
    options.width = `${width.value}px`;
    options.height = `${height.value}px`;
  }
);
</script>

<template>
  <div ref="dom" class="box">
    <video-play
      v-bind="options"
      poster="https://cdn.jsdelivr.net/gh/xdlumia/files/video-play/ironMan.jpg"
    ></video-play>
  </div>
</template>

<style scoped>
.box {
  width: 100%;
  height: 100%;
}
</style>
