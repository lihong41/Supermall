<template>
  <div id="detail">
    <detail-nav-bar @DetailBarClick="DetailBarClick" ref="nav"></detail-nav-bar>  
    <scroll class="content" ref="scroll" @scroll="scroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods-info="goods"></detail-base-info>
      <detail-shop-info :shop-info="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info :goods-param="paramInfo" ref="param"></detail-param-info>
      <detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
      <goods-list :goods="recommends" ref="recommend"></goods-list>
    </scroll>  
    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import { getDetail, Goods, ShopInfo, GoodsParam, getRecommend } from 'network/detail'

// 导入导航条
import DetailNavBar from './childComps/DetailNavBar.vue'
// 导入better-scroll
import Scroll from 'components/common/scroll/Scroll'
// 导入回到顶部
import BackTop from 'components/content/backTop/BackTop'

// 导入组件
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailBottomBar from './childComps/DetailBottomBar'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import GoodsList from 'components/content/goods/GoodsList'

export default {
  name: 'Detail',
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      positionY: null,
      themeTopYs: [],
      currentIndex: 0,
    }
  },
  components:{
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailBottomBar,
    DetailCommentInfo,
    GoodsList,
    BackTop,
    Scroll,
  },
  created() {
    // 1. 保存传入的iid
    this.iid = this.$route.params.iid

    // 2.根据iid请求详细数据
    getDetail(this.iid).then(res => {
      const data =res.result
      this.topImages = data.itemInfo.topImages

      // 3.获取商品全部信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

      // 4.获取店铺信息
      this.shop = new ShopInfo(data.shopInfo)

      // 5.获取商品详细信息
      this.detailInfo = data.detailInfo

      //6.保存参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

      // 7.取出评论信息
      if(data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0]
      }
    })
    // 2.请求推荐数据
    getRecommend().then(res => {
      this.recommends = res.data.list
    })
  },
  mounted() {
    
  },
  methods: {
    //监听滚动的位置 实现滑动自动切换tab
    scroll(position) {
      this.positionY = -position.y
      for(let i in this.themeTopYs){
        let y = parseInt(i)
        if(this.currentIndex !== y && ((this.positionY>=this.themeTopYs[y] || y == 0) && (this.positionY<this.themeTopYs[y+1] || y == this.themeTopYs.length-1))){
          this.currentIndex = y
          this.$refs.nav.currentIndex = this.currentIndex
          // console.log(y);
        }
      }
    },
    // 等图片加载完之后
    imageLoad() {
      // 获取主题组件距离顶部的高度
      this.themeTopYs = []
      // console.log(this.$refs.param.$el.offsetTop);
      this.themeTopYs.push(0)
      this.themeTopYs.push(this.$refs.param.$el.offsetTop)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
    },
    // 点击回到顶部
    backClick() {
      this.$refs.scroll.scrollTo(0,0)
    },
    DetailBarClick(index) {
      console.log(index);
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index])
    },
    
    // 监听点击购物车
    addToCart() {
      // 1.获取购物车需要展示的信息
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.realPrice
      product.iid = this.iid
      product.count = 1

      // 2.添加到购物车里
      // this.$store.commit('addCart',product)
      this.$store.dispatch('addCart',product).then(res => {
        // this.show = true
        // this.message = res
        // setTimeout(() => {
        //   this.show = false
        //   this.message = ''
        // },1500)
        this.$toast.show(res);
      })
    }
  },
  computed: {
    // 判断返回顶部是否隐藏
    isShowBackTop() {
      return this.positionY > 1000 
    },
  }
}
</script>

<style scoped>
  #detail {
    height: 100vh;
    position: relative;
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .content {
  /* height: calc(100% - 93px); */
  overflow: hidden;
  position: absolute;
  left: 0;
  right: 0;
  top: 44px;
  bottom: 58px;
  background: #fff;
} 
</style>