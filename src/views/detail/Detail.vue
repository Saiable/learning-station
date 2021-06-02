<template>
    <div id="detail">
      <detail-nav-bar></detail-nav-bar>
      <detail-swiper :top-images="topImages"></detail-swiper>
    </div>
</template>

<script>
    import DetailNavBar from "@/views/detail/childComponents/DetailNavBar";
    import DetailSwiper from "@/views/detail/childComponents/DetailSwiper";
    import{getDetail,Goods} from "@/network/detail";

    export default {
        name: "Detail",
        data(){
          return {
            iid: null,
            topImages:[],
            goods: {}
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
          })
        },
        components: {
          DetailNavBar,
          DetailSwiper
        }
    }
</script>

<style scoped>

</style>
