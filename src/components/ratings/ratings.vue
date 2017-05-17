<template>
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
      <ratingselect></ratingselect>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import star from '@/components/star/star'
  import split from '@/components/split/split'
  import ratingselect from '@/components/ratingselect/ratingselect'
  const ERROK = 0
  export default {
    data() {
      return {
        sellerData: {}
      }
    },
    created() {
      this.$http.get('/api/seller').then((res) => {
        if (res.body.errno === ERROK) {
          this.sellerData = res.body.data
        }
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
</style>
