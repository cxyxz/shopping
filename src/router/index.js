import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from '@/router/routes'
import store from '@/store';

Vue.use(VueRouter);


let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;

VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject);
    } else {
        originPush.call(this, location, () => { }, () => { })
    }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originRepalce.call(this, location, resolve, reject);
    } else {
        originReplace.call(this, location, () => { }, () => { })
    }
}



const router = new VueRouter({
    routes,
    scrollBehavior() {
        //滚动行为这个函数,需要有返回值,返回值为一个对象。
        //经常可以设置滚动条x|y位置 [x|y数值的设置一般最小是零]
        return { y: 0 };
    }
})
export default router;
router.beforeEach(async(to, from, next) => {
    let hasToken = store.state.user.token;
    //用户信息
    let hasNickName = store.state.user.userInfo.name;
    if (hasToken) {
        if (to.path == '/login') {
            next('/home');
        } else {
            if (hasNickName) {
                next();
            } else {
                try {
                    await store.dispatch('getUserInfo');
                    next();
                } catch (error) {
                    await store.dispatch('getUserLogout ');
                    next('/login')
                }

            }
        }

    }else{
        let toPath = to.path;
        if (toPath.indexOf('trade') != -1 || toPath.indexOf('pay') != -1 || toPath.indexOf('center') != -1){
            next('/login?redirect='+toPath)
        }
        next()
    }
})