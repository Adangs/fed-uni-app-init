<template>
  <view :class="{'x-search': true, 'is-transparent': transparent}">
    <view class="x-search-content">
      <view class="x-search-input flex">
        <view class="icon flex-none">
          <x-icon name="icon-search" />
        </view>
        <view class="flex-item">
          <x-input :value="value" :adjust-position="false" :focus="focus" :disabled="preview" :placeholder="placeholder" confirm-type="search" @confirm="onConfirm" @blur="onBlur" @focus="onFocus" @input="onInput" @cancel="onClear" />
        </view>
      </view>
      <block v-if="cancel">
        <view class="x-search-button" @click="onCancel">取消</view>
      </block>
      <block v-if="search">
        <view class="x-search-button" @click="onSearch">搜索</view>
      </block>
    </view>
  </view>
</template>

<script>
  import XIcon from '@/components/x-icon'
  import XInput from '@/components/x-input'

  export default {
    name: 'XSearch',
    components: {
      XIcon,
      XInput
    },
    props: {
      value: {
        type: String,
        value: ''
      },
      // 预览状态，不可输入
      preview: {
        type: Boolean,
        value: false
      },
      // 占位文本
      placeholder: {
        type: String,
        value: '请输入要搜索的商品关键字'
      },
      // 自动聚焦
      focus: {
        type: Boolean,
        value: false
      },
      // 显示取消按钮
      cancel: {
        type: Boolean,
        value: false
      },
      // 显示搜索按钮
      search: {
        type: Boolean,
        value: false
      },
      // 背景是否透明
      transparent: {
        type: Boolean,
        value: false
      }
    },
    data() {
      return {
        inputValue: ''
      };
    },
    computed: {},
    watch: {},
    created() {

    },
    methods: {
      // 键盘点击完成按钮时触发
      onConfirm(value) {
        this.$emit('submit', value)
      },
      // 键盘输入时触发
      onInput(value) {
        this.inputValue = value;
        this.$emit('input', value)
      },
      // 输入框聚焦时触发
      onFocus(value) {
        this.$emit('focus', value)
      },
      // 输入框失去焦点时触
      onBlur() {
        this.$emit('blur')
      },
      // 点击取消按钮时触发
      onCancel() {
        this.$emit('cancel')
      },
      // 点击搜索按钮时触发
      onSearch() {
        this.$emit('search', this.inputValue)
      },

      // 清空输入框
      onClear() {
        this.value = '';
        this.inputValue = '';
        this.$emit('clear')
      }
    }
  };
</script>

<style lang="scss">
  .x-search{
    height: 80px;
    .x-search-content{
      padding: 0 20px; background: #f2f2f2; display: flex; align-items: center; height: 80px; line-height: 60px;
      .x-search-input{
        flex: 1; height: 60px; position: relative;
        overflow: hidden;
        .icon{
          margin: 0 10px;
        }
      }
      .x-search-button{
        padding: 0 11px 0 27px; height: 100%;
        line-height: 80px;
        &:active{ opacity: .8;}
      }
    }
    &.is-transparent{
      .x-search-content{
        background: transparent;
      }
    }
  }

</style>
