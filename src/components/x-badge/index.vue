<template>
  <view class="x-badge">
    <block v-if="value && !isDot">
      <view class="_content">{{value}}</view>
    </block>
    <slot />
  </view>
</template>

<script>
  export default {
    name: 'XBadge',
    components: {},
    props: {
      value: {
        type: String,
        default: ''
      },
      type: {
        type: String,
        default: 'primary'
      },
      isDot: {
        type: Boolean,
        default: false
      }
    },
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
  .x-badge{
    display: inline-block; position: relative;
    // primary
    &.primary{
      ._content,
      &.is-dot:after{
        background: $uni-color-primary;
      }
    }
    // 小圆点
    &.is-dot{
      &:after{ content: ''; position: absolute; right: -6px; top: -6px; width: 12px; height: 12px; overflow: hidden; border-radius: 50%;}
    }
    ._content{
      position: absolute; right: -6px; top: -6px; font-size: 20px; color: #fff; text-align: center; min-width: 22px; height: 22px; line-height: 22px; border-radius: 22px; padding: 0 6px;
    }
  }

</style>
