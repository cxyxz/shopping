import {reqCartList,reqDeleteCartById ,reqUpdateChecked} from '@/api'
const state = {
    cartList:[]
};
const mutations = {
    GETCARTLIST(state,cartList){
        state.cartList = cartList
    }
};
const actions = {
    async getCartList({ commit }) {
        let result = await reqCartList();
        if(result.code=200){
            commit('GETCARTLIST',result.data)
        }
     
   },
   async deleteCartById({ commit },skuId) {
    let result = await reqDeleteCartById(skuId);
    
    if(result.code=200){
       return 'ok'
    }else{
        return Promise.reject(new Error('faile'))
    }
},
async getUpdateChecked({ commit },{skuId,isChecked}) {
    let result = await reqUpdateChecked(skuId,isChecked);
   
    if(result.code=200){
       return 'ok'
    }else{
        return Promise.reject(new Error('faile'))
    } 
},
    deleteAllCheckedCart({getters,dispatch}){
        let PromiseAll = [];
     getters.cartList.cartInfoList.forEach(item => {
        
       let promise = item.isChecked==1?dispatch('deleteCartById',item.skuId):''
       PromiseAll.push(promise) 
     });  
   
       return Promise.all(PromiseAll)
  },
    updateAllChecked({state,dispatch},isChecked) {
       
        let PromiseAll = []
        state.cartList[0].cartInfoList.forEach((item)=>{
            let promise = dispatch('getUpdateChecked',{skuId:item.skuId,isChecked})
            PromiseAll.push(promise)
        })
        return Promise.all(PromiseAll)
    }
};
const getters = {
    cartList(state){
        return state.cartList[0]||{}
    },
    
};
export default ({
    state,
    mutations,
    actions,
    getters
})