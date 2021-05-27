<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>

    <scroll class="content">
      <home-swiper :banners="banners"></home-swiper>
      <home-recomend-view :recommends="recommends"></home-recomend-view>
      <feature-view></feature-view>
      <tab-control :titles="['流行','新款','精选']"
                   class="tab-control" @tabClick="tabClick"></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>

<!--    <div class="temp"></div>-->
  </div>
</template>

<script>
  import NavBar from "components/common/navBar/NavBar";
  import TabControl from "@/components/common/tabControl/TabControl";
  import BScroll from '@/components/common/scroll/Scroll';
  import GoodsList from "@/components/content/goods/GoodsList";

  import HomeSwiper from "views/home/childrenComponents/HomeSwiper";
  import HomeRecomendView from "@/views/home/childrenComponents/HomeRecomendView";
  import FeatureView from "@/views/home/childrenComponents/FeatureView";

  import {getHomeMultidata, getHomeGoods} from 'network/home';
  import Scroll from "@/components/common/scroll/Scroll";
    export default {
        name: "Home",
        components: {
          Scroll,
          NavBar,
          TabControl,
          HomeSwiper,
          HomeRecomendView,
          FeatureView,
          GoodsList
        },
        data() {
          return{
            banners: [],
            recommends: [],
            goods: {
              'pop': {page: 0, list: []},
              'new': {page: 0, list: []},
              'sell': {page: 0, list: []}
            },
            currentType: 'pop'
          }
        },
        computed: {
          showGoods() {
            return this.goods[this.currentType].list
          }
        },
        created() {
          //1. 请求多个数据
          this.getHomeMultidata()

          //2.请求goods数据
          this.getHomeGoods('pop')
          this.getHomeGoods('new')
          this.getHomeGoods('sell')
        },
        methods: {
          /**
           * 事件监听相关的方法
           */
          tabClick(index) {
            // console.log(index)
            switch (index) {
              case 0:
                this.currentType = 'pop'
                break
              case 1:
                this.currentType = 'new'
                break
              case 2:
                this.currentType = 'sell'
                break

            // this.currentType = Object.keys(this.goods)[index]
            }
          },

          /**
           * 网络请求相关的方法
           */
          getHomeMultidata() {
            getHomeMultidata().then(res => {
              // console.log(res)
              this.banners = res.data.banner.list
              this.recommends = res.data.recommend.list
            })
          },
          getHomeGoods(type) {
            const page = this.goods[type].page + 1
            getHomeGoods(type,page).then(res => {
              // console.log(res)
              this.goods[type].list.push(...res.data.list)
              this.goods[type].page += 1
            })
          }
        }

    }
</script>

<style scoped>
  #home{
    padding-top: 44px;
    height: 100vh;

    position: relative;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: white;

    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9;
  }

  /*.temp {*/
  /*  height: 900px;*/
  /*}*/
  .tab-control{
    position: sticky;
    top: 44px;
    background-color: #ffffff;
  }

  .content{
    /*height: calc(100% - 93px);*/
    /*overflow: hidden;*/
    /*margin-top: 44px;*/


    /*height: 300px;*/
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>
