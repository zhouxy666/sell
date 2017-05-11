<template>
  <div>
    <div class="wrapper">
      <v-header></v-header>
      <v-tab></v-tab>
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import header from '@/components/header/header'
  import tab from '@/components/tab/tab'
  export default {
    components: {
      'v-header': header,
      'v-tab': tab
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import url("//unpkg.com/element-ui@1.3.0-beta.3/lib/theme-default/index.css");
</style>
