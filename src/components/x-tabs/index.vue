<template>
  <view :class="classNameList">
    <scroll-view id="x-tabs" class="_content" scroll-with-animation :scroll-left="scrollLeft" :scroll-x="isScroll" :style="{'background': background}">
      <view class="_ul">
        <block v-for="(item, index) in list" :key="item[label]">
          <view class="_li" :data-index="index" :class="index === selectedIndex ? '_active' : ''" @click="onChange">
            {{item[label]}}
            <block v-if="underline">
              <view class="_underline" />
            </block>
          </view>
        </block>
      </view>
    </scroll-view>
  </view>
</template>

<script>
  export default {
    name: 'XTabs',
    components: {},
    props: {
      type: {
        type: String,
        default: 'default' // default | home |
      },
      size: {
        type: String,
        default: 'medium'
      },
      fixed: {
        type: Boolean,
        default: false
      },
      background: {
        type: String,
        default: '#fff'
      },
      active: {
        type: Number,
        default: 0
      },
      list: {
        type: Array,
        default: (() => [])
      },
      // data key
      label: {
        type: String,
        default: 'name'
      },
      // 选中下划线
      underline: {
        type: Boolean,
        default: true
      },
      // 分割线
      divider: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        isFixed: false,
        scrollLeft: 0,
        selectedIndex: 0,
        info: null
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
      },
      // class列表
      classNameList() {
        const name = ['x-tabs']
        if (this.isFixed) {
          name.push('is-fixed')
        }
        if (this.divider) {
          name.push('is-divider')
        }
        if (this.isScroll) {
          name.push('is-scroll')
        } else {
          name.push('is-flex')
        }
        name.push(`is-${this.type}`)
        name.push(`is-${this.size}`)
        return name.join(' ')
      },
      // 是否为滚动形式
      isScroll() {
        return this.list.length > 4
      }
    },
    watch: {

    },
    created() {
      this.selectedIndex = this.active
    },
    mounted() {
      this.getTabsInfo()
    },
    methods: {
      getTabsInfo() {
        const query = uni.createSelectorQuery()
        if (!this.isAlipay) {
          query.in(this)
        }
        query.select('#x-tabs').boundingClientRect(data => {
          this.info = data
        }).exec()
      },
      onChange(e) {
        const index = e.target.dataset.index
        if (this.selectedIndex === index) return
        this.selectedIndex = index
        this.$emit('change', this.selectedIndex)
        // 滚动模式下，点击之后计算位置，进行动态滚动设置
        if (this.isScroll) {
          this.$nextTick(() => {
            this.setOffset()
          })
        }
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
  .x-tabs{
    // 分割线
    &.is-divider{
      ._li{
        position: relative;
        &:after{ content: ''; position: absolute; width: 2px; height: 22px; background: #E6E6E6; right: 0; top: 50%; transform: translate3d(0, -50%, 0);}
        &:last-child:after{ display: none;}
      }
    }
    // flex
    &.is-flex{
      ._content ._li{ flex: 1; padding: 0;}
    }
    // scroll
    &.is-scroll{
      ._content ._li{ flex-shrink: 0;}
    }
    // type=home
    &.is-home.is-large{
      ._content{
        font-size: $uni-font-size-sm;
        ._li._active{
          font-weight: bold; font-size: $uni-font-size-lg;
          ._underline{
            width: 34px; height: 14px; background: url('../../static/images/icon-smile.png') no-repeat; background-size: cover;
          }
        }
      }
    }
    // 大号
    &.is-large{
      ._content{ height: $uni-height-size-lg; line-height: $uni-height-size-lg; font-size: $uni-font-size-lg;}
    }
    // 中号
    &.is-medium{
      ._content{ height: $uni-height-size-base; line-height: $uni-height-size-base; font-size: $uni-font-size-base;}
    }
    // 小号
    &.is-small{
      ._content{ height: $uni-height-size-sm; line-height: $uni-height-size-sm; font-size: $uni-font-size-sm;}
    }
    ._content{
      color: $uni-color-default;
      ._ul{ display: flex; align-items: center;}
      ._li{
        text-align: center; padding: 0 30px;
        &._active{
          color: $uni-color-primary; position: relative;
          ._underline{ position: absolute; bottom: 10px; left: 50%; transform: translate(-50%, 0); height: 7px; width: 36px; background: $uni-color-primary; border-radius: $uni-border-radius-sm;}
        }
      }
    }
  }
</style>
