<template>
  <div>
    <div class="box">
      <div class="left"></div>
      <div class="middle"></div>
      <div class="right"></div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .box
    width 100%
    display flex
    .left
      flex 0 0 100px
      width 100px
      height 100px
      background red
    .middle
      flex 0 0 80px
      width 80px
      height 100px
      background yellow
    .right
      flex 1
      height 120px
      background green
</style>
