<template>
  <view class="x-tips-wallet">
    <view class="_dt">温馨提示：</view>
    <view>1、提现上限，每天3次，每月5次</view>
    <view>2、单人（实名用户）、单日、单笔上限：5000元</view>
    <view>3、单人、单笔1元起提</view>
    <view>4、结算日期为每月21-31日，结算后可申请提现，提现24小时以内到账，以实际到账时间为准</view>
  </view>
</template>

<script>
  export default {
    name: 'XTipsWallet',
    components: {},
    props: {},
    data() {
      return {};
    },
    computed: {},
    watch: {},
    created() {

    },
    methods: {}
  };
</script>

<style lang="scss">
  .x-tips-wallet{
    padding: 30px; color: #646464; line-height: 1.6; font-size: $uni-font-size-mini;
    ._dt{ padding-bottom: 10px;}
  }
</style>
