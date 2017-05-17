<template>
  <div>
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
              <li v-for="food in good.foods" class="food-item border-1px" @click="selecFood(food,$event)" lid="456">
                <div class="content-icon">
                  <img :src="food.icon" width="60" heigeht="60">
                </div>
                <div class="content-details">
                  <span class="details-name">{{food.name}}</span>
                  <span class="details-des">{{food.description}}</span>
                  <span class="details-sell">
                <span class="sell-count">月销售{{food.sellCount}}份</span><span class="sell-rating">好评率{{food.rating}}%</span>
              </span>
                  <span class="details-price">￥{{food.price}}</span>
                  <div class="cartcontrol-wrapper">
                    <cartcontrol :food="food"></cartcontrol>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <shopcart :deliveryPrice="sellerData.deliveryPrice" :minPrice="sellerData.minPrice" :selectFoods="selectFoods"></shopcart>
    </div>
    <food ref="food" :food="selectedFood"></food>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import shopcart from '@/components/shopcart/shopcart'
  import cartcontrol from '@/components/cartcontrol/cartcontrol'
  import food from '@/components/food/food'

  const ERR_OK = 0
  export default {
    data () {
      return {
        sellerData: {},
        goodsData: [],
        listHeight: [],
        scrollY: 0,
        selectedFood: {}
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
      },
      selectFoods() {
        let selectData = []
        this.goodsData.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) {
              selectData.push(food)
            }
          })
        })
        return selectData
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
      this.$http.get('/api/goods').then((res) => {
        if (res.body.errno === ERR_OK) {
          this.goodsData = res.body.data
          this.$nextTick(() => {
            this._initScroll()
            this._calculateHeight()
          })
        }
      }).then(() => {
        this.$http.get('/api/seller').then((res) => {
          if (res.body.errno === ERR_OK) {
            this.sellerData = res.body.data
          }
        })
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
          click: true,
          probeType: 3
        })
        this.foodScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y))
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
      },
      selecFood(food, event) {
        if (!event._constructed) {
          return
        }
//        console.log(event)
        this.selectedFood = food
        this.$refs.food.show()
      }
    },
    components: {
      shopcart,
      cartcontrol,
      food
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
    font-size rem(12px)
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
            font-size 0
            color rgb(147,153,159)
            line-height 10px
            .sell-count
              font-size 10px
              margin-right 10px
              display inline-block
            .sell-rating
              font-size 10px
              display inline-block
          .details-price
            font-size 14px
            line-height 24px
            font-weight 700
            color #f01414
        .cartcontrol-wrapper
          position absolute
          bottom 10px
          right 0
      .goods-right-line
        height 1px
        background rgba(7,17,27,.1)
        margin 0 18px
        transform scaleY(.3)
</style>
