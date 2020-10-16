<template>
  <div class="components-panel">
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
import {
  getElementAxis,
  getElementWidthAndHeight,
  judgePointInScale,
} from "@/utils/scale";
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
      componentsIndex: 0, // 添加组件的顺序索引
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
    // console.log("workPalceElementAxis:", this.workPalceElementAxis);
    window.onmousemove = function (event) {
      that.mouseAxis = { x: event.clientX, y: event.clientY };
      // 拖拽物料组件时实现拖拽功能
      if (that.moveElement && that.isComponentMousedown) {
        // 输入防抖
        clearTimeout(that.timer);
        that.timer = setTimeout(function () {
          that.materialComponentMove(); // 物料跟随鼠标移动
          if (judgePointInScale(that.mouseAxis, that.workPalceElementAxis)) {
            // console.log(
            //   "that.moveElement",
            //   that.moveElement.getBoundingClientRect()
            // );
            that.$event.emit("materialComponents_moveIn_workPlace", true);
          } else {
            that.$event.emit("materialComponents_moveIn_workPlace", false);
          }
        }, that.materialMoveDebounce);
      }
    };
    window.onmouseup = function () {
      // console.log("onmouseup");
      that.isComponentMousedown = false;
      if (that.moveElement) {
        // 鼠标左键抬起时判断是否在工作区内
        if (judgePointInScale(that.mouseAxis, that.workPalceElementAxis)) {
          let moveElementWidthAndWidth = getElementWidthAndHeight(
            that.moveElement
          );
          that.$event.emit("place_components", {
            index: that.componentsIndex++,
            type: "input",
            target: that.moveElement,
            width: moveElementWidthAndWidth.width,
            height: moveElementWidthAndWidth.height,
            axis: getElementAxis(that.moveElement),
          });
        }
        // 清除物料元素
        try {
          that.mainContent.removeChild(that.moveElement);
        } catch (error) {}
        that.moveElement = null;
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
    // 物料跟随鼠标移动
    materialComponentMove() {
      let moveElementWidth = this.moveElement.getBoundingClientRect().width;
      let moveElementHeight = this.moveElement.getBoundingClientRect().height;
      // transform: translate(112px, 131px)
      let x = this.mouseAxis.x - moveElementWidth / 2 + "px";
      let y =
        this.mouseAxis.y -
        this.moveElement.getBoundingClientRect().height / 2 +
        "px";
      this.moveElement.style.transform = `translate(${x}, ${y})`;
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