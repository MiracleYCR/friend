<template>
  <view class="noticecard">
    <wd-img class="w-40px h-40px mr-10px" src="/static/images/bell.png"></wd-img>
    <view class="content">
      <view class="title">精准匹配遇见幸福</view>
      <view class="detail">哈喽，您的会员服务还剩7天到期，请您及时续费会员继续体验~</view>
      <wd-img class="w-100% h-174px mt-10px" src="/static/images/image2.png"></wd-img>
      <view class="time mt-10px">2024-12-20 12:00:00</view>
    </view>
  </view>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.noticecard {
  display: flex;
  justify-content: space-between;

  .content {
    flex: 1;
    display: flex;
    flex-direction: column;

    .title {
      font-size: 15px;
      font-weight: 500;
      color: #191c32;
      line-height: 20px;
      margin-bottom: 5px;
    }

    .detail {
      font-size: 14px;
      font-weight: 400;
      line-height: 20px;
      color: #686a7a;
    }

    .time {
      font-size: 12px;
      color: #9395a4;
      font-weight: 400;
      line-height: 20px;
      text-align: right;
    }
  }
}
</style>
