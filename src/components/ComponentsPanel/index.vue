<template>
  <div class="components-panel">
    <!-- <vue-draggable-resizable
      :w="100"
      :h="100"
      @dragging="onDrag"
      @resizing="onResize"
      :parent="false"
    >
      <el-input
        v-model="input"
        placeholder="请输入内容"
        class="component-materail"
      ></el-input>
    </vue-draggable-resizable> -->
    <el-input
      v-model="input"
      placeholder="请输入内容"
      class="component-materail"
      @mousemove.native="mousemove"
      @mousedown.native="componentMousedown"
    ></el-input>
  </div>
</template>
 
<script>
import { getElementAxis, judgeInScale } from "@/utils/scale";
export default {
  name: "components-panel",
  props: {},
  data() {
    return {
      input: "",
      isComponentMousedown: false,
      isMouseUp: false,
      mainContent: null,
      moveElement: null,
      workPalceElement: null,
      timer: null,
      mouseAxis: {},
      materialMoveDebounce: 3,
    };
  },
  components: {},
  watch: {},
  computed: {},
  created() {},
  mounted() {
    //console.log("judgeInScale:", getElementAxis);
    let that = this;
    this.workPalceElementAxis = getElementAxis(
      document.querySelector(".work-place")
    );
    // this.getWorkPalceAxis(); // 获取工作区坐标
    console.log("workPalceElementAxis:", this.workPalceElementAxis);
    window.onmousemove = function (event) {
      that.mouseAxis = { x: event.clientX, y: event.clientY };
      // 拖拽物料组件时实现拖拽功能
      if (that.moveElement && that.isComponentMousedown) {
        // 输入防抖
        clearTimeout(that.timer);
        that.timer = setTimeout(function () {
          // let mainContentTopStart = mainContent;
          let moveElementWidth = that.moveElement.getBoundingClientRect().width;
          let moveElementHeight = that.moveElement.getBoundingClientRect()
            .height;
          // transform: translate(112px, 131px)
          let x = event.clientX - moveElementWidth / 2 + "px";
          let y =
            event.clientY -
            that.moveElement.getBoundingClientRect().height / 2 +
            "px";
          that.moveElement.style.transform = `translate(${x}, ${y})`;
        }, that.materialMoveDebounce);
      }
    };
    window.onmouseup = function () {
      // console.log("onmouseup");
      that.isComponentMousedown = false;
      // 鼠标左键抬起时判断是否在工作区内
      if (that.moveElement) {
        if (judgeInScale(that.mouseAxis, that.workPalceElementAxis)) {
          that.$event.emit("place_components", "input");
          // that.mainContent.removeChild(that.moveElement);
          //  console.log(777);
        } else {
          //  that.mainContent.removeChild(that.moveElement);
        }
        try {
          that.mainContent.removeChild(that.moveElement);
        } catch (error) {}
      }
    };

    window.onresize = function () {
      console.log("resize");
      that.workPalceElementAxis = getElementAxis(
        document.querySelector(".work-place")
      );
    };
  },
  beforeDestroy() {
    // 解除事件绑定
    window.onmousemove = null;
    window.onmouseup = null;
    window.onresize = null;
  },
  methods: {
    componentMousedown(e) {
      // console.log("componentMousedown");
      this.isComponentMousedown = true;
      let mainContent = document.querySelector(".main-content");
      this.mainContent = mainContent;

      // 创建需要移动的dom
      let tartElement = e.toElement.cloneNode(true);
      let moveElement = document.createElement("div");

      moveElement.className = "move-element";
      moveElement.appendChild(tartElement);
      mainContent.appendChild(moveElement);
      this.moveElement = moveElement;
      // console.log("this.moveElement:", this.moveElement);
      // 先删除调试用的不要的节点
      setTimeout(() => {
        // mainContent.removeChild(moveElement);
        // moveElement.style.left = "300px";
      }, 1000);
    },
    mousemove() {
      //  console.log("mousemove");
    },
  },
};
</script>
 
<style lang="less" scoped>
@import url("../../style/var.less");
.components-panel {
  width: 250px;
  height: calc(100vh - @header-height);
  border-right: 1px solid #ccc;
  box-sizing: border-box;
  padding: 10px 20px;
}
.component-materail {
  position: relative;
}
.component-materail::after {
  display: block;
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
  left: 0;
  top: 0;
  cursor: pointer;
  // background: red;
}
</style>