<template>
  <div id="cart">
    <!-- 导航 -->
    <nav-bar class="navBar">
      <template v-slot:center>
        <div>购物车({{cartLength}})</div>
      </template>
    </nav-bar>
    
    <!-- 商品的列表 -->
    <cart-list></cart-list>

    <!-- 底部工具栏 -->
    <cart-bottom-bar class="cartBottomBar"></cart-bottom-bar>
    
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import CartList from './childComps/CartList'
import CartBottomBar from './childComps/CartBottomBar'

import { mapGetters } from 'vuex'

export default {
  name : 'Crat',
  components: {
    NavBar,
    CartList,
    CartBottomBar
  },
  computed: {
    ...mapGetters([
    'cartLength'
    ])
  }
}
</script>

<style scoped>
  #cart{
    position: relative;
    height: 100vh;
  }
  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
    font-weight: 700;
  }

  .cartBottomBar{
    position: absolute;
    left: 0;
    right: 0;
    bottom: 49px;
  }
</style>