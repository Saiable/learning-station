import {debounce} from "@/common/utils";

export const itemListenerMixin = {
  data() {
    return {
      itemImageListener: null
    }
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll && this.$refs.scroll.refresh, 200)
    this.itemImageListener = () => {
      refresh()
    }
    this.$bus.$on('itemImageLoad', this.itemImageListener)
    // console.log('mixin');
  }
}
