<template>
  <view class="invite">
    <view class="header">
      <wd-icon
        class="back"
        name="arrow-left"
        size="18px"
        color="#ffffff"
        @click="handleBack"
      ></wd-icon>
      <view>邀请好友</view>
    </view>

    <view class="list">
      <wd-img class="w-23px h-23px mr-10px" src="/static/images/bell2.png" />
      恭喜您!您已邀请成功:99999人
      <view class="check" @click="handleGotoInviteList">
        查看全部
        <wd-icon name="arrow-right" size="15px" color="#ffffff"></wd-icon>
      </view>
    </view>
    <view class="moneyBg"></view>
    <view class="scanBg"></view>
    <view class="qr w-310px h-310px">
      <wd-img class="w-220px h-220px" src="/static/images/qr.png" />
      <view class="text">--扫码注册APP--</view>
    </view>
    <view class="btn">
      <wd-button class="btnColor w-314px" size="large">邀请好友</wd-button>
      <view class="cancelBtn">保存相册</view>
    </view>
  </view>
</template>

<script lang="ts" setup>
const handleBack = () => {
  uni.navigateBack()
}

const handleGotoInviteList = () => {
  uni.navigateTo({
    url: '/pages/inviteList/index',
  })
}
</script>

<style lang="scss" scoped>
.invite {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-sizing: border-box;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  padding: env(safe-area-inset-top) 15px 20px 15px;
  background-image: url('../../static/images/background5.png');

  .header {
    width: 100%;
    height: 45px;
    position: relative;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;

    .back {
      position: absolute;
      left: 0;
    }
  }

  .list {
    z-index: 20;
    height: 40px;
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: 400;
    position: relative;
    color: #ffffff;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-image: url('../../static/images/background6.png');

    .check {
      position: absolute;
      right: 0;
      display: flex;
      align-items: center;
    }
  }

  .moneyBg {
    z-index: 10;
    width: 100%;
    height: 400px;
    position: absolute;
    top: 0;
    left: 0;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-image: url('../../static/images/money.png');
  }

  .scanBg {
    z-index: 10;
    width: 100%;
    position: relative;
    margin-top: 280px;
    display: flex;
    align-items: center;
    justify-content: center;

    &::after {
      content: '扫码注册后快来领奖品~';
      width: 260px;
      height: 40px;
      text-align: center;
      line-height: 40px;
      font-weight: 500;
      font-size: 16px;
      color: #ffffff;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      background-image: url('../../static/images/scanBg.png');
    }
  }

  .qr {
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    margin: -26px auto 0;
    border: 2px solid #f17f57;
    border-radius: 10px;
    background-color: #ffffff;

    .text {
      position: absolute;
      bottom: 20px;
      font-weight: 400;
      font-size: 14px;
      color: #686a7a;
    }
  }

  .btn {
    width: 100%;
    margin-top: 20px;
    display: flex;
    align-items: center;
    flex-direction: column;

    .btnColor {
      font-size: 15px;
      font-weight: 400;
      background: linear-gradient(90deg, #fe8574 0%, #fd1674 100%) !important;
    }

    .cancelBtn {
      margin-top: 5px;
      font-size: 14px;
      color: #fd1674;
    }
  }
}
</style>
