<template>
  <view class="connectus_contianer" :style="{ padding: pagePadding }">
    <view class="link">
      <view class="iconBg">
        <wd-img class="w-30px h-30px" src="/static/images/phone.png"></wd-img>
      </view>
      <view class="mt-12px mb-12px color-#686A7A">联系方式</view>
      <view class="content">400-888-888</view>
    </view>
    <view class="link">
      <wd-img class="w-48px h-48px" src="/static/images/wechat.png"></wd-img>
      <view class="mt-12px mb-12px color-#686A7A">客服微信公众账号</view>
      <view class="content">梦缘婚恋</view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { setPagePadding } from '@/hooks/useSafeInset'

const { pagePadding } = setPagePadding(0, 15, 0, 15)
</script>

<style lang="scss" scoped>
.connectus_contianer {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  box-sizing: border-box;
  background-color: #f3f5f6;

  .link {
    height: 170px;
    padding: 30px;
    margin-top: 15px;
    border-radius: 10px;
    background-color: #ffffff;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;

    .iconBg {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      display: flex;
      align-items: center;

      justify-content: center;
      background: linear-gradient(90deg, #fe8574 0%, #fd1674 100%);
    }

    .content {
      font-size: 20px;
      font-weight: 500;
      line-height: 20px;
    }
  }
}
</style>
