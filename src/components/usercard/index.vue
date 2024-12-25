<template>
  <view class="usercard">
    <wd-img class="avatar" src="/src/static/images/image.png"></wd-img>

    <view class="h-100% flex-1 flex items-center justify-between">
      <view class="left">
        <view class="title">
          <view class="name">小张</view>
          <view class="sex">
            <wd-img class="icon" src="/src/static/images/female.png"></wd-img>
            <view class="divider"></view>
            25
          </view>
          <view class="type">娱乐</view>
        </view>
        <view class="line1">北京大兴(4.5km)｜30岁</view>
        <view class="line2">近期活跃</view>
      </view>

      <view class="right">
        <wd-img class="icon" src="/src/static/images/image.png"></wd-img>
        <view class="call">打招呼</view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.usercard {
  width: 100%;
  height: 100%;
  position: relative;
  border-radius: 10px;
  background-color: #ffffff;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .avatar {
    width: 60px;
    height: 60px;
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

      .sex {
        width: 100rpx;
        height: 40rpx;
        border-radius: 120rpx;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        background: linear-gradient(15.22deg, #fd6cff 7.8%, #ff80c7 86.42%);
        font-size: 24rpx;
        color: #ffffff;
        margin: 0 10rpx;

        .icon {
          width: 24rpx;
          height: 24rpx;
        }

        .divider {
          width: 2rpx;
          height: 20rpx;
          background-color: #ffffff;
        }
      }

      .type {
        padding: 0 14rpx;
        height: 40rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24rpx;
        border-radius: 120rpx;
        color: rgba(100, 102, 104, 1);
        background: rgba(237, 242, 245, 1);
      }
    }

    .line1,
    .line2,
    .line3 {
      font-size: 24rpx;
    }

    .line1 {
      color: rgba(102, 102, 102, 1);
    }

    .line2 {
      color: rgba(153, 153, 153, 1);
    }
  }

  .right {
    width: 50px;
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-evenly;

    .icon {
      width: 40px;
      height: 40px;
    }

    .call {
      font-size: 15px;
    }
  }
}
</style>
