<template>
  <div class="header-component"> header  </div>
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
}
</style>