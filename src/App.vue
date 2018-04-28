<template>
  <div id="app">
    <tab v-model="tabsActiveIndex"
         @change="onTabChange">
      <tab-item v-for="(item, index) in tabs"
                :key="'tab-item-' + index"
                :title="item.title"></tab-item>
    </tab>

    <drop-menu style="margin-top: 10px;"
               :data="dropMenu">
      <p>测试文本</p>
    </drop-menu>
  </div>
</template>

<script>
import DropMenu from './components/drop-menu/index'
import { Tab, TabItem } from './components/oa-tab/index'

export default {
  name: 'App',

  components: { DropMenu, Tab, TabItem },

  data() {
    return {
      tabsActiveIndex: 3,
      tabs: [
        { title: '选项 0' },
        { title: '选项 1' },
        { title: '选项 2' },
        { title: '选项 3' }
      ],
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

  created() {
    // this.tabsActiveIndex = 0
  },

  methods: {
    onTabChange() {
      console.log('tabsActiveIndex change:', this.tabsActiveIndex)
    }
  }
}
</script>

<style lang="less">
@import './assets/less/index.less';

#app {
  height: 100%;
  background-color: #f5f5f5;
}

.oa-tab {
  background-image: linear-gradient(-139deg, #98e9ff 0%, #036edf 100%);
}

.drop-menu__content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  background-color: #fff;
}
</style>
