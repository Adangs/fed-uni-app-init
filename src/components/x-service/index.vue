<template>
  <view class="x-service" id="x-service" :style="offset" @touchstart="onTouchstart" @touchmove="onTouchmove" @touchend="setStopOffset" @touchcancel="setStopOffset">
    <!-- #ifndef MP-ALIPAY -->
    <x-button plain open-type="contact">
      <view class="_pic">
        <x-image src="/assets/images/icon_service.png" />
      </view>
    </x-button>
    <!-- #endif -->
    <!-- #ifdef MP-ALIPAY -->
    <contact-button tnt-inst-id="NUp_6wCQ" scene="SCE00114248" size="120rpx" icon="https://alicdn.madaomall.com/static/fed/wxmp/99mall/v2.0.0/assets/images/icon-icon_service.png" />
    <!-- #endif -->
  </view>
</template>

<script>
  import XButton from '@/components/x-button'
  import XImage from '@/components/x-image'

  export default {
    name: 'XService',
    components: {
      XButton,
      XImage
    },
    props: {},
    data() {
      return {
        width: 0,
        height: 0,
        screenWidth: uni.getSystemInfoSync().screenWidth,
        screenHeight: uni.getSystemInfoSync().screenHeight,
        offset: '',
        offsetLeft: 0,
        offsetTop: 0,
        clientX: 0,
        clientY: 0
      };
    },
    computed: {
      // 支付宝平台
      isAlipay() {
        let is = false
        // #ifdef MP-ALIPAY
        is = true
        // #endif
        return is
      }
    },
    watch: {},
    created() {
      // console.log(uni.getSystemInfoSync())
    },
    mounted() {
      const query = uni.createSelectorQuery()
      if (!this.isAlipay) {
        query.in(this)
      }
      query.select('#x-service').boundingClientRect(res => {
        const { width, height } = res
        this.width = width
        this.height = height
      }).exec()
    },
    methods: {
      // 手指触摸动作开始
      onTouchstart(e) {
        // console.log('onTouchstart', e)
        const { offsetLeft, offsetTop } = e.currentTarget
        const { clientX, clientY } = e.touches[0]
        this.clientX = clientX
        this.clientY = clientY
        this.offsetLeft = offsetLeft
        this.offsetTop = offsetTop
        this.offset = `left: ${offsetLeft}px; top: ${offsetTop}px`
      },
      // 手指触摸后移动
      onTouchmove(e) {
        // console.log('onTouchmove', e)
        const { clientX, clientY } = e.touches[0]
        const offsetLeft = this.offsetLeft - (this.clientX - clientX)
        const offsetTop = this.offsetTop - (this.clientY - clientY)
        this.clientX = clientX
        this.clientY = clientY
        this.offsetLeft = offsetLeft
        this.offsetTop = offsetTop
        this.offset = `left: ${offsetLeft}px; top: ${offsetTop}px`
      },
      // 统一设置停止后位置
      setStopOffset(e) {
        // console.log('getSystemInfoSync', wx.getSystemInfoSync())
        const { screenWidth, screenHeight, width } = this
        let { offsetLeft, offsetTop } = e.currentTarget

        if ((offsetLeft + (width / 2)) > (screenWidth / 2)) {
          offsetLeft = screenWidth - width - (width / 4)
        } else {
          offsetLeft = width / 4
        }
        if (offsetTop < 100) {
          offsetTop = 100
        } else if (offsetTop + width > screenHeight) {
          offsetTop = screenHeight - 100
        }

        this.offsetLeft = offsetLeft
        this.offsetTop = offsetTop
        this.offset = `left: ${offsetLeft}px; top: ${offsetTop}px`
      }
    }
  };
</script>

<style lang="scss">
  .x-service{
    position: fixed; right: 30px; top: 80vh; z-index: 996;
    ._pic{ width: 120px; height: 120px;}
  }
</style>
