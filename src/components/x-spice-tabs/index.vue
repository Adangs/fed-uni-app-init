<template>
  <view class="x-spice-tabs">
    <scroll-view id="x-spice-tabs" class="_content" scroll-x scroll-with-animation :scroll-left="scrollLeft" :style="'background:' + background">
      <view class="_ul">
        <block v-for="(item, index) in list" :key="+item">
          <view class="_li" :data-index="index" :class="index === selectedIndex ? '_active' : ''" @click="onChange">
            <view class="_time">{{formatDate(item)}}</view>
            <view v-if="item > time" class="_desc _pre">预热中</view>
            <view v-else class="_desc _grab">抢购中</view>
            <view class="_underline" />
          </view>
        </block>
      </view>
    </scroll-view>
  </view>
</template>

<script>
  export default {
    name: 'XSpiceTabs',
    components: {},
    props: {
      background: {
        type: String,
        default: '#fff'
      },
      active: {
        type: Number,
        default: 0
      },
      time: {
        type: Number,
        default: +new Date()
      },
      list: {
        type: Array,
        default: (() => [])
      }
    },
    data() {
      return {
        isFixed: false,
        scrollLeft: 0,
        selectedIndex: 0,
        info: null
      }
    },
    computed: {
      // 支付宝平台
      isAlipay() {
        let is = false
        // #ifdef MP-ALIPAY
        is = true
        // #endif
        return is
      },
      // class列表
      classNameList() {
        const name = ['x-spice-tabs', 'is-scroll']
        if (this.isFixed) {
          name.push('is-fixed')
        }
        return name.join(' ')
      }
    },
    watch: {},
    created() {
      this.selectedIndex = this.active
    },
    mounted() {
      this.getTabsInfo()
    },
    methods: {
      // 格式化时间
      formatDate(time) {
        return this.$filters.formatDate(time, 'hh:mm')
      },
      getTabsInfo() {
        const query = uni.createSelectorQuery()
        if (!this.isAlipay) {
          query.in(this)
        }
        query.select('#x-spice-tabs').boundingClientRect(data => {
          this.info = data
          this.setOffset()
        }).exec()
      },
      onChange(e) {
        const index = e.target.dataset.index
        if (this.selectedIndex === index) return
        this.selectedIndex = index
        this.$emit('change', this.selectedIndex)
        // 滚动模式下，点击之后计算位置，进行动态滚动设置
        this.$nextTick(() => {
          this.setOffset()
        })
      },
      // 设置位置
      setOffset() {
        const query = uni.createSelectorQuery()
        query.selectAll('._li').boundingClientRect(data => {
          // 选中后的样式有变化，宽度不一样了，所以重新计算右侧位置数据
          let offsetLeft = 0
          data.forEach((item, index) => {
            if (index < this.selectedIndex) {
              offsetLeft += item.width
            }
          })
          const item = data[this.selectedIndex]
          this.scrollLeft = (offsetLeft + item.width / 2) - (this.info.width / 2)
        }).exec()
      }
    }
  };
</script>

<style lang="scss">
  .x-spice-tabs{
    ._content{
      ._ul{ display: flex; align-items: center;}
      ._li{
        text-align: center; padding: 30px 20px; flex-shrink: 0;
        ._time{ font-weight: bold; font-size: 30px; color: #333;}
        ._desc{ font-size: 24px; color: #A4A4A4; display: inline-block; height: 30px; line-height: 30px; padding: 0 10px; border-radius: 30px;}
        &._active{
          position: relative;
          ._time{ font-size: 36px; color: $uni-color-primary;}
          ._desc{ background: $uni-color-primary; color: #fff;}
          ._underline{ position: absolute; bottom: 10px; left: 50%; transform: translate(-50%, 0); width: 34px; height: 14px; background: url('../../static/images/icon-smile.png') no-repeat; background-size: cover;}
        }
      }
    }
  }
</style>
