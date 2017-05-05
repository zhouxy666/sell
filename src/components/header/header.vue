<template>
  <div class="header-wrap">
    <div class="header">
      <div class="icon">
        <img :src="data.avatar">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name" @click="testTitle">{{data.name}}</span>
          <!--<el-button class="name" type="text" @click="testTitle">{{data.name}}</el-button>-->
        </div>
        <div class="des">
          <span class="decrcontent" @click="testDecs">{{data.description}} / 8分钟送达</span>
          <!--<el-button type="text" class="descontent" @click="testDecs">{{data.description}} / 8分钟送达</el-button>-->
        </div>
        <div class="scale">
          <span class="decrease"></span>
          <span class="decrcontent" @click="testScale">{{data.supports[0].description}}</span>
          <!--<el-button type="text" class="decrcontent" @click="testScale">{{data.supports[0].description}}</el-button>-->
          <!--<el-button class="decrmore" type="text" @click="testSupports">-->
            <!--<span>5个</span>-->
            <!--<span>&gt;</span>-->
          <!--</el-button>-->
          <div class="decrmore" type="text" @click="testSupports">
            <span>5个</span>
            <span class="el-icon-arrow-right"></span>
          </div>
        </div>
      </div>
      <div class="tips"></div>
    </div>
    <div class="info">
      <span class="bulletin"></span>
      <!--<img src="./bulletin@3x.png">-->
      <!--<el-button type="text" class="bullcontent" @click="testInfo">{{data.bulletin}}</el-button>-->
      <span class="bullcontent" @click="testInfo">{{data.bulletin}}</span>
      <span class="more"><i class="el-icon-arrow-right"></i></span>
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
    created() {
      this.$http.get('/api/seller').then((res) => {
        if (res.body.errno === ERR_OK) {
          this.data = res.body.data
        }
      })
    },
    methods: {
      testTitle() {
        this.$alert(this.data.name, '商家名称', {
          confirmButtonText: '确定'
        })
      },
      testSupports() {
        this.$alert('5个', '更多优惠', {
          confirmButtonText: '确定'
        })
      },
      testDecs() {
        this.$alert(this.data.description, '物流信息', {
          confirmButtonText: '确定'
        })
      },
      testScale() {
        this.$alert(this.data.supports[0].description, '优惠信息', {
          confirmButtonText: '确定'
        })
      },
      testInfo() {
        this.$alert(this.data.bulletin, '公告', {
          confirmButtonText: '确定'
        })
      }
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
        width 100%
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
            padding 0
        .des
          padding 8px 0 10px 0
          font-size 12px
          color rgb(255,255,255)
          font-weight 200
          line-height 12px
          .descontent
            color: #fff
            padding 0
        .scale
          font-size 10px
          display flex
          align-items center
          position relative
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
            line-height 12px
            color #fff
            padding 0
          .decrmore
            font-size 0
            display block
            position absolute
            top -5px
            right 0
            padding 7px 8px
            color #fff
            font-size 10px
            line-height 12px
            font-weight 200
            background-color rgba(0,0,0,.2)
            border-radius 14px
            span:nth-of-type(1)
              margin-right 4px
    .info
      padding 0 12px
      height 28px
      background rgba(7,17,27,.2)
      display flex
      flex-direction row
      justify-content space-between
      align-items center
      .bulletin
        margin-right 4px
        width 22px
        height 12px
        bg-image('bulletin')
        background-repeat no-repeat
        background-size cover
      .bullcontent
        font-size 10px
        width 300px
        color rgb(255,255,255)
        font-weight 200
        text-overflow ellipsis
        overflow hidden
        margin-right 4px
        white-space nowrap
        padding 0
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
