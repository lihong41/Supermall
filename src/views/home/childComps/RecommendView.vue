<template>
  <div class="recommend">
    <div v-for="items in recommends" class="recommend-item">
      <a :href="items.link">
        <img :src="items.image" alt="">
        <div>{{items.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name:'RecommendView',
  props:{
    recommends: {
      type:Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>
  .recommend {
    display: flex;
    width: 100%;
    text-align: center;
    font-size: 12px;
    padding: 15px 0 20px;
    border-bottom: 8px solid #eee;
  }
  .recommend-item {
    flex: 1;
    margin: 0 8px;
  }
  .recommend-item img {
    width: 100%;
    margin-bottom: 10px;
  }
</style>