<template>
  <view class="login">
    <wd-img class="logo" src="/static/app/icons/192x192.png" />

    <view class="form_item">
      <view class="label text">手机号</view>
      <view class="value">
        <wd-input clearable v-model="formData.phone" placeholder="请输入手机号" />
      </view>
    </view>

    <view class="form_item">
      <view class="label text">验证码</view>
      <view class="value">
        <wd-input clearable v-model="formData.code" placeholder="请输入验证码" />
        <wd-button size="small">获取验证码</wd-button>
      </view>
    </view>

    <view class="form_item">
      <wd-checkbox shape="square" v-model="formData.agree" />
      <view class="text">
        登录注册即表示同意
        <wd-text text="《用户须知》" color="#4d80f0"></wd-text>
        <wd-text text="《隐私协议》" color="#4d80f0"></wd-text>
      </view>
    </view>

    <view class="form_item">
      <wd-button class="login_btn" type="error" size="large" @click="handleGotoHome">
        登录
      </wd-button>
    </view>

    <view class="form_item">
      <view class="wechat"></view>
      <view class="apple"></view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'

const formData = reactive<{
  phone: string
  code: string
  agree: boolean
}>({
  phone: '',
  code: '',
  agree: false,
})

const handleGotoHome = () => {
  uni.switchTab({
    url: '/pages/connect/index',
  })
}
</script>

<style lang="scss" scoped>
.login {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  padding: 0 30px 30px 30px;
  box-sizing: border-box;

  .logo {
    width: 100px;
    height: 100px;
  }

  .form_item {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 30px;

    .text {
      font-size: 14px;
    }

    .label {
      width: 50px;
      margin-right: 5px;
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }

    .value {
      flex: 1;
      display: flex;
      align-items: center;

      :deep(.wd-input) {
        width: 100%;
        display: flex;
        align-items: center;
      }

      :deep(.wd-button) {
        width: 100px;
        margin-left: 10px;
      }
    }

    .login_btn {
      margin-top: 10px;
      width: 100% !important;
    }

    .wechat,
    .apple {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background-color: aquamarine;
      margin: 20px 20px 0 20px;
    }
  }
}
</style>
