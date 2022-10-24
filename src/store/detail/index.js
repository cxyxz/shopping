import { reqGoodsInfo ,reqAddOrUpdateCart} from "@/api"
import {getUUID} from '@/utils/USER_ID'
const state = {
    goodInfo:{},
    uuid_token:getUUID()
}
const mutations = {
    GETGOODSINFO(state,goodInfo){
       
        state.goodInfo = goodInfo
    }
}
const actions= {
    async getGoodInfo({commit},skuId){
        let result = await reqGoodsInfo(skuId)
        if(result.code=200){
            commit('GETGOODSINFO',result.data)
        }
    },
    async addOrUpdateCart({commit},{skuId,skuNum}){
        let result = await reqAddOrUpdateCart(skuId,skuNum)
        
        if(result.code=200){
            return 'ok'
        } else{
            return Promise.reject()
        }
    }
}
const getters = {
    categoryView(state){
      
        return state.goodInfo.categoryView||{}    
    },
    skuInfo(state){
        return state.goodInfo.skuInfo||{}
    },
    spuSaleAttrList() {
        return state.goodInfo.spuSaleAttrList||[]
   }
}
export default{
    state ,
    mutations,
    actions,
    getters
}