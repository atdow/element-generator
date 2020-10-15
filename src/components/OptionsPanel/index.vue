<template>
   
  <div class="option-panel"> option-panel  </div>
</template>
 
<script>
export default {
  name: "option-panel",
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
.option-panel {
  width: 250px;
  height: calc(100vh - @header-height);
  border-left: 1px solid #ccc;
  box-sizing: border-box;
  display: flex;
}
</style>