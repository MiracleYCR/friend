<template>
  <view class="suggestion_container">
    <view class="header">
      <wd-img class="back" src="/static/images/back.png" @click="handleBack" />
      <view class="title">建议反馈</view>
      <view class="manage" @click="handleSumbitSuggesgtion">提交</view>
    </view>

    <view class="content">
      <wd-textarea
        custom-class="textarea"
        v-model="content"
        placeholder="请输入您的意见和建议内容"
      ></wd-textarea>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const content = ref('')

const handleBack = () => {
  uni.navigateBack()
}

const handleSumbitSuggesgtion = () => {
  console.log('handleSumbitSuggesgtion')
}
</script>

<style lang="scss" scoped>
.suggestion_container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  background-color: #f3f5f6;
  display: flex;
  flex-direction: column;
  padding: env(safe-area-inset-top) 10px 0 15px;

  .header {
    width: 100%;
    height: 45px;
    position: relative;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;

    .back {
      position: absolute;
      left: 0;
      width: 16px;
      height: 16px;
    }

    .manage {
      position: absolute;
      right: 0;
      font-size: 14px;
      font-weight: 400;
    }
  }

  .content {
    flex: 1;
    margin-top: 15px;
    box-sizing: border-box;

    .textarea {
      height: 180px;
      border-radius: 10px;

      :deep(.wd-textarea__value) {
        height: 100%;
        color: #686a7a;

        .wd-textarea__inner {
          height: 100%;
        }
      }
    }
  }
}
</style>
