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
        </div>
        <div class="des">
          <span class="decrcontent" @click="testDecs">{{data.description}} / 8分钟送达</span>
        </div>
        <div class="scale">
          <span class="decrease"></span>
          <span class="decrcontent" @click="testScale">{{data.supports[0].description}}</span>
          <div class="decrmore" type="text" @click="showBulletin">
            <span>5个</span>
            <span class="el-icon-arrow-right"></span>
          </div>
        </div>
      </div>
      <div class="tips"></div>
    </div>
    <div class="info">
      <span class="bulletin"></span>
      <span class="bullcontent">{{data.bulletin}}</span>
      <span class="more"><i class="el-icon-arrow-right"></i></span>
    </div>
    <div class="bg">
      <img :src="data.avatar" width="100%" height="100%">
    </div>
    <transition name="fade">
      <div class="detail" v-show="detailShow">
        <div class="detail-wrapper">
          <div class="detail-main clearfix">
            <div class="detail-title">
            <span class="name">
              {{data.name}}
            </span>
            </div>
            <div class="star-wrapper">
              <star :size="48" :score="data.score"></star>
            </div>
            <div class="discount-wrapper">
              <div class="discount-title">
                <div class="dis-line border-1px"></div>
                <div class="dis-info">
                  <span>优惠信息</span>
                </div>
                <div class="dis-line border-1px"></div>
              </div>
              <div class="discount-detail" v-if="data.supports">
                <p v-for="item in data.supports"><span class="dis-icon" :class="classMap[item.type]"></span>{{item.description}}</p>
              </div>
            </div>
            <div class="bulletin-wrapper">
              <div class="bulletin-title">
                <div class="bulletin-line"></div>
                <div class="bulletin-info">
                  <span>商家公告</span>
                </div>
                <div class="bulletin-line"></div>
              </div>
              <div class="bulletin-detail">
                <p>{{data.bulletin}}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="detail-close">
          <i class="el-icon-close" @click="detailClose"></i>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import star from '@/components/star/star'
  const ERR_OK = 0
  export default {
    data() {
      return {
        data: {
          supports: [{
            description: ''
          }]
        },
        detailShow: false,
        classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee']
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
      showBulletin() {
        this.detailShow = true
      },
      detailClose() {
        this.detailShow = false
      }
    },
    components: {
      star
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
  .detail
    position fixed
    top 0
    left 0
    width 100%
    height 100%
    overflow auto
    opacity 1
    background rgba(7,17,27,.8)
    z-index 100
    backdrop-filter blur(10px)
    &.fade-enter-active,&.fade-leave-active
      transition all .3s ease
    &.fade-enter,&.fade-leave-active
      opacity 0
      background rgba(7,17,27,0)
    .detail-wrapper
      min-height 100%
      .detail-main
        margin-top 64px
        padding-bottom 64px
        width 100%
        .detail-title
          text-align center
          .name
            font-size 16px
            font-weight 700
            color #fff
            line-height 16px
        .star-wrapper
          text-align center
          padding 16px 0 28px 0
        .discount-wrapper
          padding 0 36px
          .discount-title
            display flex
            flex-direction row
            align-items center
            .dis-info
              padding 0 12px
              span
                color #fff
            .dis-line
              flex 1
              border-1px(rgba(255,255,255,.2))
          .discount-detail
            padding 24px 0 0 12px
            p
              padding-bottom 12px
              color #fff
              font-size 12px
              font-weight 200
              color #fff
              line-height 12px
              &:last-child
                padding-bottom 0
            .dis-icon
              vertical-align top
              display inline-block
              width 16px
              height 16px
              margin-right 6px
              background-size 16px 16px
              background-repeat no-repeat
              &.decrease
                bg-image('decrease_3')
              &.discount
                bg-image('discount_3')
              &.guarantee
                bg-image('guarantee_3')
              &.invoice
                bg-image('invoice_3')
              &.special
                bg-image('special_3')
        .bulletin-wrapper
          padding 0 36px
          .bulletin-title
            padding 28px 0 24px 0
            display flex
            flex-direction row
            align-items center
            .bulletin-line
              flex 1
              border-1px(rgba(255,255,255,.2))
            .bulletin-info
              padding 0 12px
              color #fff
          .bulletin-detail
            padding 0 12px
            p
              font-size 12px
              font-weight 200
              color #fff
              line-height 24px
    .detail-close
      position relative
      margin -64px auto 0 auto
      width 32px
      height 32px
      font-size 32px
      color rgba(255,255,255,.5)
</style>
