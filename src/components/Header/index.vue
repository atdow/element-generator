<template>
  <div class="header-component">element-generator  </div>
</template>
 
<script>
export default {
  name: "header",
  props: {},
  data() {
    return {};
  },
  components: {},
  watch: {},
  computed: {},
  created() {},
  mounted() {},
  beforeDestroy() {},
};
</script>
 
<style lang="less" scoped>
@import url("../../style/var.less");
.header-component {
  height: @header-height;
  background: skyblue;
  color: white;
  line-height: @header-height;
  box-sizing: border-box;
  padding-left: 20px;
  font-size: 20px;
}
</style>