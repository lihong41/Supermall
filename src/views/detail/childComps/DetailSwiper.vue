<template>
    <swiper class="swiper-item">
      <swiper-item v-for="items in topImages">
        <img class="swiper-img" :src="items" alt="">
      </swiper-item>
    </swiper>
</template>

<script>
import {Swiper, SwiperItem} from 'components/common/swiper'

export default {
  name: 'DetailSwiper',
  props: {
    topImages: {
      type:Array,
      default() {
        return []
      }
    }
  },
  components: {
    Swiper, 
    SwiperItem
  }
}
</script>

<style scoped>
  .swiper-item{
    height: 300px;
    overflow: hidden;
    position: relative;
  }
  .swiper-img{
    position: absolute;
    top: -200px;
  }
</style>