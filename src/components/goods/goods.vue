<template>
  <div class="goods-wrapper">
    <div class="menu-wrapper">
      <!--<template v-for="(item,index) in goodsData">-->
        <!--<div class="goods-left-wrapper" :id="index" @click="getCateIndex(index)" :style="cateIndex==index?bgStyle:''">-->
          <!--<div class="goods-left-category">-->
            <!--<div class="cate-name">-->
              <!--<span :class="item.type==2?'cateIcon':''"></span>-->
              <!--<span :style="cateIndex==index?colorStyle:''">{{item.name}}</span>-->
            <!--</div>-->
          <!--</div>-->
          <!--<div class="goods-left-line"></div>-->
        <!--</div>-->
      <!--</template>-->
      <ul>
        <li v-for="item in goodsData" class="menu-item border-1px">
          <span class="text">
            <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="goods-right">
      <template v-for="good in goodsData">
        <h1 class="goods-right-category">
          <span class="category-name">{{good.name}}</span>
        </h1>
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
//        cateIndex: 0,
//        bgStyle: {
//          background: '#fff'
//        },
//        colorStyle: {
//          color: '#f01414',
//          fontWeight: '200'
//        }
      }
    },
    created() {
      this.classMap = ['decrease', 'discounte', 'special', 'invoice', 'guarantee']
      this.$http.get('/api/goods').then((res) => {
        if (res.body.errno === ERR_OK) {
          this.goodsData = res.body.data
        }
      })
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixin.styl'
  .goods-wrapper
    display flex
    flex-direction row
    .menu-wrapper
      flex 0 0 80px
      width 80px
      background #f3f5f7
      .menu-item
        display table
        height 54px
        width 56px
        padding 0 12px
        line-height 14px
        border-1px(red)
        .icon
          display inline-block
          vertical-align top
          width 12px
          height 12px
          margin-right 2px
          background-size 12px 12px
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
        .text
          display table-cell
          font-size 12px
          width 56px
          vertical-align middle

      /*
      .goods-left-wrapper
        background #f3f5f7
        .goods-left-category
          width 80px
          padding 21px 12px
          .cate-name
            color #07111B
            line-height 14px
            font-weight 200
            font-size 12px
            .cateIcon
              display inline-block
              width 12px
              height 12px
              bg-image('special_3')
              background-size cover
              background-repeat no-repeat
              vertical-align middle
              margin-bottom 3px
        .goods-left-line
          height 1px
          background rgb(7,17,27,.2)
          transform scaleY(.2)
          margin 0 12px
      */
    .goods-right
      width 100%
      background #fff
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
