<template>
  <view v-show="!isLogined" class="asplash_container" :style="{ padding: pagePadding }">
    <view class="content">
      <wd-img class="w-48px h-48px mb-10px" src="/static/images/bell.png"></wd-img>
      <view class="title">温馨提示</view>

      <view class="desc">
        <view class="line">欢迎您使用梦缘婚恋的服务!</view>

        在您使用梦缘婚恋APP前，请您认真阅读并充分理解
        <wd-text
          text="《会员协议》"
          color="#000000"
          @click="handleGotoPolicy('MEMBERSHIP_AGREEMENT')"
        ></wd-text>
        、
        <wd-text
          text="《隐私政策》"
          color="#000000"
          @click="handleGotoPolicy('PRIVACY_POLICY')"
        ></wd-text>
        、
        <wd-text
          text="《权限获取清单》"
          color="#000000"
          @click="handleGotoPolicy('PERMISSION_LIST')"
        ></wd-text>
        、
        <wd-text
          text="《三方SDK清单》"
          color="#000000"
          @click="handleGotoPolicy('THIRD_PARTY_SDK_LIST')"
        ></wd-text>
        、
        <wd-text
          text="《信息共享清单》"
          color="#000000"
          @click="handleGotoPolicy('INFORMATION_SHARING_LIST')"
        ></wd-text>
        和
        <wd-text
          text="《注册承诺函》"
          color="#000000"
          @click="handleGotoPolicy('REGISTRATION_COMMITMENT')"
        ></wd-text>
        ，点击“同意”即表示您已阅读并同意全部条款；如您点击“不同意”，将可能导致您无法继续使用梦缘婚恋的产品或服务。

        <view class="line">梦缘婚恋非常重视您的个人信息保护。特向您说明如下：</view>
        <view class="line">
          1、为了保障平台网络安全和运营安全，梦缘婚恋需获取的必要权限为存储权限和设备权限(收集设备信息)。
        </view>
        <view class="line">
          2、为了给您推荐身边优质异性，提高交友竟争力，助您早日找到对象，还需您在注册时填写公开展示的所在地、学历、收入区间和身高。
        </view>
        <view class="line">
          3、地理位置、摄像头、麦克风、相册杈限均不会默认开启，只有经过您的明示授权才会在为实现特定功能或服务时使用，您也可以改变或撤回授权。
        </view>
      </view>

      <view class="btn">
        <wd-button class="btnColor w-100%" size="large" @click="onAgree">同意</wd-button>
        <view class="cancelBtn" @click="onDisagree">不同意</view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

import { useUserStore } from '@/store'
import { setPagePadding } from '@/hooks/useSafeInset'

const { pagePadding } = setPagePadding(20, 15, 20, 15)

const { isLogined } = useUserStore()

const pageType = ref('')

const onAgree = () => {
  if (pageType.value === 'relogin') {
    uni.navigateTo({
      url: '/pages/login/index',
    })
  } else {
    isLogined
      ? uni.switchTab({
          url: '/pages/connect/index',
        })
      : uni.navigateTo({
          url: '/pages/login/index',
        })
  }
}

const onDisagree = () => {
  const platform = uni.getSystemInfoSync().platform

  if (platform === 'ios') {
    uni.showToast({
      title: '请点击确认按钮进入APP',
      icon: 'none',
    })
  } else {
    plus.runtime.quit()
  }
}

const handleGotoPolicy = (code: string) => {
  uni.navigateTo({
    url: `/pages/policy/index?code=${code}`,
  })
}

onLoad((params) => {
  pageType.value = params.type

  isLogined &&
    uni.reLaunch({
      url: '/pages/connect/index',
    })
})
</script>

<style lang="scss" scoped>
.asplash_container {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-sizing: border-box;
  background-color: #f3f5f6;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-image: url('../../static/images/background.png');

  .content {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    background-color: #ffffff;

    padding: 20px;
    box-sizing: border-box;
    border-radius: 15px;

    .title {
      font-size: 18px;
      font-weight: 500;
    }

    .desc {
      height: 510px;
      font-size: 15px;
      font-weight: 400;
      color: #686a7a;

      .line {
        margin: 15px 0 15px 0;
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
        color: #9395a4;
      }
    }
  }
}
</style>
