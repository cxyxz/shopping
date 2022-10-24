// import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Detail  from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'

import MyOrder from '@/pages/Center/myOrder';
import GroupOrder from '@/pages/Center/groupOrder';

// const foo = ()=> {
//     return import ('@/pages/Home')
// }

 export default[
    {
        path: '/center',
        component: Center,
        meta: { show: true },
        children:[
            //我的订单
            {
                 path:'myorder',
                 component:MyOrder
            }
            ,
            {
                path:'grouporder',
                component:GroupOrder
            }
            ,
            {
                path:'/center',
                redirect:'/center/myorder'
            }
       ]
    },
    {
        path: '/paysuccess',
        component: PaySuccess,
        meta: { show: true }
    },
    {
        path: '/pay',
        component: Pay,
        meta: { show: true },
        beforeEnter: (to, from, next) => {
            if(from.path=='/trade'){
                next();
            }else{
                next(false);
            }
        }
    },
    {
        path: '/trade',
        component: Trade,
        meta: { show: true },
        beforeEnter: (to, from, next) => {
            if(from.path=='/shopcart'){
                next();
            }else{
                next(false);
            }
        }
    },
    {
        path: '/shopcart',
        component: ShopCart,
        meta: { show: true }
    },
    {
        name:'addcartsuccess',
        path:'/addcartsuccess',
        component: AddCartSuccess,
        //路由元信息,控制当前路由是否需要Footer组件
        meta: { show: true },
    },
    {
        path: '/detail/:skuId?',
        component: Detail,
        meta:{show:true}
    },
    {
        path: '/home',
        component: ()=>import ('@/pages/Home'),
        meta:{show:true}
    },
    {
        name: 'search',
        path: '/search/:keyword?',
        component: Search,
        meta:{show:true}
    },
    
    {
        path: '/login',
        component: Login,
        meta:{show:false}
    },
    {
        path: '/register',
        component: Register,
        meta:{show:false}
    },
    {
        path: '/',
        redirect: '/home'
    }
]