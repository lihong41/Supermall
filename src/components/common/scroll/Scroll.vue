<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import ObserveDom from '@better-scroll/observe-dom'
BScroll.use(ObserveDom)

export default {
  name: 'Scroll',
  props:{
    probeType:{
      type:Number,
      default: 3
    },
    pullUpLoad:{
      type:Boolean,
      default: false
    }
  },
  data(){
    return {
      scroll: null
    }
  },
  mounted() {
    // 创建BScroll对象
      this.scroll = new BScroll(this.$refs.wrapper,{
        observeDOM: true,
        click: true,
        probeType: this.probeType,
        pullUpLoad : true
      })

     // 监听滚动位置
     this.scroll.on('scroll' , (position) => {
      //  console.log(position);
       this.$emit('scroll',position)
     })
     //监听拉到最底部加载数据
     this.scroll.on('pullingUp', () => {
       this.$emit('pullUpLad')
     })
  },
  methods: {
    scrollTo(x,y,time=300) {
      this.scroll && this.scroll.scrollTo(x,y,time)
    }, 
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp()
    },
    refresh() {
      this.scroll && this.scroll.refresh()
    }
  }
}
</script>

<style scoped>

</style>