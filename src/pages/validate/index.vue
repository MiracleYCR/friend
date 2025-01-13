<template>
  <view class="validate_container">
    <view class="validate_item">
      <view class="iconBg active">
        <wd-img class="w-30px h-30px" src="/static/images/phone.png"></wd-img>
      </view>
      <view class="content">
        <view class="left">
          <view class="title active">手机绑定（已认证）</view>
          <view class="desc">防止账号丢失</view>
        </view>
        <view class="right">
          <view class="entry" @click="handleGotoBindPhone">
            <view class="text">去换绑</view>
            <wd-icon name="arrow-right" size="12px" color="#fd1674"></wd-icon>
          </view>
          <view class="phone">184****6881</view>
        </view>
      </view>
    </view>

    <view class="validate_item">
      <view class="iconBg noactive">
        <wd-img class="w-30px h-30px" src="/static/images/phone.png"></wd-img>
      </view>
      <view class="content">
        <view class="left">
          <view class="title noactive">实名认证</view>
          <view class="desc">提高交友成功率</view>
        </view>
        <view class="right2" @click="handleGotoRealCheck">
          <view class="text">去认证</view>
          <wd-icon name="arrow-right" size="12px" color="#fd1674"></wd-icon>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const handleGotoBindPhone = () => {
  uni.navigateTo({
    url: '/pages/bindphone/index',
  })
}

const handleGotoRealCheck = () => {
  uni.navigateTo({
    url: '/pages/realcheck/index',
  })
}
</script>

<style lang="scss" scoped>
.validate_container {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
  box-sizing: border-box;
  background-color: #f3f5f6;
  padding: env(safe-area-inset-top) 15px 0 15px;

  .validate_item {
    width: 100%;
    height: 80px;
    margin-top: 15px;
    border-radius: 6px;
    background-color: #ffffff;
    display: flex;
    padding: 15px;
    box-sizing: border-box;
    align-items: center;
    justify-content: space-between;

    .iconBg {
      width: 48px;
      height: 48px;
      padding: 8px;
      border-radius: 10px;
      box-sizing: border-box;
      margin-right: 10px;

      &.active {
        background: linear-gradient(90deg, #fe8574 0%, #fd1674 100%);
      }

      &.noactive {
        background: linear-gradient(
          268.79deg,
          rgba(147, 149, 164, 0.16) 1.94%,
          rgba(147, 149, 164, 0.47) 98.9%
        );
      }
    }

    .content {
      flex: 1;
      height: 44px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .left {
        height: 48px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .title {
          font-size: 16px;
          font-weight: 500;

          &.active {
            color: #000000;
          }

          &.noactive {
            color: #686a7a;
          }
        }

        .desc {
          font-size: 14px;
          font-weight: 400;
          color: #686a7a;
        }
      }

      .right {
        height: 48px;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        justify-content: space-between;
        font-size: 12px;
        font-weight: 400;

        .entry {
          color: #fd1674;
          display: flex;
          align-items: center;
        }

        .phone {
          color: #686a7a;
        }
      }

      .right2 {
        height: 48px;
        display: flex;
        align-items: center;
        font-size: 12px;
        font-weight: 400;
        color: #fd1674;
      }
    }
  }
}
</style>
