<template>
          <div class="swiper-container" id="floor1Swiper" ref="cur">
               <div class="swiper-wrapper">
                  <div class="swiper-slide" v-for="(carousel) in list" :key="carousel.id" >
                    <img :src="carousel.imgUrl" />
                  </div>
                </div>
                <!-- 如果需要分页器 -->
                <div class="swiper-pagination"></div>

                <!-- 如果需要导航按钮 -->
                <div class="swiper-button-prev"></div>
                <div class="swiper-button-next"></div>
              </div>
</template>

<script>
import Swiper from 'swiper';
export default {
  name:"Carousel",
  props:['list'],
  watch:{
    list:{
      immediate:true,
      handler(){
        this.$nextTick(()=>{
        var mySwiper = new Swiper(this.$refs.cur, {   
        direction: "horizontal",  
        loop: true,   
        pagination: {
          el: ".swiper-pagination",  
          type: "bullets",    
          clickable: true,
        },   
        autoplay: {
          delay: 1000,     
          stopOnLastSlide: true,  
          disableOnInteraction: false,
        }, 
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
       // 切换效果
        effect: "cube",
      }); 
        })
      }
    }
  }
}
</script>

<style>

</style>