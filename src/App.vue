<template>
  <div>
    <v-header></v-header>
    <div>
      <v-tab></v-tab>
      <router-view></router-view>
    </div>
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

<style>

</style>
