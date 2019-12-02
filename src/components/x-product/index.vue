<template>
  <view :class="classNameList" :style="{'background':  background}" @click="onToDetail">
    <view class="_pic">
      <x-image :src="detail.goodsImgUrl" is-background />
    </view>
    <view class="_info">
      <view class="_title">{{detail.goodsTitle}}</view>
      <view v-if="type === 'spike' && detail.status === 1" class="_slider">
        <view class="_slider-content">
          <view :style="'width:' + schedule + '%'" />
        </view>
        <view class="_slider-desc">已售{{schedule}}%</view>
      </view>
      <view class="_coupon">
        <view v-if="type === 'primary' && detail.goodsPrice" class="_old">￥{{detail.goodsPrice}}</view>
        <view class="_tags">
          <view v-if="detail.goodsRebate" class="_r">返￥{{detail.goodsRebate}}</view>
          <view v-if="detail.goodsCoupon" class="_c">{{detail.goodsCoupon}}元券</view>
        </view>
      </view>
      <view class="_tools">
        <view class="_price">
          <view v-if="newPrice" class="_new">
            <view class="_dt">券后</view>
            <view class="_unit">￥</view>
            <view class="_dd">{{newPrice}}</view>
          </view>
          <view v-if="detail.oldPrice" class="_old">￥{{detail.oldPrice}}</view>
        </view>
        <view v-if="detail.totalBuy" class="_sales">{{detail.totalBuy}}人已购</view>
        <view v-if="type === 'spike'" :class="buttonClassName">
          {{statusName}}
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import XImage from '@/components/x-image'

  export default {
    name: 'XProduct',
    components: {
      XImage
    },
    props: {
      type: {
        type: String,
        default: 'primary'
      },
      background: {
        type: String,
        default: '#ffffff'
      },
      detail: {
        type: Object,
        default: (() => {})
      }
    },
    data() {
      return {}
    },
    computed: {
      // class列表
      classNameList() {
        const name = ['x-product']
        name.push(`is-${this.type}`)
        return name.join(' ')
      },
      // 当前价格
      newPrice() {
        return this.$filters.formatNumber(this.detail.goodsPrice - this.detail.goodsCoupon)
      },
      // 进度
      schedule() {
        const schedule = this.detail.volume / this.detail.totalAmount * 100
        return this.detail.volume ? +this.$filters.formatNumber(schedule > 100 ? 100 : schedule) : 0
      },
      // 秒杀按钮class name
      buttonClassName() {
        const name = ['_button']
        if (this.detail.status === 0 || this.schedule === 100) {
          name.push('is-disabled')
        }
        return name.join(' ')
      },
      statusName() {
        if (this.detail.status === 0) {
         return '预热中'
        } else if (this.schedule === 100) {
          return '已抢光'
        } else {
          return '立即抢购'
        }
      }
    },
    watch: {},
    created() {

    },
    methods: {
      // 前往详情页
      onToDetail() {
        if (this.type === 'spike' && (this.detail.status === 0 || this.schedule === 100)) {
          return false
        }
        // 缓存当前点击商品，详情页使用
        uni.setStorage({
          key: 'storage-current-goods',
          data: this.detail
        })
        uni.navigateTo({
          url: '/packages/mall/detail/index'
        })
      }
    }
  };
</script>

<style lang="scss">
  .x-product{
    border-radius: 5px; overflow: hidden; font-size: 22px;
    &.is-primary{
      ._pic{ height: 342px; overflow: hidden; margin-bottom: 12px;}
      ._price ._old{ display: none;}
    }
    &.is-list{
      display: flex; position: relative;
      ._pic{ width: 230px; height: 230px; overflow: hidden; }
      ._info{ flex: 1; padding-left: 23px; position: relative;}
      ._tools{ position: absolute; width: 100%; bottom: 0; left: 0; display: flex; align-items: center; padding: 20px 12px 20px 23px;}
      ._sales{}
    }
    &.is-spike{
      display: flex; align-items: center; position: relative; border:1px solid rgba(238,238,238,1); border-radius:5px; overflow: hidden;
      ._pic{ width: 230px; height: 230px; overflow: hidden; }
      ._info{ flex: 1; padding: 0 20px; position: relative; overflow: hidden;}
      ._title{ display: block; white-space: nowrap; word-break: normal; text-overflow: ellipsis;}
      ._slider{
        display: flex; align-items: center; padding-top: 20px;
        ._slider-content{
          width: 240px; height: 8px; border-radius: 8px; background: #E5E5E5; overflow: hidden;
          view{ height: 100%; width: 50%; background: #FF2025; border-radius: 8px;}
        }
        ._slider-desc{ padding: 0 20px; font-size: 20px; color: #9E9E9E;}
      }
      ._button{ text-align: center;}
      ._sales{ display: none;}
    }
    &.is-mini{
      ._pic{ width: 240px; height: 240px; overflow: hidden;}
      ._coupon,
      ._sales{ display: none;}
      ._info{ padding: 18px 15px 0;}
      ._title{ display: block; white-space: nowrap; word-break: normal; text-overflow: ellipsis;}
      ._tools{
        padding: 10px 0;
      }
    }
    &.is-modal{
      display: flex; position: relative;
      ._pic{ width: 170px; height: 170px; overflow: hidden; }
      ._info{ flex: 1; padding-left: 23px; position: relative;}
      ._sales{ display: none;}
    }
    ._title{
      font-size: 28px; line-height: 1.4; word-break: break-all; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
    }
    ._old{ font-size: 24px; color: #8A8A8A; text-decoration: line-through; padding: 0 5px;}
    ._coupon{
      display: flex; align-items: center; padding: 25px 10px 0 0;
      ._old{ flex: 1; }
      ._tags{
        display: flex; align-items: center; font-size: 24px; white-space: nowrap;
        > view{ padding: 3px 10px; border-radius: 4px;}
        ._r{ background: #FFF2E9; color: $uni-color-warning; margin-right: 10px;}
        ._c{ background: $uni-color-primary-light-9; color: $uni-color-primary;}
      }
    }
    ._info{ padding: 12px;}
    ._tools{
      display: flex; align-items: center; padding-top: 20px;
      ._price{
        flex: 1; display: flex; align-items: center;
        ._new{
          color: $uni-color-primary; display: flex; align-items: baseline;
          ._unit{ font-weight: bold;}
          ._dd{ font-size: $uni-font-size-base; font-weight: bold;}
        }
      }
      ._sales{ color: #8A8A8A; font-size: 24px;}
      ._button{
        font-size: 24px; color: #fff; background-color: #FF2916; min-width: 140px; height: 50px; line-height: 50px; border-radius: 50px; padding: 0 12px;
        &.is-disabled{ background: #CCCCCC;}
      }
    }
  }
</style>
