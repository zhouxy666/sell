<template>
  <div class="header-wrap">
    <div class="header">
      <div class="icon">
        <img :src="data.avatar">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <!--<img src="./brand@2x.png">-->
          <span class="name">{{data.name}}</span>
        </div>
        <div class="des">
          <span class="decrcontent">{{data.description}} / 8分钟送达</span>
        </div>
        <div class="scale">
          <span class="decrease"></span>
          <span class="decrcontent">{{data.supports[0].description}}</span>
        </div>
      </div>
      <div class="tips"></div>
    </div>
    <div class="info">
      <span class="icon">
        <img src="./bulletin@3x.png">
      </span>
      <span class="name">{{data.bulletin}}</span>
      <span class="more">&gt;</span>
      <!---->
    </div>
    <div class="bg">
      <img :src="data.avatar" width="100%" height="100%">
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  const ERR_OK = 0
  export default {
    data() {
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
        if (res.body.errno === ERR_OK) {
          this.data = res.body.data
        }
      })
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixin.styl'
  .header-wrap
    position relative
    background rgba(7,17,27,.5)
    .header
      padding 24px 12px 18px 24px
      font-size 0
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
        .title
          display flex
          align-items center
          .brand
            margin-right 6px
            width 30px
            height 18px
            bg-image('brand')
            background-repeat no-repeat
            background-size cover
            vertical-align middle
          .name
            font-size 16px
            color rgb(255,255,255)
            font-weight bold
            line-height 18px
        .des
          padding 8px 0 10px 0
          font-size 12px
          color rgb(255,255,255)
          font-weight 200
          line-height 12px
        .scale
          font-size 10px
          display flex
          align-items center
          .decrease
            margin-right 4px
            width 16px
            height 16px
            bg-image('decrease_2')
            background-size cover
            background-repeat no-repeat
            vertical-align middle
          .decrcontent
            font-size 10px
            font-weight 200
            color rgb(255,255,255)
            line-height 12px
    .info
      padding 0 12px
      height 28px
      line-height 28px
      background rgba(7,17,27,.2)
      display flex
      flex-direction row
      justify-content space-between
      font-size 0
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
        text-overflow ellipsis
        overflow hidden
        margin-right 4px
        white-space nowrap
      .more
        font-size 10px
        width 22px
        color #fff
    .bg
      position absolute
      top 0
      left 0
      width 100%
      height 100%
      z-index -1
      filter blur(5px)
      overflow hidden
</style>
