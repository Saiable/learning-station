<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <home-recomend-view :recommends="recommends"></home-recomend-view>
  </div>
</template>

<script>
  import NavBar from "components/common/navBar/NavBar";
  import HomeSwiper from "views/home/childrenComponents/HomeSwiper";
  import HomeRecomendView from "@/views/home/childrenComponents/HomeRecomendView";

  import {getHomeMultidata} from 'network/home';
    export default {
        name: "Home",
        components: {
          NavBar,
          HomeSwiper,
          HomeRecomendView
        },
        data() {
          return{
            banners: [],
            recommends: []
          }
        },
        created() {
          //1. 请求多个数据
          getHomeMultidata().then(res => {
            console.log(res)
            this.banners = res.data.banner.list
            this.recommends = res.data.recommend.list
          })
        }
    }
</script>

<style scoped>
  .home-nav {
    background-color: var(--color-tint);
    color: white;

  }
</style>
