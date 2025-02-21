<!-- 缘分首页用户列表 -->
<template>
  <view class="user1card">
    <wd-img class="avatar" src="/static/images/image.png"></wd-img>

    <view class="h-100% flex-1 flex items-center justify-between">
      <view class="left">
        <view class="title">
          <view class="name">{{ userData.nickName }}</view>
          <wd-img class="icon" src="/static/images/vip.png"></wd-img>
          <wd-img class="icon" src="/static/images/checked.png"></wd-img>
        </view>
        <view class="line1">
          <view>{{ userData.loacaltionName }} · {{ userData.distance.toFixed(2) }}km</view>
          <view class="divider"></view>
          <wd-img class="w-12px h-12px" :src="sexImg"></wd-img>
          <view>·{{ userData.age }}岁</view>
        </view>
        <view class="line2">
          <view class="type">近期活跃</view>
        </view>
      </view>

      <view class="right">
        <wd-img class="icon" src="/static/images/heart.png"></wd-img>
        打招呼
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'

const props = defineProps({
  userData: {
    type: Object,
    default: () => ({}),
  },
})

const sexImg = computed(() => {
  return props.sex === 0 ? '/static/images/male.png' : '/static/images/female.png'
})
</script>

<style lang="scss" scoped>
.user1card {
  width: 100%;
  height: 100%;
  position: relative;
  padding: 12px;
  box-sizing: border-box;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .avatar {
    width: 64px;
    height: 64px;
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

      .divider {
        width: 1px;
        height: 9px;
        margin: 0 4px;
        background-color: #9395a4;
      }
    }

    .line2 {
      font-size: 10px;
      color: #9395a4;
      display: flex;
      align-items: center;

      .type {
        height: 18px;
        padding: 0 4px;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        border-radius: 4px;
        background-color: #f2f4f8;
      }
    }
  }

  .right {
    width: 72px;
    height: 28px;
    display: flex;
    align-items: center;
    border-radius: 14px;
    justify-content: center;
    border: 1px solid #dfe4ee66;

    font-size: 12px;
    font-weight: 400;
    color: #fd2b58;

    .icon {
      width: 20px;
      height: 20px;
      margin-right: 2px;
    }
  }
}
</style>
