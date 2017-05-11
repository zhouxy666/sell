<template>
  <div class="amapBox">
    <el-amap vid="amapDemo" :center="center" :zoom="zoom" :touchZoom="touchZoom" :mapStyle="mapStyle" :map-manager="amapManager" :events="events" :plugin="plugin" :isHotspot="isHotspot">
    </el-amap>
  </div>
</template>

<script type="text/ecmascript-6">
  import { AMapManager } from 'vue-amap'
  let amapManager = new AMapManager()
  export default {
    data() {
      return {
        center: [110.967961, 35.03306],
        zoom: 11,
        touchZoom: true,
        mapStyle: 'fresh',
        amapManager: amapManager,
        isHotspot: true,
        events: {
          'click': (e) => {
            console.log(this.amapManager.getMap())
          }
        },
        plugin: ['ToolBar', {
          pName: 'MapType',
          defaultType: 0,
          events: {
            init(o) {
              console.log(o)
            }
          }
        }]
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .amapBox
    height 400px
</style>
