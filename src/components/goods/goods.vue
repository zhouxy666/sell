<template>
  <div class="goods-wrapper">
    <div class="goods-left">
      <div class="goods-left-title"></div>
      <div class="goods-left-items"></div>
    </div>
    <div class="goods-right">
      <template v-for="good in goodsData">
        <div class="goods-right-category">
          <span class="category-name">{{good.name}}</span>
        </div>
        <template v-for="food in good.foods">
          <div class="goods-right-content">
            <div class="content-icon">
              <img :src="food.icon" style="width:60px;height:60px;">
            </div>
            <div class="content-details">
              <span class="details-name">{{food.name}}</span>
              <span class="details-des">{{food.description}}</span>
              <span class="details-sell">
            <span class="sell-count">月销售{{goodsData[0].foods[0].sellCount}}份</span>
            <span class="sell-rating">好评率{{goodsData[0].foods[0].rating}}%</span>
          </span>
              <span class="details-price">￥{{food.price}}</span>
            </div>
          </div>
          <div class="goods-right-line"></div>
        </template>
      </template>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  const ERR_OK = 0
  export default {
    data () {
      return {
        goodsData: []
      }
    },
    created() {
      this.$http.get('/api/goods').then((res) => {
        if (res.body.errno === ERR_OK) {
          this.goodsData = res.body.data
        }
        console.log(this.goodsData)
      })
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixin.styl'
  .goods-wrapper
    display flex
    flex-direction row
    .goods-left
      width 80px
      height 200px
      background #f3f5f7
    .goods-right
      width auto
      height 300px
      .goods-right-category
        border-left 3px solid #d9dde1
        background #f3f5f7
        padding-left 14px
        height 26px
        span
          font-size 12px
          color rgb(147,153,159)
          line-height 26px
      .goods-right-content
        padding 18px
        display flex
        flex-direction row
        .content-icon
          margin-right 10px
        .content-details
          padding-top 2px
          display flex
          flex-direction column
          .details-name
            font-size 14px
            font-weight 200
            line-height 14px
            color rgb(7,17,27)
          .details-des
            padding 8px 0
            font-size 10px
            color rgb(147,153,159)
            line-height 10px
          .details-sell
            font-size 10px
            color rgb(147,153,159)
            line-height 10px
            .sell-count
              margin-right 12px
          .details-price
            font-size 14px
            line-height 24px
            font-weight 700
            color #f01414
      .goods-right-line
        height 1px
        background rgba(7,17,27,.1)
        margin 0 18px
        transform scaleY(.3)
</style>
