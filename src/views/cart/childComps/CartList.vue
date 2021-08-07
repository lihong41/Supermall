<template>
  <div class="cartList">
    <scroll class="scroll" ref="scroll">
      <cart-list-item v-for="(items,index) in cartList" :product="items" :key="index"></cart-list-item>
    </scroll>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import Scroll from 'components/common/scroll/Scroll'

import CartListItem from './CartListItem.vue'

export default {
  name: 'CartList',
  components:{
    CartListItem,
    Scroll
  },
  computed: {
    ...mapGetters(['cartList'])
  },
  activated(){
    this.$refs.scroll.refresh()
  }
}
</script>

<style>
  .cart-list{
    position: relative;
    height: 100vh;
  }
  .scroll{
    overflow: hidden;
    position: absolute;
    left: 0;
    right: 0;
    top: 44px;
    bottom:89px;
    background: #fff;
  }
</style>