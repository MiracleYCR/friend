<template>
  <!-- 我的邀请列表项 -->
  <view class="user4card">
    <wd-img class="avatar" :src="data.avatar"></wd-img>

    <view class="h-100% flex-1 flex items-center justify-between">
      <view class="left">
        <view class="title">
          <view class="name">{{ data.nickName }}</view>
          <wd-img class="icon" src="/static/images/vip.png"></wd-img>
          <wd-img class="icon" src="/static/images/checked.png"></wd-img>
        </view>
        <view class="line1">
          <view>{{ data.realName }}</view>
        </view>
      </view>

      <view class="right">2024-12-12</view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'

defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
})
</script>

<style lang="scss" scoped>
.user4card {
  width: 100%;
  height: 100%;
  position: relative;
  box-sizing: border-box;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .avatar {
    width: 50px;
    height: 50px;
    margin-right: 10px;
  }

  .left {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;

    .title {
      display: flex;
      align-items: center;

      .name {
        font-size: 30rpx;
        font-weight: 500;
      }

      .icon {
        width: 44px;
        height: 14px;
        margin-left: 5px;
      }
    }

    .line1 {
      display: flex;
      font-size: 12px;
      align-items: center;
      color: #9395a4;
    }
  }

  .right {
    width: 72px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: 400;
    color: #9395a4;
  }
}
</style>
