import { ADD_COUNTER, ADD_TO_CART } from './mutations-types'

export default {
  addCart(context,payload) {
    return new Promise((resolve,reject) => {
      let oldParduct = context.state.cartList.find(item => item.iid === payload.iid)
        if(oldParduct){
          // parduct.count +=1
          context.commit(ADD_COUNTER, oldParduct)
          resolve('商品数量加+1')
        }else{
          context.commit(ADD_TO_CART,payload)
          resolve('添加了新的商品')
        }
    })
  }
}