<template>
  <!-- 轮播图 -->
  <swiper>
    <swiper-item v-for="items in banners">
      <a :href="items.link">
        <img :src="items.image" alt="" @load="imageLoad" />
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
//导入轮播图
import {Swiper, SwiperItem} from 'components/common/swiper'

export default {
  name: "HomeSwiper",
  components:{
    Swiper, 
    SwiperItem
  },
  props:{
    banners:{
      type:Array,
      default() {
        return []
      }
    }
  },
  methods: {
    imageLoad() {
      this.$emit('swiperImageLoad')
    }
  }
};
</script>

<style>
</style>