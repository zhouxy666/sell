<template>
  <div>
    <div class="shop-cart">
      <div class="content">
        <div class="shop-left" @click="foldList">
          <div class="logo-wrapper">
            <div class="logo-outer">
              <div class="logo-inner" :class="{'hightlight':totalCount>0}">
              <span class="icon icon-shopping-cart
"></span>
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
      <transition name="fold">
        <div class="shop-list" v-show="hideList">
          <div class="list-header">
            <span class="cart">购物车</span>
            <span class="clear" @click="clearCart">清空</span>
          </div>
          <div class="list-content" ref="listScroll">
            <ul>
              <li class="list-food" v-for="food in selectFoods">
                <div class="food-left">
                  <span class="name">{{food.name}}</span>
                </div>
                <div class="food-right">
                  <div class="price">
                    <span>￥{{food.price*food.count}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <cartcontrol :food="food"></cartcontrol>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <transition name="fade">
      <div class="list-mask" v-show="hideList" @click="closeList"></div>
    </transition>
  </div>
</template>
<script type="text/ecmascript-6">
  import cartcontrol from '@/components/cartcontrol/cartcontrol'
  import BScroll from 'better-scroll'

  export default {
    data() {
      return {
        isFoldList: false
      }
    },
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
        if (this.totalCount) return true
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
        if (this.totalPrice === 0) return `￥${this.minPrice}元起送`
        if (payDiff < 0) return '还差￥' + Math.abs(payDiff) + '元起送'
        if (payDiff >= 0) return '去结算'
      },
      isPay() {
        let payDiff = Number(this.totalPrice - this.minPrice)
        if (payDiff < 0) return false
        if (payDiff >= 0) return true
      },
      hideList() {
        if (!this.totalCount) {
          this.isFoldList = false
        }
        if (this.isFoldList) {
          this.$nextTick(() => {
            if (!this.scroll) {
              this.scroll = new BScroll(this.$refs.listScroll, {
                click: true
              })
            } else {
              this.scroll.refresh()
            }
          })
        }
        return this.isFoldList
      }
    },
    methods: {
      gopay() {
        if (Number(this.totalPrice - this.minPrice) >= 0) alert(this.totalPrice)
        return
      },
      foldList() {
        if (this.totalCount) this.isFoldList = !this.isFoldList
      },
      closeList() {
        this.isFoldList = false
      },
      clearCart() {
        this.selectFoods.forEach((food) => {
          food.count = 0
        })
      }
    },
    components: {
      cartcontrol
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .shop-cart
    position fixed
    bottom 0
    left 0
    width 100%
    z-index 70
    .content
      display flex
      .shop-left
        flex 1
        background #141d27
        font-size 0
        .logo-wrapper
          display inline-block
          margin 0 12px
          width 56px
          height rem(92)
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
            line-height rem(32)
            text-align center
        .price
          vertical-align: top
          display inline-block
          margin-right 12px
          height rem(92)
          line-height rem(92)
          .text
            font-size rem(32)
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
          line-height rem(92)
          font-size rem(20)
          color rgba(255,255,255,.4)
          font-weight 700
      .shop-right
        flex 0 0 rem(210)
        width rem(210)
        background #2B333B
        text-align center
        .pay
          height rem(96)
          line-height rem(96)
          text-align center
          font-size rem(24)
          font-weight: 700
          padding 0 rem(16)
          color rgba(255,255,255,.4)
          &.hightlight
            color #fff
        &.paying
          background green
          .pay
            font-size 14px
            color #fff
    .shop-list
      position absolute
      top 0
      left 0
      opacity 1
      width 100%
      z-index -1
      transform translate3d(0,-100%,0)
      &.fold-enter-active,&.fold-leave-active
        transition all .3s ease
      &.fold-enter,&.fold-leave-active
        opacity 0
        transform translate3d(0,0,0)
      .list-header
        height 40px
        line-height 40px
        padding 0 18px
        background #F3F5F7
        border-bottom 1px solid rgba(7,17,27,.1)
        .cart
          float left
          font-size 14px
          font-weight 700
          color rgb(7,17,27)
        .clear
          float right
          font-size 12px
          color rgb(0,160,220)
      .list-content
        max-height rem(434)
        overflow hidden
        background #fff
        .list-food
          padding rem(24) rem(36)
          display flex
          flex-direction row
          align-items center
          justify-content space-between
          border-1px(rgba(7,17,27,.1))
          .food-left
            font-size rem(28)
            line-height rem(48)
            color rgb(7,17,27)
          .food-right
            display flex
            flex-direction row
            align-items center
            .price
              margin-right rem(24)
              font-size rem(28)
              font-weight 700
              color rgb(240,20,20)
              line-height rem(48)
  .list-mask
    position fixed
    width 100%
    height 100%
    opacity 1
    background rgba(7,17,27,.6)
    backdrop-filter blur(10px)
    top 0
    left 0
    z-index 40
    &.fade-enter-active,&.fade-leave-active
      transition all .4s
    &.fade-enter,&.fade-leave-active
      opacity 0
      background rgba(7,17,27,0)
</style>
