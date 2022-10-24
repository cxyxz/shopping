import store from '@/store';
import axios from 'axios';
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

const requests = axios.create({
    baseURL:"http://gmall-h5-api.atguigu.cn/api",
    timeout:5555
});
requests.interceptors.request.use((config)=>{
    if(store.state.detail.uuid_token){
        config.headers.userTempId = store.state.detail.uuid_token
        
    }
    if(store.state.user.token){
        config.headers.token = store.state.user.token
        
    }
     nprogress.start();
     return config;

});
requests.interceptors.response.use((res)=>{
    nprogress.done();
    return res.data;
},(error)=>{
    return Promise.reject(new Error('faile'));
});
export default requests;