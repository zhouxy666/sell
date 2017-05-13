<template>
  <div class="goods-wrapper">
    <div class="menu-wrapper" ref="menuScroll">
      <ul>
        <li v-for="(item,index) in goodsData" class="menu-item" :class="{'current':currentIndex === index}" @click="selectMenu(index,$event)">
          <span class="text border-1px">
            <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodScroll">
      <ul>
        <li v-for="good in goodsData" class="food-list" ref="foodList">
          <h1 class="goods-right-category">
            <span class="category-name">{{good.name}}</span>
          </h1>
          <ul>
            <li v-for="food in good.foods" class="food-item border-1px">
              <div class="content-icon">
                <img :src="food.icon" width="60" heigeht="60">
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
            </li>
          </ul>
        </li>
      </ul>
      <!--<template v-for="good in goodsData">-->
        <!--<div>-->
          <!--<h1 class="goods-right-category">-->
            <!--<span class="category-name">{{good.name}}</span>-->
          <!--</h1>-->
          <!--<template v-for="food in good.foods">-->
            <!--<div class="goods-right-content">-->
              <!--<div class="content-icon">-->
                <!--<img :src="food.icon" width="60" heigeht="60">-->
              <!--</div>-->
              <!--<div class="content-details">-->
                <!--<span class="details-name">{{food.name}}</span>-->
                <!--<span class="details-des">{{food.description}}</span>-->
                <!--<span class="details-sell">-->
                  <!--<span class="sell-count">月销售{{goodsData[0].foods[0].sellCount}}份</span>-->
                  <!--<span class="sell-rating">好评率{{goodsData[0].foods[0].rating}}%</span>-->
                <!--</span>-->
                <!--<span class="details-price">￥{{food.price}}</span>-->
              <!--</div>-->
            <!--</div>-->
            <!--<div class="goods-right-line"></div>-->
          <!--</template>-->
        <!--</div>-->
      <!--</template>-->
    </div>
    <shopcart></shopcart>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import shopcart from '@/components/shopcart/shopcart'
  const ERR_OK = 0
  export default {
    data () {
      return {
        goodsData: [],
        listHeight: [],
        scrollY: 0
      }
    },
    computed: {
      currentIndex() {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i]
          let height2 = this.listHeight[i + 1]
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i
          }
        }
        return 0
      }
    },
    created() {
      this.classMap = ['decrease', 'discounte', 'special', 'invoice', 'guarantee']
      this.$http.get('/api/goods').then((res) => {
        if (res.body.errno === ERR_OK) {
          console.log('height', this.$refs['menuScroll'].offsetHeight)
          this.goodsData = res.body.data
          this.$nextTick(() => {
            this._initScroll()
            this._calculateHeight()
          })
        }
      })
    },
    methods: {
      selectMenu(index, event) {
        if (!event._constructed) {
          return
        }
        let el = this.$refs.foodList[index]
        this.foodScroll.scrollToElement(el, 400)
      },
      _initScroll() {
        this.menuScroll = new BScroll(this.$refs.menuScroll, {
          click: true
        })
        this.foodScroll = new BScroll(this.$refs.foodScroll, {
          probeType: 3
        })
        this.foodScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y))
//          console.log('--------------------------')
//          console.log('当前的y值为：' + this.scrollY)
//          console.log('区间为：' + this.listHeight)
        })
      },
      _calculateHeight() {
        let foodList = this.$refs.foodList
        let height = 0
        this.listHeight.push(height)
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i]
          height += item.clientHeight + 18
          this.listHeight.push(height)
        }
      }
    },
    components: {
      shopcart
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixin.styl'
  .goods-wrapper
    display flex
    flex-direction row
    position absolute
    top 174px
    width 100%
    bottom 46px
    overflow hidden
    .menu-wrapper
      flex 0 0 80px
      width 80px
      background #f3f5f7
      touch-action none
      .menu-item
        display table
        height 54px
        width 56px
        padding 0 12px
        line-height 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          font-weight: 700
          .text
            border-none()
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
          border-1px(rgba(7,17,27,.1))
    .foods-wrapper
      flex 1
      touch-action none
      .goods-right-category
        border-left 3px solid #d9dde1
        background #f3f5f7
        padding-left 14px
        height 26px
        span
          font-size 12px
          color rgb(147,153,159)
          line-height 26px
      .food-item
        margin 18px
        padding-bottom 18px
        display flex
        flex-direction row
        border-1px(rgba(7,17,27,.2))
        &:last-child
          border-none()
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
            line-height 14px
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
