<template>
  <div class="oa-tab__item"
       :class="{'oa-tab__item--active': active}"
       @click="$_onClick">

    <div class="oa-tab__text">
      <slot>{{ title }}</slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tab-item',

  props: {
    title: String
  },

  data() {
    return {
      active: false
    }
  },

  beforeCreate() {
    this.$parent.items.push(this)
  },

  destroyed() {
    let items = this.$parent.items
    items.splice(items.indexOf(this), 1)
  },

  methods: {
    // MARK: events handler
    $_onClick() {
      const currentIndex = this.$parent.items.indexOf(this)
      this.$parent.onChange(currentIndex)
    }
  }
}
</script>

<style lang="less">
@r: 3.75vw;
@default-color: #fff;
@active-color: #1e365c;

.oa-tab {
  &__item {
    flex: 1;
    position: relative;
    padding: 13/@r 0;
    color: @default-color;
  }

  &__item:active,
  &__item--active {
    color: @active-color;

    &::after {
      content: '';
      position: absolute;
      left: 50%;
      bottom: 3/@r;
      width: 12/@r;
      height: 2/@r;
      transform: translateX(-50%);
      background-color: currentColor;
    }
  }

  &__text {
    transition: color 0.3s;
  }
}
</style>
