<template>
  <div class="scroll-page">
    <scroll ref="scroll"
            :data="items"
            :options="scrollOptions"
            :listenScroll="true"
            @pulling-down="onPullingDown"
            @pulling-up="onPullingUp"
            @scroll="onScroll">

      <ul>
        <li class="item"
            v-for="(item, index) in items.slice(30)"
            :key="index">{{item}}</li>
      </ul>

      <drop-menu ref="stickyElement"
                 :data="dropMenu"
                 :key="'inner'">
      </drop-menu>

      <ul>
        <li v-for="(item, index) in items"
            :key="index">{{item}}</li>
      </ul>

    </scroll>

    <drop-menu v-if="fixed"
               :fixed="true"
               :data="dropMenu"
               :key="'outer'"></drop-menu>
  </div>
</template>

<script>
import Scroll from '../components/scroll/index'
import DropMenu from '../components/drop-menu-2/index'

export default {
  name: 'oa-scroll',

  components: { Scroll, DropMenu },

  data() {
    return {
      items: [],
      scrollOptions: {
        pullDownRefresh: false,
        pullUpLoad: false,
        click: false,
        stopPropagation: true
      },
      fixed: false,
      _stickyOffsetTop: 0,
      dropMenu: [
        {
          text: '类型',
          options: [
            { text: '合同审批' },
            { text: '盖章审批' },
            { text: '借款审批' }
          ]
        },
        {
          text: '项目',
          options: [
            { text: '项目1' },
            { text: '项目2' },
            { text: '项目3' },
            { text: '项目4' },
            { text: '项目5' },
            { text: '项目6' },
            { text: '项目7' },
            { text: '项目8' },
            { text: '项目9' }
          ]
        },
        {
          text: '部门1',
          options: [{ text: '部门1' }, { text: '部门2' }, { text: '部门3' }]
        }
      ]
    }
  },

  computed: {},

  created() {
    let size = 50

    while (size > 0) {
      this.items.push(`第 ${size} 项`)
      size--
    }
  },

  mounted() {
    this._stickyOffsetTop = this.$refs.stickyElement.$el.offsetTop
  },

  methods: {
    onPullingDown() {
      console.log('onPullingDown')
      setTimeout(() => {
        this.scrollOptions.pullDownRefresh = false
      }, 1000)
    },
    onPullingUp() {
      console.log('onPullingUp')
      setTimeout(() => {
        this.scrollOptions.pullUpLoad = false
      }, 1000)
    },
    onScroll({ y }) {
      const offsetTop = this._stickyOffsetTop
      // console.log(`y: ${-y}, offsetTop: ${offsetTop}`)
      if (-y >= offsetTop) {
        this.fixed = true
      } else {
        this.fixed = false
      }
    }
  }
}
</script>

<style lang="less">
.scroll-page {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.item {
  height: 20px;
  line-height: 20px;
}
</style>
