<template>
  <div class="tab">
    <div class="tab-item">
      <router-link to="/goods">商品</router-link>
    </div>
    <div class="tab-item">
      <router-link to="/ratings">评论</router-link>
    </div>
    <div class="tab-item">
      <router-link to="/seller">商家</router-link>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
  }
</script>

<style scoped>

  .tab{
    display:flex;
    width:100%;
    height:40px;
    line-height:40px;
    position:relative;
  }
  .tab:after{
    position:absolute;
    display:block;
    content:'';
    left:0;
    bottom:0;
    width:100%;
    height:1px;
    background-color:rgba(7,17,27,.1);
    transform: scaleY(.5);
  }
  .tab .tab-item{
    flex:1;
    text-align:center;
  }
  .tab .tab-item> a{
    display:block;
    font-size:14px;
    color:#4d555d;
    font-weight:bold;
  }
  .tab .tab-item> a.tabActive{
    color:rgb(140,20,20);
  }
</style>
