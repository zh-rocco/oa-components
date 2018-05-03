<template>
  <div class="mf-loading-container">
    <img class="loading"
         src="./loading.gif">
  </div>
</template>
<script>
const COMPONENT_NAME = 'loading'

export default {
  name: COMPONENT_NAME
}
</script>
<style lang="less" scoped>
.mf-loading-container {
  .loading {
    width: 20px;
    height: 20px;
    display: block;
  }
}
</style>
