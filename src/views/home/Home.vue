<template>
  <div id="home">
    <nav-bar class="home-nav"><template v-slot:center><div>购物街</div></template></nav-bar>
    <tab-control
      class="tab-control-copy"
      :title="['流行', '新款', '精选']"
      @tabClick="tabClick" 
      ref="tabControl2" :class="{'tab-control-show':tabIsShow}"></tab-control>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll" @pullUpLad="loadMore" :pull-up-load="true">
      <home-swiper :banners="banners" @swiperImageLoad.once="swiperImageLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control
      :title="['流行', '新款', '精选']"
      @tabClick="tabClick" 
      ref="tabControl"></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
// 导入数据
import { getHomeMultidata, getHomeGoods } from "network/home";
import { debounce } from "common/utils"

// 导入轮播图
import HomeSwiper from "views/home/childComps/HomeSwiper";
// 导入推荐
import RecommendView from "./childComps/RecommendView.vue";
// 导入流行
import FeatureView from "./childComps/FeatureView.vue";

// 导入scroll
import Scroll from 'components/common/scroll/Scroll'
// 导入切换底部
import NavBar from "components/common/navbar/NavBar";
// 导入切换首页
import TabControl from "components/content/tabcontrol/TabControl";
// 导入商品
import GoodsList from "components/content/goods/GoodsList";
// 导入回到顶部
import BackTop from 'components/content/backTop/BackTop'

export default {
  name: "Home",
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: 'pop',
      positionY: null,
      offsetTop: null,
      isTabFixed: false,
      // tabIsShow: true  
    };
  },
  created() {
    // 1.请求多个数据
    this.getHomeMultidata();
    //2.请求post数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
    
  },
  mounted() {
    //监听图片加载完成
    const refresh = debounce(this.$refs.scroll.refresh,200)
    this.$bus.$on('itemImageLoad', () => {
      refresh()
    })
  },
  methods: {
    /**
     * 事件监听相关的方法 
     */
    // 监听点了哪一个分类
    tabClick(index){
      switch(index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      this.$refs.tabControl.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
      if(this.positionY<-this.offsetTop){
        this.$refs.scroll.scrollTo(0,-this.offsetTop)
      }
    },
    // 监听自定义滚动事件
    contentScroll(position){
      // console.log(position);
      this.positionY = position.y
      this.isTabFixed = position.y
    },
    // 监听拖到底部加载
    loadMore(){
      console.log('lll');
      this.getHomeGoods(this.currentType)
    },
    //监听轮播图图片加载完成确定tab-control固定的高度
    swiperImageLoad() {
      console.log(this.$refs.tabControl.$el.offsetTop);
      this.offsetTop = this.$refs.tabControl.$el.offsetTop
    },

    /**
     * 网络请求相关的方法
     */
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    // 获取商品数据
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        // console.log(res);
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
        this.$refs.scroll.finishPullUp()
      });
    },
    //回到首页
    backClick() {
      this.$refs.scroll.scrollTo(0,0,500)
    }
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    },
    isShowBackTop(){
      return this.positionY < -1000
    },
    //判断tab-control是否显现
    tabIsShow(){
      return -[this.positionY] > this.offsetTop 
    }
  },
  activated() {
    this.$refs.scroll.refresh()
  }
};
</script>

<style scoped>
#home {
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 6; */
}
.content {
  /* height: calc(100% - 93px); */
  overflow: hidden;
  position: absolute;
  left: 0;
  right: 0;
  top: 44px;
  bottom: 49px;
  background: #fff;
}
.tab-control-show{
  position: relative;
  background-color: #fff;
  z-index: 9;
}
.tab-control-copy{
  position: absolute;
  top: 43px; 
  right: 0;
  left: 0;
}
</style>