<template>
  <div class="drop-menu">
    <ul class="drop-menu__bar">
      <li class="bar-item"
          v-for="(item, index) in data"
          :key="'bar-item-' + index"
          :class="{'active': barIndex === index}"
          @click="$_onBarItemClick(index)">
        <span class="bar-content">{{ item.text }}</span>
      </li>
    </ul>

    <div class="drop-menu__popup"
         :class="{'active': isPopupShow}">
      <transition name="fade">
        <div class="popup-mask"
             v-if="isPopupShow"
             @touchmove.passive.stop
             @click.self="$_closePopup"></div>
      </transition>

      <transition name="slide-down">
        <ul class="popup-items"
            v-if="isPopupShow">
          <li class="popup-item"
              v-for="(item, index) in popupItems"
              :class="{'hairline-bottom': index !== popupItems.length - 1}"
              :key="'popup-item-' + index"
              @touchmove.stop
              @click="$_onPopupItemClick(index)">
            <div class="popup-content"
                 :class="{'active': data[barIndex] && data[barIndex].text === item.text}">
              <span>{{ item.text }}</span>
            </div>
          </li>
        </ul>
      </transition>
    </div>

    <div class="drop-menu__content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'drop-menu',

  props: {
    data: {
      type: Array,
      default() {
        return []
      }
    }
  },

  data() {
    return {
      isPopupShow: false,
      barIndex: null, // 当前 menu-bar 的索引
      popupItems: [] // popup 内展示的列表
    }
  },

  computed: {
    // popupItems() {
    //   return (
    //     (this.data[this.barIndex] && this.data[this.barIndex].options) || []
    //   )
    // }
  },

  watch: {
    barIndex(newVal) {
      if (newVal !== null) {
        this.popupItems =
          (this.data[this.barIndex] && this.data[this.barIndex].options) || []
      }
    }
  },

  methods: {
    // MARK: private methods
    $_showPopup() {
      this.$emit('show', this.barIndex)
      this.isPopupShow = true
    },
    $_closePopup() {
      this.$emit('hide', this.barIndex)
      this.isPopupShow = false
      this.barIndex = null
    },
    $_changeEvent() {
      const result = this.data.map(item => item.text)
      this.$emit('change', result)
      // console.log(JSON.stringify(result))
    },

    // MARK: events handler
    $_onBarItemClick(index) {
      if (this.barIndex === index && this.isPopupShow) {
        this.$_closePopup()
      } else {
        this.barIndex = index
        this.isPopupShow = true
      }
    },
    $_onPopupItemClick(index) {
      let currentBar = this.data[this.barIndex]
      let currentPopup = currentBar.options
      currentBar.text = currentPopup[index].text
      this.$_changeEvent()
      this.$_closePopup()
    }
  }
}
</script>

<style lang="less">
@r: 3.75vw;
@bar-height: 40/@r;
@font-size: 12/@r;
@default-color: #000;
@active-color: #00a2e6;

.drop-menu {
  position: relative;
  padding-top: @bar-height;
  overflow: hidden;
}

.drop-menu__bar {
  display: flex;
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  width: 100%;
  height: @bar-height;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.15);
  background-color: #fff;
  font-size: @font-size;
  line-height: 1;
  user-select: none;

  .bar-item {
    display: inline-flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    color: @default-color;
    transition: color 0.3s;

    &:active,
    &.active {
      color: @active-color;

      .bar-content::after {
        transform: translateY(-50%) rotate(180deg);
      }
    }
  }

  .bar-content {
    position: relative;
    padding-right: 10/@r;

    &::after {
      content: '';
      position: absolute;
      right: 0;
      top: 50%;
      width: 0;
      height: 0;
      transform: translateY(-50%);
      border-top: 3px solid currentColor;
      border-left: 3px solid transparent;
      border-right: 3px solid transparent;
      transition: transform 0.3s;
    }
  }
}

.drop-menu__content {
  position: relative;
}

.drop-menu__popup {
  position: absolute;
  z-index: 1;
  top: @bar-height;
  bottom: 0;
  width: 100%;
  pointer-events: none;
  overflow: hidden;

  &.active {
    pointer-events: auto;
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
    padding: 0 16/@r;
    background-color: #fff;
    line-height: 1;
    overflow-x: hidden;
    overflow-y: auto;
  }

  .popup-item {
    position: relative;
    padding: 16/@r 0;
  }

  .popup-content {
    position: relative;
    color: @default-color;
    font-size: @font-size;

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
        font-size: inherit;
        color: inherit;
      }
    }
  }
}

/* 1px */
.hairline {
  &:before,
  &:after {
    content: normal;
    display: block;
    position: absolute;
    left: 0;
    width: 100%;
    height: 1px; /* no */
    background-color: #d9d9d9;
    transform: scaleY(0.5);
    z-index: 20;
  }

  &:before {
    top: 0;
  }

  &:after {
    bottom: 0;
  }
}

.hairline-top {
  &:extend(.hairline all);

  &:before {
    content: '';
  }
}

.hairline-bottom {
  &:extend(.hairline all);

  &:after {
    content: '';
  }
}

.hairline-left {
  &:extend(.hairline all);

  &:before {
    content: '';
    top: 0;
    width: 1px; /* no */
    height: 100%;
    transform: scaleX(0.5);
  }
}

.hairline-right {
  &:extend(.hairline all);

  &:after {
    content: '';
    top: 0;
    left: auto;
    right: 0;
    width: 1px; /* no */
    height: 100%;
    transform: scaleX(0.5);
  }
}
</style>
