---
title: DropMenu 下拉菜单
---

下拉菜单可用于列表筛选

### 引入

```javascript
import DropMenu from '@/components/drop-menu/index'
```

### API

#### DropMenu Props

| 属性 | 说明   | 类型                        | 默认值 | 备注                                |
| ---- | ------ | --------------------------- | ------ | ----------------------------------- |
| data | 数据源 | Array<{text, options, ...}> | `[]`   | `options`类型为`Array<{text, ...}>` |

#### DropMenu Events

##### @change(barItem)

选中某项事件

| 属性    | 说明       | 类型                     |
| ------- | ---------- | ------------------------ |
| barItem | 菜单项数据 | Array<[text, text, ...]> |

##### @show(barIndex)

下拉菜单展示事件

| 属性     | 说明               | 类型   |
| -------- | ------------------ | ------ |
| barIndex | 当前展示的菜单索引 | Number |

##### @hide(barIndex)

下拉菜单隐藏事件

同 @show(barIndex)

### 代码示例

```html
<drop-menu :data="dropMenu">
  <p>测试文本</p>
</drop-menu>
```

```javascript
import DropMenu from './components/drop-menu/index'

export default {
  name: 'App',

  components: { DropMenu },

  data() {
    return {
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
```
