<template>
  <view class="asplash">
    <view class="content">
      <view class="title">温馨提示</view>

      <view class="desc">
        欢迎您使用梦缘婚恋的服务! 在您使用梦缘婚恋APP前，请您认真阅读并充分理解
        <wd-text text="《会员协议》" color="#4d80f0"></wd-text>
        <wd-text text="《隐私政策》" color="#4d80f0"></wd-text>
        <wd-text text="《权限获取清单》" color="#4d80f0"></wd-text>
        <wd-text text="《三方SDK清单》" color="#4d80f0"></wd-text>
        <wd-text text="《信息共享清单》" color="#4d80f0"></wd-text>
        和
        <wd-text text="《注册承诺函》" color="#4d80f0"></wd-text>
        ，点击“同意”即表示您已阅读并同意全部条款；如您点击“不同意”，将可能导致您无法继续使用梦缘婚恋的产品或服务。
        梦缘婚恋非常重视您的个人信息保护。特向您说明如下：
        1、为了保障平台网络安全和运营安全，梦缘婚恋需获取的必要权限为存储权限和设备权限(收集设备信息)。
        2、为了给您推荐身边优质异性，提高交友竟争力，助您早日找到对象，还需您在注册时填写公开展示的所在地、学历、收入区间和身高。
        3、地理位置、摄像头、麦克风、相册杈限均不会默认开启，只有经过您的明示授权才会在为实现特定功能或服务时使用，您也可以改变或撤回授权。
      </view>

      <view class="btn">
        <wd-button type="info" @click="onDisagree">不同意</wd-button>
        <wd-button type="error" @click="onAgree">同意</wd-button>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import {} from 'vue'

const onAgree = () => {
  uni.navigateTo({
    url: '/pages/login/index',
  })
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
</script>

<style lang="scss" scoped>
.asplash {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
  padding: calc(env(safe-area-inset-top) + 20px) 20px 20px 20px;

  .content {
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;

    padding: 20px;
    box-sizing: border-box;
    border-radius: 15px;

    .title {
      font-size: 24px;
      font-weight: 700;
      margin-bottom: 15px;
    }

    .desc {
      flex: 1;
    }

    .btn {
      width: 100%;
      margin-top: 25px;
      display: flex;
      align-items: center;
      justify-content: space-evenly;
    }
  }
}
</style>
