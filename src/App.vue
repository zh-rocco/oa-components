<template>
  <div id="app">
    <drop-menu></drop-menu>
  </div>
</template>

<script>
import DropMenu from './components/drop-menu/index';

export default {
  name: 'App',
  components: {
    DropMenu
  }
};
</script>

<style lang="less">
@import './assets/less/index.less';
</style>
