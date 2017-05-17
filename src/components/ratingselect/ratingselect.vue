<template>
    <div class="food-rating">
      <div class="rating-title">
        <span>商品评价</span>
      </div>
      <div class="rating-category">
        <ul>
          <li class="cate-item cate-all" :class="{'active':rateType===2}" @click.stop.prevent="selectAll($event)">
            <span class="title title-all">{{des.all}}</span>
            <span class="num num-all">{{Positive.length + Negative.length}}</span>
          </li>
          <li class="cate-item cate-recommend" :class="{'active':rateType===0}" @click.stop.prevent="selectPositive($event)">
            <span class="title title-rec">{{des.positive}}</span>
            <span class="num num-rec">{{Positive.length}}</span>
          </li>
          <li class="cate-item cate-dislike" :class="{'active':rateType===1}" @click.stop.prevent="selectNegative($event)">
            <span class="title title-dis">{{des.negative}}</span>
            <span class="num num-dis">{{Negative.length}}</span>
          </li>
        </ul>
      </div>
      <div class="rating-filter" @click.stop.prevent="showContent($event)">
        <span class="filter-icon icon icon-check-sign" :class="{'active':onlyContent}"></span>
        <span class="filter-content">只看有内容的评价</span>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  const POSITIVE = 0
  const NEGATIVE = 1
  const ALL = 2
  export default {
    props: {
      rateType: {
        type: Number
      },
      onlyContent: {
        type: Boolean
      },
      ratings: {
        type: Array
      },
      des: {
        type: Object
      }
    },
    computed: {
      Positive() {
        if (!this.ratings) {
          return 0
        }
        return this.ratings.filter((rate) => {
          return rate.rateType === POSITIVE
        })
      },
      Negative() {
        if (!this.ratings) {
          return 0
        }
        return this.ratings.filter((rate) => {
          return rate.rateType === NEGATIVE
        })
      }
    },
    methods: {
      selectAll(event) {
        if (!event._constructed) {
          return
        }
        this.$emit('select', ALL)
      },
      selectPositive() {
        if (!event._constructed) {
          return
        }
        this.$emit('select', POSITIVE)
      },
      selectNegative() {
        if (!event._constructed) {
          return
        }
        this.$emit('select', NEGATIVE)
      },
      showContent(event) {
        if (!event._constructed) {
          return
        }
        this.$emit('toggle')
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .food-rating
    font-size 0
    .rating-title
        font-size rem(28)
        font-weight 700
        color #07111B
        line-height rem(28)
      .rating-category
        padding rem(36) 0
        border-1px(rgba(7,17,27,.1))
        .cate-item
          display inline-block
          padding rem(16) rem(24)
          margin-right rem(16)
          .title
            font-size rem(28)
            line-height rem(32)
            margin-right rem(10)
          .num
            font-size rem(20)
          &.cate-all
            background #CCECF8
            color rgb(77,85,93)
          &.cate-recommend
            background #CCECF8
            color rgb(77,85,93)
          &.cate-dislike
            background #E9EBEC
            color rgb(77,85,93)
          &.active
            background #00A0DC
            color #fff
      .rating-filter
        padding rem(24)
        span
          vertical-align top
        & span:nth-of-type(1)
          font-size rem(48)
          color #B7BBBF
          line-height rem(48)
          margin-right rem(8)
          &.active
            color #00A0DC
        & span:nth-of-type(2)
          font-size rem(24)
          line-height rem(48)
</style>
