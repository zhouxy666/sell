<template>
  <transition name="move">
    <div class="food" v-show="showFlag" ref="food">
      <div class="food-wrapper">
        <div class="food-image">
          <img :src="food.image">
          <div class="back" @click="hideFood">
            <span class="icon icon-angle-left"></span>
          </div>
        </div>
        <div class="food-content">
          <div class="title">
            <span>{{food.name}}</span>
          </div>
          <div class="desc">
            <span class="desc-count">月销售{{food.sellCount}}份</span>
            <span class="desc-rating">好评率{{food.rating}}%</span>
              <div class="shop-wrapper">
                <cartcontrol :food="food" v-show="food.count"></cartcontrol>
              </div>
              <transition name="fade">
                <div class="shopcart" v-show="!food.count||food.count===0" @click.stop.prevent="addFood">
                  <span>加入购物车</span>
                </div>
              </transition>
          </div>
          <div class="price">
            <span class="price-new">￥{{food.price}}</span>
            <span class="price-old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
          </div>
        </div>
        <div class="food-line"></div>
        <div class="food-desc">
          <span class="desc-title">商品介绍</span>
          <span class="desc-content">{{food.info}}</span>
        </div>
        <div class="food-line"></div>
        <div class="rating-wrapper">
          <ratingselect :rateType="rateType" :onlyContent="onlyContent" :ratings="food.ratings" :des="des" @select="selectRating" @toggle="toggleContent"></ratingselect>
        </div>
        <div class="rating-infos">
          <ul>
            <li v-for="rate in food.ratings" class="infos-item" v-show="needShow(rate.rateType, rate.text)">
              <div class="infos-title">
                <div class="info-data">
                  <span class="data"></span>
                  <span class="time">{{rate.rateTime | formatData}}</span>
                </div>
                <div class="info-user">
                  <span class="username">{{rate.username}}</span>
                  <span class="avatar">
                    <img :src="rate.avatar">
                  </span>
                </div>
              </div>
              <div class="infos-content">
                <span class="icon" :class="rateStyle[rate.rateType]"></span>
                <span class="text">{{rate.text}}</span>
              </div>
            </li>
          </ul>
          <div class="no-rating" v-show="!food.ratings||!food.ratings.length">
            <span>暂无评论</span>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import cartcontrol from '@/components/cartcontrol/cartcontrol'
  import ratingselect from '@/components/ratingselect/ratingselect'
  import Vue from 'vue'
  const Util = require('@/common/js/util')

  const ALL = 2
  export default {
    props: {
      food: {
        type: Object
      }
    },
    data() {
      return {
        showFlag: false,
        rateStyle: ['icon-thumbs-up', 'icon-thumbs-down'],
        rateTime: 0,
        rateType: ALL,
        onlyContent: true,
        des: {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        }
      }
    },
    methods: {
      show() {
        this.onlyContent = true
        this.rateType = ALL
        this.showFlag = true
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.food, {
              click: true
            })
          } else {
            this.scroll.refresh()
          }
        })
      },
      hideFood() {
        this.showFlag = false
      },
      addFood() {
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1)
        }
        return
      },
      selectRating(type) {
        this.rateType = type
        this.$nextTick(() => {
          this.scroll.refresh()
        })
      },
      toggleContent() {
        this.onlyContent = !this.onlyContent
        this.$nextTick(() => {
          this.scroll.refresh()
        })
      },
      needShow(type, text) {
        if (this.onlyContent && !text) {
          return false
        }
        if (this.rateType === ALL) {
          return true
        } else {
          return Number(type) === this.rateType
        }
      }
    },
    filters: {
      formatData(time) {
        let resultTime = ''
        resultTime = Util.moment(time).format('YYYY-MM-DD HH:mm:ss')
        return resultTime
      }
    },
    components: {
      cartcontrol,
      ratingselect
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .food
    font-size 0
    position absolute
    top 0
    left 0
    bottom rem(92)
    width 100%
    overflow hidden
    z-index 60
    background #fff
    transform translate3d(0, 0, 0)
    &.move-enter-active,&.move-leave-active
      transition all .3s ease
    &.move-enter,&.move-leave-active
      transform translate3d(100%, 0, 0)
    .food-image
      width 100%
      height rem(750)
      overflow hidden
      position relative
      img
        height rem(750)
        filter brightness(1.1)
      .back
        position absolute
        padding rem(15)
        top rem(20)
        left rem(20)
        color #fff
        font-size rem(50)
    .food-content
      padding rem(36)
      .title
        font-size rem(28)
        font-weight 700
        color #07111B
        line-height rem(28)
      .desc
        padding rem(16) rem(0) rem(36) rem(0)
        font-size rem(20)
        line-height rem(20)
        color #93999F
        position relative
        .desc-count
          margin-right rem(24)
        .shop-wrapper
          position absolute
          top 0
          right 0
        .shopcart
          position absolute
          top 0
          right 0
          text-align center
          padding rem(12) rem(24)
          border-radius rem(24)
          background #00A0DC
          color #fff
          opacity 1
          z-index: 10
          &.fade-enter-active,&.fade-leave-active
            transition all .5s ease
          &.fade-enter,&.fade-leave-active
            opacity 0
            z-index -1
          span
            font-size rem(20)
            line-height rem(24)
      .price
        font-size 0
        .price-new
          margin-right rem(24)
          font-size rem(28)
          font-weight 700
          color #F01414
        .price-old
          font-size rem(20)
          font-weight 700
          color #93999F
          line-height rem(48)
    .food-line
      height rem(32)
      background #f3f5f7
      border-top 1px solid rgba(7,17,27,.1)
      border-bottom 1px solid rgba(7,17,27,.1)
    .food-desc
      font-size 0
      padding rem(36)
      .desc-title
        font-size rem(28)
        font-weight 700
        display block
      .desc-content
        display block
        padding rem(12) rem(16) rem(0) rem(16)
        font-size rem(24)
        font-weight rem(200)
        color #4D555D
        line-height rem(48)
    .rating-wrapper
      padding rem(36) rem(36) rem(0) rem(36)
      border-bottom 1px solid rgba(7,17,27,.1)
    .rating-infos
      font-size 0
      padding 0 rem(36)
      .infos-item
        padding rem(32) 0
        border-1px(rgba(7,17,27,.1))
        &:last-child
          border-none()
        .infos-title
          font-size rem(20)
          line-height rem(24)
          .info-data
              display inline-block
          .info-user
            float right
            display inline-block
            .username
              margin-right rem(12)
              vertical-align top
            .avatar
              vertical-align top
              width rem(24)
              height rem(24)
              img
                border-radius 50%
                width rem(24)
                height rem(24)
        .infos-content
          padding-top rem(12)
          font-size rem(24)
          .icon
            line-height rem(48)
            margin-right rem(8)
            &.icon-thumbs-down
              color rgb(147,153, 159)
            &.icon-thumbs-up
              color rgb(0,160, 220)
          .text
            line-height rem(32)
      .no-rating
        font-size rem(16)
        text-align center
        padding rem(12) 0
</style>
