<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body"  v-for="(cart) in cartInfoList"
          :key="cart.id">
        <ul class="cart-list">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked="cart.isChecked" @click="UpdateChecked(cart, $event)">
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl">
            <div class="item-msg">{{ cart.skuName }}</div>
          </li>
          <li class="cart-list-con3">
            <div class="item-txt">语音升级款</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ cart.skuPrice }}.00</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="minusSkuNum(cart)">-</a>
            <input autocomplete="off" type="text" minnum="1" class="itxt" :value="cart.skuNum" @input="changeSkuNum(cart, $event)">
            <a href="javascript:void(0)" class="plus" @click="addSkuNum(cart)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cart.skuNum * cart.skuPrice }}</span>
          </li>
          <li class="cart-list-con7">
            <a  class="sindelet" @click="deleteCartById(cart)">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul>

       
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="isAllChecked&&cartInfoList.length>0" @click="updateAllChecked($event)">
        <span >全选</span>
      </div>
      <div class="option">
        <a href="#none" @click="deleteAllCheckedCart($event)">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>0</span>件商品</div>
        <div class="sumprice">
          <em>{{totalPrice}}（不含运费） ：</em>
          <i class="summoney">{{totalPrice}}</i>
        </div>
        <div class="sumbtn">
          <!-- <a class="sum-btn"  target="_blank" @click="$router.push('/trade')">结算</a> -->
          <router-link class="sum-btn" to="/trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import debounce from "lodash/debounce";
import throttle from "lodash/throttle";
import { mapGetters } from "vuex";
  export default {
    name: 'ShopCart',
     mounted() {
    //获取购物车的数据
    this.getData();
  },
  computed: {
    ...mapGetters(["cartList"]),
    //购物车的数据
    cartInfoList() {
      return this.cartList.cartInfoList || [];
    },
    //购物车商品总价
    totalPrice() {
      return this.cartInfoList
        .filter((item) => item.isChecked === 1)
        .reduce((pre, item) => pre + item.skuPrice * item.skuNum, 0)
        .toFixed(2);
    },
    isAllChecked(){
      if (this.cartInfoList.length === 0) {
        return false;
      }
      return this.cartInfoList.every((item) => item.isChecked === 1)
    },
  },
  methods:{
    getData() {
      this.$store.dispatch("getCartList");
    },
  async addSkuNum(cart){
     let params = {skuId:cart.skuId,skuNum:1}  
     try {
      await this.$store.dispatch('addOrUpdateCart',params)
      this.getData()
     } catch (error) {
      alert("修改数量失败");
     }
    },
    minusSkuNum:throttle(async function(cart){
      let params = {skuId:cart.skuId,skuNum:-1} ; 
      if(cart.skuNum>1){
    try {
      await this.$store.dispatch('addOrUpdateCart',params);
      this.getData();
     } catch (error) {
      alert("修改数量失败");
     }
    }  
    },1000),
    changeSkuNum:debounce(async function(cart,e){
      let params = {skuId:cart.skuId} ;
      let userValue = e.target.value*1
      if(isNaN(userValue)||userValue<0){
        params.skuNum = 0
      }else{
        params.skuNum = parseInt(userValue) - cart.skuNum
      }
      try {
      await this.$store.dispatch('addOrUpdateCart',params);
      this.getData();
     } catch (error) {
      alert("修改数量失败");
     }
    },500),
    async deleteCartById(cart) {
      //整理参数
      let skuId = cart.skuId;
      try {
        //删除商品成功
        await this.$store.dispatch("deleteCartById", skuId);
        //再次获取购物车最新的数据
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    },
    async UpdateChecked(cart, e){
      let isChecked = e.target.checked?'1':'0'
      try {
        await this.$store.dispatch('getUpdateChecked',{skuId:cart.skuId,isChecked})
        this.getData()
      } catch (error) {
        alert(error.message)
      }
    },
      async deleteAllCheckedCart(){
        try {
        await this.$store.dispatch('deleteAllCheckedCart')
        this.getData()
        } catch (error) {
            alert(error.message)
        }
    },
       async updateAllChecked(e){
        try {
        let isChecked = e.target.checked?1:0
        await this.$store.dispatch('updateAllChecked',isChecked)
        this.getData()
        } catch (error) {
            alert(error.message)
        }
    } , 

  },
  
  }
</script>

<style lang="less" scoped>
  .cart {
    width: 1200px;
    margin: 0 auto;

    h4 {
      margin: 9px 0;
      font-size: 14px;
      line-height: 21px;
    }

    .cart-main {
      .cart-th {
        background: #f5f5f5;
        border: 1px solid #ddd;
        padding: 10px;
        overflow: hidden;

        &>div {
          float: left;
        }

        .cart-th1 {
          width: 25%;

          input {
            vertical-align: middle;
          }

          span {
            vertical-align: middle;
          }
        }

        .cart-th2 {
          width: 25%;
        }

        .cart-th3,
        .cart-th4,
        .cart-th5,
        .cart-th6 {
          width: 12.5%;

        }
      }

      .cart-body {
        margin: 15px 0;
        border: 1px solid #ddd;

        .cart-list {
          padding: 10px;
          border-bottom: 1px solid #ddd;
          overflow: hidden;

          &>li {
            float: left;
          }

          .cart-list-con1 {
            width: 4.1667%;
          }

          .cart-list-con2 {
            width: 25%;

            img {
              width: 82px;
              height: 82px;
              float: left;
            }

            .item-msg {
              float: left;
              width: 150px;
              margin: 0 10px;
              line-height: 18px;
            }
          }

          .cart-list-con3 {
            width: 20.8333%;

            .item-txt {
              text-align: center;
            }
          }

          .cart-list-con4 {
            width: 12.5%;

          }

          .cart-list-con5 {
            width: 12.5%;

            .mins {
              border: 1px solid #ddd;
              border-right: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }

            input {
              border: 1px solid #ddd;
              width: 40px;
              height: 33px;
              float: left;
              text-align: center;
              font-size: 14px;
            }

            .plus {
              border: 1px solid #ddd;
              border-left: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }
          }

          .cart-list-con6 {
            width: 12.5%;

            .sum {
              font-size: 16px;
            }
          }

          .cart-list-con7 {
            width: 12.5%;

            a {
              color: #666;
            }
          }
        }
      }
    }

    .cart-tool {
      overflow: hidden;
      border: 1px solid #ddd;

      .select-all {
        padding: 10px;
        overflow: hidden;
        float: left;

        span {
          vertical-align: middle;
        }

        input {
          vertical-align: middle;
        }
      }

      .option {
        padding: 10px;
        overflow: hidden;
        float: left;

        a {
          float: left;
          padding: 0 10px;
          color: #666;
        }
      }

      .money-box {
        float: right;

        .chosed {
          line-height: 26px;
          float: left;
          padding: 0 10px;
        }

        .sumprice {
          width: 200px;
          line-height: 22px;
          float: left;
          padding: 0 10px;

          .summoney {
            color: #c81623;
            font-size: 16px;
          }
        }

        .sumbtn {
          float: right;

          a {
            display: block;
            position: relative;
            width: 96px;
            height: 52px;
            line-height: 52px;
            color: #fff;
            text-align: center;
            font-size: 18px;
            font-family: "Microsoft YaHei";
            background: #e1251b;
            overflow: hidden;
          }
        }
      }
    }
  }
</style>