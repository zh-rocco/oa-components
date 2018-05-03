<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',

  components: {},

  data() {
    return {}
  },

  created() {},

  methods: {}
}
</script>

<style lang="less">
@import './assets/less/index.less';

#app {
  height: 100%;
  background-color: #f5f5f5;
}
</style>
