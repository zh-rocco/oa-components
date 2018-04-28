---
title: Tab 标签页
---

### 引入

```javascript
import { Tab, TabItem } from './components/oa-tab/index'
```

### API

#### Tab Props

| 属性    | 说明           | 类型   | 默认值       | 备注 |
| ------- | -------------- | ------ | ------------ | ---- |
| v-model | 当前标签页索引 | Number | 无（必传项） |      |

#### Tab Events

##### @change(index)

选中某项事件

| 属性  | 说明           | 类型   |
| ----- | -------------- | ------ |
| index | 当前标签页索引 | Number |

#### TabItem Props

| 属性  | 说明       | 类型   | 默认值       | 备注 |
| ----- | ---------- | ------ | ------------ | ---- |
| title | 标签项内容 | String | 无（必传项） |      |

### 代码示例

```html
<tab v-model="tabsActiveIndex"
      @change="onTabChange">
  <tab-item v-for="(item, index) in tabs"
            :key="'tab-item-' + index"
            :title="item.title"></tab-item>
</tab>
```

```javascript
import { Tab, TabItem } from './components/oa-tab/index'

export default {
  name: 'App',

  components: { Tab, TabItem },

  data() {
    return {
      tabsActiveIndex: 3,
      tabs: [
        { title: '选项 0' },
        { title: '选项 1' },
        { title: '选项 2' },
        { title: '选项 3' }
      ]
    }
  }
}
```
