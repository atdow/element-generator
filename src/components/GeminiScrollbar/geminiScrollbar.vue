<template>
  <div ref="geminiScrollbar" class="my-geminiScrollbar">
    <div class="gm-scrollbar -vertical">
      <div class="thumb"></div>
    </div>
    <div class="gm-scrollbar -horizontal">
      <div class="thumb"></div>
    </div>
    <div class="gm-scroll-view">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import GeminiScrollbar from 'gemini-scrollbar'
import 'gemini-scrollbar/gemini-scrollbar.css'
export default {
  name: 'GeminiScrollbar',
  props: {
    autoCreate: {
      type: Boolean,
      default: true,
    },
    autoshow: {
      type: Boolean,
      default: false,
    },
    forceGemini: {
      type: Boolean,
      default: false,
    },
    minThumbSize: {
      type: Number,
      default: 20,
    },
  },
  data() {
    return {
      geminiScrollbar: null,
    }
  },
  mounted() {
    this.geminiScrollbar = new GeminiScrollbar({
      element: this.$refs.geminiScrollbar,
      createElements: false,
      onResize: () => {
        this.$emit('resize')
      },
      ...this.$props,
    })
    if (this.autoCreate && this.geminiScrollbar) {
      this.geminiScrollbar.create()
    }
    this.$emit('ready', this.geminiScrollbar)
  },
  updated() {
    if (this.geminiScrollbar) {
      this.geminiScrollbar.update()
    }
  },
  beforeDestroy() {
    if (this.geminiScrollbar) {
      this.geminiScrollbar.destroy()
    }
    this.geminiScrollbar = null
  },
}
</script>