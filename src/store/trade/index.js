import { reqAddressInfo ,reqOrderInfo} from '@/api'
const state = {
    address:[],
    orderInfo: {},
};
const mutations = {
    GETADDRESS(state, address) {
        state.address = address;
    },
    GETORDERINFO(state, orderInfo) {
        state.orderInfo = orderInfo;
    },
};
const actions = {
    async getUserAddress({ commit }) {
        let result = await reqAddressInfo();
        
        if (result.code == 200) {
            commit('GETADDRESS', result.data);
            
            return 'ok'
        } else {
            return Promise.reject(new Error(result.message));
        }
    },
    async  getOrderInfo({ commit, state, dispatch }) {
        let result = await reqOrderInfo();
        
        if (result.code == 200) {
            commit('GETORDERINFO', result.data);
            return 'ok';
        } else {
            return Promise.reject(new Error(result.message));
        }
    },
};
const getters = {

};

export default {
    state,
    mutations,
    actions,
    getters
}