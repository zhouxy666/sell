<template>
    <div class="shopcart">
      <div class="shop-left">
        <div class="logo-wrapper">
          <div class="logo-outer">
            <div class="logo-inner" :class="{'hightlight':totalCount>0}">
              <i class="el-icon-share"></i>
            </div>
          </div>
          <div v-show="isTotalCount" class="num">{{totalCount}}</div>
        </div>
        <div class="price">
          <span class="text" :class="{'hightlight':totalCount>0}">￥{{totalPrice}}</span>
        </div>
        <div class="desc">
          <span>配送费用￥{{deliveryPrice}}元</span>
        </div>
      </div>
      <div class="shop-right" :class="{'paying':isPay}" @click.stop.prevent="gopay">
        <span class="pay">{{payDesc}}</span>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      selectFoods: {
        type: Array,
        default() {
          return []
        }
      },
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      }
    },
    computed: {
      isTotalCount() {
        if (this.totalCount > 0) return true
        return false
      },
      totalCount() {
        let count = 0
        this.selectFoods.forEach((food) => {
          count += food.count
        })
        return count
      },
      totalPrice() {
        let total = 0
        this.selectFoods.forEach((food) => {
          total += food.price * food.count
        })
        return total
      },
      payDesc() {
        let payDiff = Number(this.totalPrice - this.minPrice)
        if (payDiff < 0) return '还差￥' + Math.abs(payDiff) + '元起送'
        if (payDiff >= 0) return '去结算'
      },
      isPay() {
        let payDiff = Number(this.totalPrice - this.minPrice)
        if (payDiff < 0) return false
        if (payDiff >= 0) return true
      }
    },
    methods: {
      gopay() {
        if (Number(this.totalPrice - this.minPrice) >= 0) alert(this.totalPrice)
        return
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .shopcart
    display flex
    flex-direction row
    position fixed
    bottom 0
    left 0
    width 100%
    .shop-left
      flex 1
      background #141d27
      font-size 0
      .logo-wrapper
        display inline-block
        margin 0 12px
        width 56px
        height 46px
        position relative
        vertical-align: top
        .logo-outer
          position absolute
          width 44px
          height 44px
          left 0
          bottom 4px
          padding 6px
          background #141d27
          border-radius 50%
          .logo-inner
            width 44px
            height 44px
            line-height 44px
            text-align center
            font-size 24px
            border-radius 50%
            color rgba(255,255,255,.4)
            background rgba(255,255,255,.2)
            &.hightlight
              background #00A0DC
              color #fff
        .num
          position absolute
          width 20px
          padding 0 6px
          background rgb(240,20,20)
          border-radius 12px
          box-shadow 0 4px 8px 0 rgba(0,0,0,.4)
          left 35px
          top -12px
          font-size 9px
          font-weight 700
          color #fff
          line-height 16px
          text-align center
      .price
        vertical-align: top
        display inline-block
        margin-right 12px
        height 46px
        line-height 46px
        .text
          font-size 16px
          color rgba(255,255,255,.4)
          font-weight 700
          padding 4px 12px 4px 0
          border-right: 1px solid rgba(255, 255, 255, 0.1)
          box-sizing border-box
          &.hightlight
            color #fff
      .desc
        display inline-block
        vertical-align top
        line-height 46px
        font-size 10px
        color rgba(255,255,255,.4)
        font-weight 700
    .shop-right
      flex 0 0 110px
      width 110px
      background #2B333B
      text-align center
      .pay
        height: 48px
        line-height: 48px
        text-align: center
        font-size: 10px
        font-weight: 700
        padding 0 12px
        color rgba(255,255,255,.4)
        &.hightlight
          color #fff
      &.paying
        background green
        .pay
          font-size 14px
          color #fff
</style>
