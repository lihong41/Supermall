<template>
  <div>
    <nav-bar>
      <template v-slot:left>
        <div @click="clickBack">
          <img src="~assets/img/common/back.svg" alt="" class="back">
        </div>
      </template>
      <template v-slot:center>
        <div class="title">
          <span v-for="(items,index) in title" class="title-item" @click="DetailBarClick(index)" :class="{'active':currentIndex  ===index}">{{items}}</span>
        </div>
      </template>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

export default {
  name: 'DetailNavBar',
  data() {
    return {
      title:['商品','参数','评论','推荐'],
      currentIndex:0
    }
  },
  components:{
    NavBar
  },
  methods: {
    DetailBarClick(index) {
      this.currentIndex = index
      // console.log(index);
      this.$emit('DetailBarClick',index)
    },
    clickBack (){
      this.$router.back()
    }
  }
}
</script>

<style scoped>
  .title {
    display: flex;
    font-size: 13px;
  }
  .title-item {
    flex: 1;
    height: 40px;
  }
  .active {
    color: var(--color-high-text);
    border-bottom:1px solid var(--color-high-text);
  }
  .back {
    margin-top: 12px;
  }
</style>