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
                 :key="'inner'"
                 @change="handleChange">
      </drop-menu>

      <ul>
        <li v-for="(item, index) in items"
            :key="index">{{item}}</li>
      </ul>

    </scroll>

    <drop-menu v-if="fixed"
               :fixed="true"
               :data="dropMenu"
               :key="'outer'"
               @change="handleChange"></drop-menu>
  </div>
</template>

<script>
import Scroll from '../components/scroll/index';
import DropMenu from '../components/drop-menu-2/index';

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
          selected: 1,
          options: [
            { label: '全部类型', value: 0 },
            { label: '合同审批', value: 1 },
            { label: '盖章审批', value: 2 },
            { label: '借款审批', value: 3 }
          ]
        },
        {
          selected: 0,
          options: [
            { label: '全部项目', value: 0 },
            { label: '项目1', value: 1 },
            { label: '项目2', value: 2 },
            { label: '项目3', value: 3 },
            { label: '项目4', value: 4 },
            { label: '项目5', value: 5 },
            { label: '项目6', value: 6 },
            { label: '项目7', value: 7 },
            { label: '项目8', value: 8 },
            { label: '项目9', value: 9 }
          ]
        },
        {
          selected: 1,
          options: [
            { label: '全部部门', value: 0 },
            { label: '部门1', value: 1 },
            { label: '部门2', value: 2 },
            { label: '部门3', value: 3 }
          ]
        }
      ]
    };
  },

  computed: {},

  created() {
    let size = 50;

    while (size > 0) {
      this.items.push(`第 ${size} 项`);
      size--;
    }
  },

  mounted() {
    this._stickyOffsetTop = this.$refs.stickyElement.$el.offsetTop;
  },

  methods: {
    onPullingDown() {
      console.log('onPullingDown');
      setTimeout(() => {
        this.scrollOptions.pullDownRefresh = false;
      }, 1000);
    },
    onPullingUp() {
      console.log('onPullingUp');
      setTimeout(() => {
        this.scrollOptions.pullUpLoad = false;
      }, 1000);
    },
    onScroll({ y }) {
      const offsetTop = this._stickyOffsetTop;
      // console.log(`y: ${-y}, offsetTop: ${offsetTop}`)
      if (-y >= offsetTop) {
        this.fixed = true;
      } else {
        this.fixed = false;
      }
    },

    handleChange(result) {
      console.log(result);
    }
  }
};
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
