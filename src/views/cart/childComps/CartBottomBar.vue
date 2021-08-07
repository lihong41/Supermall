<template>
  <div class="bottom-bar">
    <div class="check-content" @click="checkAllClick">
      <check-button class="check-button" :is-checked="isSelectAll"></check-button>
      <span>全选</span>
    </div>
    <div class="total-price">合计：￥{{totalprice}}</div>
    <div class="calcuate" @click="calcClick">去结算{{checkLength}}</div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton";
export default {  
  name: "CartBottomBar",
  components: {
    CheckButton
  },
  methods: {
    checkAllClick() {
      if(this.isSelectAll){
        this.$store.state.cartList.forEach(item => item.checked = false);
      }else{
        this.$store.state.cartList.forEach(item => item.checked = true);
      }
    },
    calcClick() {
      if(!this.$store.state.cartList.find(item => item.checked === true)){
        this.$toast.show('请选择购买的商品',2000)
      }
    }
  },
  computed: {
   totalprice() {
     return this.$store.state.cartList.filter(item => {
       return item.checked
     }).reduce((preValue, item) => {
       return preValue + item.price * item.count
     },0).toFixed(2)
   },
   checkLength() {
     return this.$store.state.cartList.filter(item => item.checked).length
   },
   isSelectAll() {
     return this.$store.state.cartList.every(item => item.checked == true)
   }
  },
};
</script>

<style scoped>
.bottom-bar {
  position: relative;
  display: flex;
  height: 40px;
  line-height: 40px;
  background-color: #eee;
}
.check-content {
  display: flex;
  align-items: center;
  width: 80px;
  margin-left: 10px;
}
.check-button {
  width: 20px;
  height: 20px;
  line-height: 20px;
}
.total-price {
  flex: 1;
}
.calcuate {
  width: 90px;
  background-color: red;
  color: #ffffff;
  text-align: center;
}
</style>