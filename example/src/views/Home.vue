<template>
  <div class="home">
    <Header />
    <div class="main-content">
      <ComponentsPanel />
      <WorkPlace style="work-place" />
      <OptionsPanel />
    </div>
    <el-button type="primary" v-if="0">主要按钮</el-button>
    <div style="width: 100vw; height: 100vh" v-if="0">
      <vue-draggable-resizable
        :w="100"
        :h="100"
        @dragging="onDrag"
        @resizing="onResize"
        :parent="true"
      >
        <p>drag</p>
      </vue-draggable-resizable>
    </div>
     
  </div>
</template>
 
<script>
import Header from "@/components/Header";
import ComponentsPanel from "@/components/ComponentsPanel";
import WorkPlace from "@/components/WorkPlace";
import OptionsPanel from "@/components/OptionsPanel";
export default {
  name: "home",
  props: {},
  data() {
    return {
      width: 0,
      height: 0,
      x: 0,
      y: 0,
    };
  },
  components: {
    Header,
    ComponentsPanel,
    WorkPlace,
    OptionsPanel,
  },
  watch: {},
  computed: {},
  created() {},
  mounted() {},
  beforeDestroy() {},
  methods: {
    onResize: function (x, y, width, height) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
    },
    onDrag: function (x, y) {
      this.x = x;
      this.y = y;
    },
  },
};
</script>
 
<style lang="less" scoped>
.main-content {
  display: flex;
  .work-place {
    flex: 1;
  }
}
</style>