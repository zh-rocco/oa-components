<template>
  <div class="drop-menu">
    <ul class="drop-menu-bar">
      <li class="bar-item"
          v-for="(item, index) in menu"
          :key="item.text"
          @click="$_onBarItemClick(index)">
        <span class="bar-content">{{ item.selected }}</span>
      </li>
    </ul>

    <div class="drop-menu-popup"
         :class="{'active': isPopupShow}">
      <transition name="fade">
        <div class="popup-mask"
             v-show="isPopupShow"
             @touchmove.stop
             @click.self="$_closePopup"></div>
      </transition>

      <transition name="slide-down">
        <ul class="popup-items"
            v-show="isPopupShow">
          <li class="popup-item"
              v-for="(item, index) in popupItems"
              :class="{'hairline-bottom': index !== popupItems.length - 1}"
              :key="item.text"
              @touchmove.stop
              @click="$_onPopupItemClick(index)">
            <div class="popup-content"
                 :class="{'active': item.selected}">
              <span>{{ item.text }}</span>
            </div>
          </li>
        </ul>
      </transition>
    </div>

    <slot>
      <div class="drop-menu-content">
        <p>测试文本</p>
      </div>
    </slot>
  </div>
</template>

<script>
export default {
  name: 'drop-menu',

  data() {
    return {
      menu: [
        {
          text: '类型',
          selected: '类型',
          options: [
            { text: '合同审批', selected: false },
            { text: '盖章审批', selected: false },
            { text: '借款审批', selected: false }
          ]
        },
        {
          text: '项目',
          selected: '项目',
          options: [
            { text: '项目1', selected: false },
            { text: '项目2', selected: false },
            { text: '项目3', selected: false }
          ]
        },
        {
          text: '部门',
          selected: '部门',
          options: [
            { text: '部门1', selected: false },
            { text: '部门2', selected: false },
            { text: '部门3', selected: false }
          ]
        }
      ],
      isPopupShow: false,
      isPopupBoxShow: false,
      barIndex: 0
    };
  },

  computed: {
    popupItems() {
      return this.menu[this.barIndex].options || [];
    }
  },

  methods: {
    // MARK: private methods
    $_showPopup() {
      this.isPopupShow = true;
    },
    $_closePopup() {
      this.isPopupShow = false;
      const result = this.menu.map(item => item.selected);
      console.log(JSON.stringify(result));
    },

    // MARK: events handler
    $_onBarItemClick(index) {
      if (this.barIndex === index && this.isPopupShow) {
        this.$_closePopup();
      } else {
        this.barIndex = index;
        this.isPopupShow = true;
      }
    },
    $_onPopupItemClick(index) {
      let currentBar = this.menu[this.barIndex];
      let currentPopup = currentBar.options;

      currentBar.selected = currentPopup[index].text;

      currentPopup.forEach(item => {
        item.selected = false;
      });

      currentPopup[index].selected = true;

      this.$_closePopup();
    }
  }
};
</script>

<style lang="less">
@default-color: #000;
@active-color: #00a2e6;

.drop-menu {
  position: relative;
  padding-top: 40px;
  overflow: hidden;
}

.drop-menu-bar {
  display: flex;
  position: absolute;
  top: 0;
  width: 100%;
  height: 40px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.15);
  z-index: 10;
}

.bar-item {
  display: inline-flex;
  flex: 1;
  justify-content: center;
  margin: 14px 0;
  color: @default-color;
  font-size: 12px;
  line-height: 1;

  &:active,
  &.active {
    color: @active-color;

    .bar-content::after {
      border-top-color: @active-color;
    }
  }
}

.bar-content {
  position: relative;
  padding-right: 10px;

  &::after {
    content: '';
    position: absolute;
    right: 0;
    top: 50%;
    width: 0;
    height: 0;
    transform: translateY(-50%);
    border-top: 3px solid #000;
    // border-bottom: 3px solid transparent;
    border-left: 3px solid transparent;
    border-right: 3px solid transparent;
  }
}

.drop-menu-content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  background-color: #f5f5f5;
}

.drop-menu-popup {
  position: absolute;
  top: 40px;
  bottom: 0;
  width: 100%;
  pointer-events: none;
  overflow: hidden;

  &.active {
    pointer-events: auto;
  }
}

.popup-mask {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
}

.popup-items {
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  max-height: 100%;
  padding: 0 16px;
  background-color: #fff;
  overflow-x: hidden;
  overflow-y: auto;
}

.popup-item {
  position: relative;
  padding: 16px 0;
}

.popup-content {
  position: relative;
  color: @default-color;
  font-size: 12px;
  line-height: 1;

  &:active,
  &.active {
    color: @active-color;
  }

  &.active {
    &::after {
      content: '√';
      position: absolute;
      top: 0;
      right: 0;
      width: 12px;
      height: 12px;
      font-size: inherit;
      color: @active-color;
    }
  }
}
</style>
