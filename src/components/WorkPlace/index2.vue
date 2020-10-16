<template>
  <div class="work-place">
    <vue-draggable-resizable
      :w="300"
      :h="50"
      @dragging="onDrag"
      @resizing="onResize"
      :parent="true"
      class="test-input"
    >
      <el-input placeholder="请输入内容"></el-input>
    </vue-draggable-resizable>
  </div>
</template>
 
<script>
export default {
  name: "work-place",
  props: {},
  data() {
    return {
      // width: 0,
      // height: 0,
      // x: 0,
      // y: 0,
    };
  },
  components: {},
  watch: {},
  computed: {},
  created() {},
  mounted() {
    this.$event.on("place_components", this.receiveComponent);
  },
  beforeDestroy() {
    this.$event.$off("place_components", this.receiveComponent);
  },
  methods: {
    receiveComponent(type) {
      if (type == "input") {
        console.log(7777);
      }
    },
    onResize: function (x, y, width, height) {
      // this.x = x;
      // this.y = y;
      // this.width = width;
      // this.height = height;
    },
    onDrag: function (x, y) {
      // this.x = x;
      // this.y = y;
    },
  },
};
</script>
 
<style lang="less" scoped>
</style>