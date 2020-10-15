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
export default {
  name: "components-panel",
  props: {},
  data() {
    return {
      input: "",
      isComponentMousedown: false,
      isMouseUp: false,
    };
  },
  components: {},
  watch: {},
  computed: {},
  created() {},
  mounted() {
    document.onmousemove = function (event) {
      // console.log(event.offsetX, event.offsetY);
    };
    document.onmouseup = function () {
      console.log("onmouseup");
    };
  },
  beforeDestroy() {},
  methods: {
    componentMousedown(e) {
      console.log("componentMousedown");
      let mainContent = document.querySelector(".main-content");
      // 创建需要移动的dom
      let tartElement = e.toElement.cloneNode(true);
      let moveElement = document.createElement("div");
      moveElement.appendChild(tartElement);
      mainContent.appendChild(moveElement);
      // 先删除调试用的不要的节点
      setTimeout(() => {
        mainContent.removeChild(moveElement);
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