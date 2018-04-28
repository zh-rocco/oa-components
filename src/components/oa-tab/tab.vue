<template>
  <div class="oa-tab">
    <slot></slot>
  </div>
</template>

<script>
import TabItem from './tab-item'

export default {
  name: 'tab',

  model: {
    prop: 'index',
    event: 'change'
  },

  props: {
    index: { type: Number, default: 0 } // 激活的 tab-item 索引
  },

  data() {
    return {
      items: [] // 缓存 tab-item 实例
    }
  },

  watch: {
    items() {
      this.$_setActiveItem()
    },
    index() {
      this.$_setActiveItem()
    }
  },

  methods: {
    $_setActiveItem() {
      // 解决 index 大于 items.length 时报错
      if (this.index > this.items.length - 1) return
      this.items.forEach((item, index) => {
        item.active = index === this.index
      })
    },
    onChange(activeIndex) {
      if (activeIndex !== this.index) {
        this.$emit('change', activeIndex)
      }
    }
  }
}
</script>

<style lang="less">
@r: 3.75vw;

.oa-tab {
  display: flex;
  position: relative;
  font-size: 14/@r;
  color: #fff;
  text-align: center;
  line-height: 1;
  user-select: none;
}
</style>
