<template>
    <div id="detail">
      <detail-nav-bar class="detail-nav" @titleClick="titleClick"></detail-nav-bar>
      <scroll class="content" ref="scroll">
        <detail-swiper :top-images="topImages"></detail-swiper>
        <detail-base-info :goods="goods"></detail-base-info>
        <detail-shop-info :shop-info="shop"></detail-shop-info>
        <detail-goods-info :goods-info="detailInfo" @goodsInfoImgLoad="imageLoad"></detail-goods-info>
        <detail-goods-params :goodsParams="paramInfo"></detail-goods-params>
        <detail-comment-info :commentInfo="commentInfo"></detail-comment-info>
        <goods-list :goods="recommends"></goods-list>
      </scroll>

    </div>
</template>

<script>
    import DetailNavBar from "@/views/detail/childComponents/DetailNavBar";
    import DetailSwiper from "@/views/detail/childComponents/DetailSwiper";
    import DetailBaseInfo from "@/views/detail/childComponents/DetailBaseInfo";
    import DetailShopInfo from "@/views/detail/childComponents/DetailShopInfo";
    import DetailGoodsInfo from "@/views/detail/childComponents/DetailGoodsInfo";
    import DetailGoodsParams from "@/views/detail/childComponents/DetailGoodsParams";
    import DetailCommentInfo from "@/views/detail/childComponents/DetailCommentInfo";
    import GoodsList from "@/components/content/goods/GoodsList";

    import{getDetail,Goods,Shop,GoodsParam,getRecommend} from "@/network/detail";

    import Scroll from "@/components/common/scroll/Scroll";
    import {debounce} from "@/common/utils";
    export default {
        name: "Detail",
        data(){
          return {
            iid: null,
            topImages:[],
            goods: {},
            shop: {},
            detailInfo: {},
            paramInfo: {},
            commentInfo: {},
            recommends: [],
            itemImageListener: null
          }
        },
        created() {
          //1. 保存传入的id
          this.iid = this.$route.params.iid

          //2. 根据iid请求详情数据
          getDetail(this.iid).then(res => {
            // console.log(res);
            //1. 获取顶部轮播图数据
            const data = res.result
            this.topImages = data.itemInfo.topImages
            // console.log(this.topImages)

            //2.获取商品信息
            this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)

            //3.创建店铺信息的对象
            this.shop = new Shop(data.shopInfo)

            //4.保存商品详情的数据
            this.detailInfo = data.detailInfo

            //5.获取参数信息
            this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

            //6.取出评论信息
            if(data.rate.cRate !== 0) {
              this.commentInfo = data.rate.list[0]
            }

          })

          //3.请求推荐数据
          getRecommend().then(res => {
            // console.log(res)
            this.recommends = res.data.list
          })
        },
        mounted() {
          const refresh = debounce(this.$refs.scroll && this.$refs.scroll.refresh, 200)
          this.itemImageListener = () => {
            refresh()
          }
          this.$bus.$on('itemImageLoad', this.itemImageListener)
        },
        destroyed() {
          this.$bus.$off('itemImageLoad', this.itemImageListener)
        },
      components: {
          DetailNavBar,
          DetailSwiper,
          DetailBaseInfo,
          DetailShopInfo,
          Scroll,
          DetailGoodsInfo,
          DetailGoodsParams,
          DetailCommentInfo,
          GoodsList
        },
        methods: {
          imageLoad() {
            this.$refs.scroll.refresh()
          },
          titleClick(index) {
            console.log(index);
          }
        }
    }
</script>

<style scoped>
  #detail{
    position: relative;
    z-index: 9;
    background-color: #ffffff;
    height: 100vh;
  }
  .detail-nav{
    position: relative;
    z-index: 9;
    background-color: #ffffff;
  }
  .content {
    height: calc(100% - 44px);
  }
</style>
