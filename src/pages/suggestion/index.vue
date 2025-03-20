<template>
  <view class="suggestion_container" :style="{ padding: pagePadding }">
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
import { submitAdvice } from '@/api/common'
import { setPagePadding } from '@/hooks/useSafeInset'

const { pagePadding } = setPagePadding(0, 15, 0, 15)

const content = ref('')

const handleBack = () => {
  uni.navigateBack()
}

const handleSumbitSuggesgtion = async () => {
  await submitAdvice({ remark: content.value })

  uni.showToast({
    title: '提交成功！',
    icon: 'none',
    duration: 2000,
    success: () => {
      uni.navigateBack()
    },
  })
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
