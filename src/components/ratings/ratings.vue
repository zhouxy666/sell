<template>
  <div>
    <div class="out-wrapper" ref="outWrapper">
      <div>
        <div class="rating-box">
          <div class="rating-score">
            <div class="score">
              <span>{{sellerData.score}}</span>
            </div>
            <div class="des">
              <span>综合评分</span>
            </div>
            <div class="rank">
              <span>高于周边商家{{sellerData.rankRate}}%</span>
            </div>
          </div>
          <div class="rating-category">
            <div class="score-type">
              <span class="name">服务态度</span>
              <star :size="36" :score="sellerData.serviceScore"></star>
              <span class="score">{{sellerData.serviceScore}}</span>
            </div>
            <div class="score-type food-score">
              <span class="name">食材评分</span>
              <star :size="36" :score="sellerData.foodScore"></star>
              <span class="score">{{sellerData.foodScore}}</span>
            </div>
            <div class="time-delivery">
              <span class="name">送达时间</span>
              <span class="time">{{sellerData.deliveryTime}}分钟</span>
            </div>
          </div>
        </div>
        <split></split>
        <div class="select-wrapper">
          <ratingselect
            :ratings="ratingsData"
            :onlyContent="onlyContent"
            :rateType = "rateType"
            @select="selectHandle"
            @toggle="toggleHandle">
          </ratingselect>
        </div>
        <div class="rating-detail">
          <ul>
            <li class="rating-item" v-for="rate in ratingsData" v-show="needShow(rate.rateType,rate.text)">
              <div class="item-head">
                <div class="left">
                  <img class="avater" :src="rate.avatar">
                  <span>{{rate.avater}}</span>
                </div>
                <div class="right">
                  <div class="user-info">
                    <span class="username">{{rate.username}}</span>
                    <span class="ratetime">{{rate.rateTime}}</span>
                  </div>
                  <div class="score">
                    <star :size="24" :score="4.7"></star>
                    <span class="deli-time">{{rate.deliveryTime}}分钟送达</span>
                  </div>
                </div>
              </div>
              <div class="item-content">
                <div class="content">
                  <span>{{rate.text}}</span>
                </div>
                <div class="recommend">
                  <div class="recion">
                    <span class="icon" :class="rateStyle[rate.rateType]"></span>
                  </div>
                  <div class="likedfood">
                    <span v-for="rec in rate.recommend">{{rec}}</span>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import star from '@/components/star/star'
  import split from '@/components/split/split'
  import ratingselect from '@/components/ratingselect/ratingselect'
  import BScroll from 'better-scroll'
  const ERROK = 0
  const ALL = 2
  export default {
    data() {
      return {
        sellerData: {},
        ratingsData: [],
        onlyContent: true,
        rateStyle: ['icon-thumbs-up', 'icon-thumbs-down'],
        rateType: ALL
      }
    },
    methods: {
      selectHandle(type) {
        this.rateType = type
        this.$nextTick(() => {
          this.scroll.refresh()
        })
      },
      toggleHandle() {
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
    created() {
      this.$http.get('/api/seller').then((res) => {
        if (res.body.errno === ERROK) {
          this.sellerData = res.body.data
        }
      }).then(() => {
        this.$http.get('./api/ratings').then((res2) => {
          if (res2.body.errno === ERROK) {
            this.ratingsData = res2.body.data
            this.$nextTick(() => {
              this.scroll = new BScroll(this.$refs.outWrapper, {
                click: true
              })
            })
          }
        })
      })
    },
    components: {
      star,
      split,
      ratingselect
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .out-wrapper
    position absolute
    top rem(348)
    bottom 0
    overflow hidden
    .rating-box
      padding rem(36) 0
      font-size 0
      display flex
      .rating-score
        flex 0 0 rem(275)
        width rem(275)
        border-right 1px solid rgba(7, 17, 27, .1)
        padding rem(12) 0
        .score
          font-size rem(48)
          line-height rem(56)
          color rgb(255, 153, 0)
          text-align center
        .des
          padding rem(12) 0 rem(16) 0
          font-size rem(24)
          color rgb(7, 17, 27)
          line-height rem(24)
          text-align center
        .rank
          font-size rem(20)
          color rgb(7, 17, 27)
          line-height rem(20)
          text-align center
      .rating-category
        flex 1
        padding 0 rem(48)
        .score-type
          .name
            display inline-block
            vertical-align: top
            font-size rem(24)
            line-height rem(36)
            margin-right rem(24)
          .star
            display inline-block
            margin-top rem(2)
            vertical-align: top
            margin-right rem(24)
          .score
            display inline-block
            vertical-align: top
            font-size rem(24)
            line-height rem(36)
          &.food-score
            margin rem(16) 0
        .time-delivery
          line-height rem(36)
          .name
            font-size rem(24)
            color rgb(7,17,27)
            margin-right rem(24)
          .time
            font-size rem(24)
            color rgb(147,153,159)
    .select-wrapper
      padding rem(36) rem(36) 0 rem(36)
      border-1px(rgba(7,17,27,.1))
    .rating-detail
      font-size 0
      padding 0 rem(36)
      .rating-item
        padding rem(36) 0
        border-1px(rgba(7, 17, 27, .1))
        &.last-child
          border-none()
        .item-head
          display flex
          flex-direction row
          .left
            flex 0 0 rem(56)
            height rem(56)
            margin-right rem(24)
            img
              vertical-align top
              width rem(56)
              line-height rem(56)
              border-radius 50%
          .right
            flex 1
            .user-info
              display flex
              flex-direction row
              justify-content space-between
              align-items center
              padding-bottom rem(6)
              .username
                font-size rem(20)
                color rgb(7,17,27)
                line-height rem(24)
                vertical-align top
              .ratetime
                font-size rem(20)
                line-height rem(24)
                font-weight 200
                color rgb(147,153,159)
            .score
              display flex
              flex-direction row
              align-items center
              .star
                margin-right rem(12)
              .deli-time
                font-size rem(20)
                line-height rem(24)
                color rgb(147,153,159)
                font-weight 200
        .item-content
          padding-left rem(80)
          padding-top rem(12)
          .content
            padding-bottom rem(16)
            font-size rem(24)
            color rgb(7,17,27)
            line-height rem(36)
          .recommend
            display flex
            flex-direction row
            align-items flex-start
            .recion
              margin-right rem(16)
              font-size rem(24)
              line-height rem(32)
              span
                &.icon-thumbs-up
                  color #00A0DC
                &.icon-thumbs-down
                  color #B7BBBF
            .likedfood
              span
                display inline-block
                padding 0 rem(12)
                margin-right rem(16)
                margin-bottom rem(10)
                line-height rem(32)
                font-size rem(18)
                color rgb(147,153,159)
                border 1px solid rgba(7,17,27,.1)
                border-radius rem(2)
</style>
