<template>
  <view class="systemauth_contianer">
    <view class="link">
      <view class="iconBg">
        <wd-img class="w-24px h-24px" src="/static/images/system1.png"></wd-img>
      </view>
      <view class="info">
        <view class="line1">位置</view>
        <view class="line2">动态中展示位置</view>
      </view>
    </view>
    <view class="link">
      <view class="iconBg">
        <wd-img class="w-24px h-24px" src="/static/images/system2.png"></wd-img>
      </view>

      <view class="info">
        <view class="line1">照片</view>
        <view class="line2">发送相册内的图片与视频等功能</view>
      </view>
    </view>
    <view class="link">
      <view class="iconBg">
        <wd-img class="w-24px h-24px" src="/static/images/system3.png"></wd-img>
      </view>

      <view class="info">
        <view class="line1">相机</view>
        <view class="line2">拍摄后发送图片相亲等功能</view>
      </view>
    </view>
    <wd-divider>仅展示能查询到的已授权系统权限</wd-divider>
    <view class="setting">前往系统设置</view>
  </view>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.systemauth_contianer {
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
  padding: env(safe-area-inset-top) 10px 0 15px;

  .link {
    height: 75px;
    padding: 15px;
    margin-top: 15px;
    border-radius: 10px;
    background-color: #ffffff;
    display: flex;
    align-items: center;

    .iconBg {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: rgba(254, 133, 116, 0.1);
    }

    .info {
      height: 100%;
      display: flex;
      margin-left: 10px;
      flex-direction: column;
      justify-content: center;

      .line1 {
        font-size: 16px;
        color: #191c32;
        font-weight: 500;
        line-height: 20px;
        margin-top: 4px;
      }

      .line2 {
        margin-top: 4px;
        font-size: 14px;
        color: #686a7a;
        font-weight: 400;
        line-height: 20px;
      }
    }
  }

  .setting {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: #fd2b58;
    font-weight: 400;
  }
}
</style>
