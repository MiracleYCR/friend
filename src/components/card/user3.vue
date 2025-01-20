<template>
  <view class="user3card">
    <wd-img class="avatar" src="/static/images/image.png"></wd-img>

    <view class="h-100% flex-1 flex flex-col">
      <view class="title">
        <view class="name">石榴籽儿</view>
        <wd-img class="icon" src="/static/images/vip.png"></wd-img>
        <wd-img class="icon" src="/static/images/checked.png"></wd-img>
      </view>

      <view class="line1">
        <view>马莉莉</view>
        <view class="divider"></view>
        <view>310098888888888</view>
        <view class="divider"></view>
        <wd-img class="w-12px h-12px" src="/static/images/male.png"></wd-img>
        <view>·26岁</view>
      </view>

      <view class="line1">
        <view>梦缘ID：100000001</view>
      </view>

      <view class="reason">原因:后台返回拉黑原因，后台返回拉黑原因后</view>
    </view>
  </view>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.user3card {
  width: 100%;
  height: 100%;
  position: relative;
  box-sizing: border-box;
  background-color: #ffffff;
  display: flex;
  justify-content: space-between;

  .avatar {
    width: 56px;
    height: 56px;
    margin-right: 10px;
  }

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
    font-size: 10px;
    align-items: center;
    color: #9395a4;

    .divider {
      width: 1px;
      height: 9px;
      margin: 0 5px;
      background-color: #9395a4;
    }
  }

  .reason {
    font-size: 12px;
    font-weight: 400;
    color: #9395a4;
  }
}
</style>
