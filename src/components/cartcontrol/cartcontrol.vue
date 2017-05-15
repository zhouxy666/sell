<template>
    <div class="cartcontrol">
      <transition name="move">
        <div class="cart-decrease" v-show="food.count>0" @click="decCount">
        <span class="inner icon  icon-minus-sign
"></span>
        </div>
      </transition>
      <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
      <div class="cart-add">
        <span class="icon icon-plus-sign" @click="addCount"></span>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue'
  export default {
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      addCount(event) {
        if (!event._constructed) {
          return
        }
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1)
        } else {
          this.food.count++
        }
      },
      decCount(event) {
        if (!event._constructed) {
          return
        }
        if (this.food.count) {
          this.food.count--
          return
        }
        return
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .cartcontrol
    font-size 0
    .cart-decrease
      display inline-block
      padding 6px
      vertical-align top
      opacity 1
      transform translate3d(0,0,0)
      transform rotate(0)
      .inner
        display inline-block
        font-size 24px
        line-height 24px
        color #00A0DC
      &.move-enter-active,&.move-leave-active
        transition all .4s ease
      &.move-enter,&.move-leave-active
        opacity 0
        transform translate3d(24px, 0, 0)
        transform rotate(180deg)
    .cart-count
      display inline-block
      width 24px
      line-height 24px
      text-align center
      font-size 12px
      color rgb(147,153,159)
      padding-top 6px
      vertical-align top
    .cart-add
      display inline-block
      padding 6px
      vertical-align top
      font-size 24px
      line-height 24px
      color #00A0DC
</style>
