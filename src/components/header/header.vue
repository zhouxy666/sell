<template>
  <div class="topbox">
    <div class="header">
      <div class="icon">
        <img :src="data.avatar">
      </div>
      <div class="content">
        <div class="title">
        <span class="logo">
          <img src="./brand@2x.png">
        </span>
          <span class="name">{{data.name}}</span>
        </div>
        <div class="des">
          <span>{{data.description}} / 8分钟送达</span>
        </div>
        <div class="scale">
          <img src="./decrease_2@3x.png">
          <span>{{data.supports[0].description}}</span>
        </div>
      </div>
      <div class="tips"></div>
    </div>
    <div class="info">
      <span class="icon">
        <img src="./bulletin@3x.png">
      </span>
      <span class="name">{{data.bulletin}}</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        data: {
          supports: [{
            description: ''
          }]
        }
      }
    },
    computed () {
      return {
      }
    },
    created () {
      this.$http.get('/api/seller').then((res) => {
        if (res.body.errno === 0) {
          this.data = res.body.data
        }
      })
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .topbox
    width 100%
    .header
      width 100%
      padding 24px 12px 18px 24px
      background-color rgba(7,17,27,.5)
      display flex
      .icon
        width 64px
        height 64px
        margin-right 16px
        img
          width 64px
          height 64px
          border-radius 4px
      .content
        display flex
        flex-direction column
        padding 4px 0
        .title
          display flex
          align-items center
          .logo
            margin-right 6px
            img
              vertical-align middle
              height 18px
          .name
            font-size 16px
            color rgb(255,255,255)
            font-weight bold
            line-height 18px

        .des
          padding 4px 0 4px 0
          font-size 12px
          color rgb(255,255,255)
          font-weight 200
        .scale
          img
            margin-right 4px
            height 12px
            vertical-align middle
          span
            font-size 10px
            font-weight bold
            color rgb(255,255,255)
            line-height 12px
    .info
      padding 0 12px
      height 28px
      line-height 28px
      background rgba(7,17,27,.2)
      display flex
      flex-direction row
      .icon
        margin-right 4px
        img
          height 12px
          vertical-align middle
          margin-bottom 3px
      .name
        font-size 10px
        color rgb(255,255,255)
        font-weight 200
</style>
