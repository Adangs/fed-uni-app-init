<template>
  <view :class="classNameList" :style="{'background':  background}">
    <view v-if="prefixIcon" class="_prefix">
      <x-icon color="#8A8A8A" :name="prefixIcon" :size="iconSize" />
    </view>
    <input
      class="_input"
      :value="inputValue"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      :maxlength="maxlength"
      :confirm-type="confirmType"
      @input="onInput"
      @focus="onFocus"
      @blur="onBlur"
      @confirm="onConfirm">
    <view v-if="suffixIcon" class="_suffix">
      <x-icon :name="suffixIcon" :size="iconSize" />
    </view>
    <view v-if="inputValue && clear" class="_suffix" @click="onClear">
      <x-icon name="icon-close-fill" color="#8A8A8A" :size="iconSize" />
    </view>
  </view>
</template>

<script>
  import XIcon from '@/components/x-icon'

  export default {
    name: 'XInput',
    components: {
      XIcon
    },
    props: {
      size: {
        type: String,
        default: 'medium'
      },
      round: {
        type: Boolean,
        default: false
      },
      type: {
        type: String,
        default: 'text'
      },
      background: {
        type: String,
        default: '#ffffff'
      },
      // 输入框的初始内容
      value: [String, Number],
      // 前置icon
      prefixIcon: {
        type: String,
        default: ''
      },
      // 后缀icon
      suffixIcon: {
        type: String,
        default: ''
      },
      // 后缀清除按钮
      clear: {
        type: Boolean,
        default: true
      },
      placeholder: {
        type: String,
        default: '请输入内容'
      },
      password: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      focus: {
        type: Boolean,
        default: false
      },
      maxlength: {
        type: Number,
        default: 300
      },
      // 设置键盘右下角按钮的文字
      confirmType: {
        type: String,
        default: 'done'
      }
    },
    data() {
      return {
        inputValue: ''
      };
    },
    computed: {
      // class列表
      classNameList() {
        const name = ['x-input']
        name.push(`is-${this.size}`)
        if (this.round) {
          name.push('is-round')
        }
        if (this.disabled || this.loading) {
          name.push('is-disabled')
        }
        if (this.prefixIcon) {
          name.push('is-prefix')
        }
        return name.join(' ')
      },
      iconSize() {
        switch (this.size) {
          case 'large':
            return 34
          case 'small':
            return 28
          default:
            return 32

        }
      }
    },
    watch: {
      value(val) {
        this.inputValue = val
      }
    },
    created() {
      this.inputValue = this.value
    },
    methods: {
      onInput({ target }) {
        this.inputValue = target.value
        this.$emit('input', this.inputValue)
      },
      onFocus() {
        this.$emit('focus', this.inputValue)
      },
      onBlur() {
        this.$emit('blur', this.inputValue)
      },
      onConfirm() {
        this.$emit('confirm', this.inputValue)
      },
      onClear() {
        this.inputValue = ''
        this.$emit('clear', this.inputValue)
      }
    }
  };
</script>

<style lang="scss">
  .x-input{
    display: flex; align-items: center; overflow: hidden; border-radius: 4px;
    ._input{ height: 100%; flex: 1; background: transparent;}
    ._prefix,
    ._suffix{ text-align: center; position: relative; z-index: 2;}
    // 大号
    &.is-large{
      height: $uni-height-size-lg; line-height: $uni-height-size-lg;
      &.is-round{ border-radius: $uni-height-size-lg;}
      ._prefix,
      ._suffix{ width: $uni-height-size-lg; height: $uni-height-size-lg; line-height: $uni-height-size-lg;}
      ._input{ font-size: $uni-font-size-base; padding: 30px;}
    }
    // 中号
    &.is-medium{
      height: $uni-height-size-base; line-height: $uni-height-size-base;
      &.is-round{ border-radius: $uni-height-size-base;}
      ._prefix,
      ._suffix{ width: $uni-height-size-base; height: $uni-height-size-base; line-height: $uni-height-size-base;}
      ._input{ font-size: $uni-font-size-sm; padding: 20px;}
    }
    // 小号
    &.is-small{
      height: $uni-height-size-sm; line-height: $uni-height-size-sm;
      &.is-round{ border-radius: $uni-height-size-sm;}
      ._prefix,
      ._suffix{ width: $uni-height-size-sm; height: $uni-height-size-sm; line-height: $uni-height-size-sm;}
      ._input{ font-size: $uni-font-size-mini; padding: 10px;}
    }
    &.is-prefix ._input{ padding-left: 0;}
  }
</style>
